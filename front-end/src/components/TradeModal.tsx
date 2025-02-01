import { ITEM_DATA_MAP } from "@/constants";
import { CurrentUserContext } from "@/context";
import { ISurvivor } from "@/types/ISurvivor";
import React, {
    FormEventHandler,
    useContext,
    useEffect,
    useState,
} from "react";

const emptyItems = Object.entries(ITEM_DATA_MAP).reduce(
    (prev, [key]) => ({ ...prev, [key]: 0 }),
    {}
);

const TradeModal = ({
    survivor,
    isOpen,
    setIsOpen,
    refetch,
}: {
    survivor?: ISurvivor;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    refetch: () => Promise<void>;
}) => {
    const currentUserCtx = useContext(CurrentUserContext);
    const currentUser = currentUserCtx?.currentUser;

    // Maps where key is an ITEM_DATA_MAP key and value is the selected unit count
    const [selectedItemsLeft, setSelectedItemsLeft] =
        useState<Record<number, number>>(emptyItems);
    const [selectedItemsRight, setSelectedItemsRight] =
        useState<Record<number, number>>(emptyItems);

    const leftValue = Object.entries(selectedItemsLeft).reduce<number>(
        (prev, [key, count]) => prev + ITEM_DATA_MAP[Number(key)].value * count,
        0
    );
    const rightValue = Object.entries(selectedItemsRight).reduce<number>(
        (prev, [key, count]) => prev + ITEM_DATA_MAP[Number(key)].value * count,
        0
    );

    // Reset modal values on close
    useEffect(() => {
        setSelectedItemsRight(emptyItems);
        setSelectedItemsLeft(emptyItems);
    }, [isOpen]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: FormEventHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        // Get inventory item selections from both sides
        // Again, not the ideal way to handle it without controlled components, and it leads to some duplicate code. Plus, it breaks if you start changing the IDs, so probably never do it like this.
        const leftInventory = [];
        for (const item of formData.entries()) {
            if (item[0].startsWith("left_inventory_")) {
                leftInventory.push({
                    itemType: Number(item[0].split("_")[2]),
                    count: Number(item[1]),
                });
            }
        }

        const rightInventory = [];
        for (const item of formData.entries()) {
            if (item[0].startsWith("right_inventory_")) {
                rightInventory.push({
                    itemType: Number(item[0].split("_")[2]),
                    count: Number(item[1]),
                });
            }
        }

        // Data object
        const data = {
            leftId: currentUser?.id,
            rightId: survivor?.id,
            leftInventory,
            rightInventory,
        };

        setIsLoading(true);
        fetch(`http://localhost:8000/survivors/trade`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                if (res.status >= 400) throw new Error();

                await Promise.all([currentUserCtx?.refetchUser(), refetch()]);

                setIsLoading(false);
                setIsOpen(false);
                alert("Trade successful!");
            })
            .catch(() => {
                alert("Error! Trade failed. Please try again later.");
            });
    };

    return isOpen && survivor ? (
        <dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="modal_std"
        >
            <div className="modal_std_inner">
                <h2 className="mb-5 font-black text-lg">Trade</h2>

                <div className="p-5 mb-5 rounded-sm border border-blue-500 bg-blue-200 text-blue-900">
                    <p className="mb-2.5 font-bold">
                        Remember! All trades must be equal based on the values
                        listed in the following table.
                    </p>

                    <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
                        {Object.entries(ITEM_DATA_MAP).map(([key, item]) => (
                            <div className="flex justify-between" key={key}>
                                <p>
                                    {item.name} ({item.value * 100} U)
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="flex gap-10 mb-10 max-w-screen-md flex-col md:flex-row">
                        <div className="w-full">
                            <h3 className="text-lg font-black mb-2.5 uppercase">
                                Your inventory
                            </h3>

                            <div className="grid gap-x-5 gap-y-2.5 grid-cols-3">
                                <div className="font-bold col-span-1">Item</div>
                                <div className="font-bold col-span-1 text-right">
                                    In Inventory
                                </div>
                                <div className="font-bold col-span-1 text-right">
                                    Sending
                                </div>

                                {/* Listing out all possible inventory items like this is not ideal, but it's the fastest solution, and it works for the limited amount of potential item types. */}
                                {Object.entries(ITEM_DATA_MAP).map(
                                    ([key, item]) => (
                                        <React.Fragment key={key}>
                                            <label
                                                htmlFor="register_left_inventory_0"
                                                className="col-span-1"
                                            >
                                                {item.name}
                                            </label>

                                            <div className="flex justify-end">
                                                {/* Would be faster as a dictionary, but since there are only 4 items, there's not much point in overcomplicating it (yet). */}
                                                {currentUser?.inventory.find(
                                                    (survivorItem) =>
                                                        survivorItem.itemType ===
                                                        Number(key)
                                                )?.count ?? 0}
                                            </div>

                                            <input
                                                type="number"
                                                id={`register_left_inventory_${key}`}
                                                name={`left_inventory_${key}`}
                                                min={0}
                                                className="field_std field_std_small text-right col-span-1"
                                                dir="rtl"
                                                value={
                                                    selectedItemsLeft[
                                                        Number(key)
                                                    ]
                                                }
                                                onChange={(e) => {
                                                    setSelectedItemsLeft(
                                                        (prevState) => {
                                                            const newState = {
                                                                ...prevState,
                                                            };
                                                            newState[
                                                                Number(key)
                                                            ] = Number(
                                                                e.target.value
                                                            );
                                                            return newState;
                                                        }
                                                    );
                                                }}
                                                max={
                                                    currentUser?.inventory.find(
                                                        (survivorItem) =>
                                                            survivorItem.itemType ===
                                                            Number(key)
                                                    )?.count ?? 0
                                                }
                                            />
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        </div>

                        <hr className="w-px bg-gray-200 border-0 h-auto flex-shrink-0 hidden md:block" />

                        <div className="w-full">
                            <h3 className="text-lg font-black mb-2.5 uppercase md:text-right">
                                {survivor.name.split(" ")[0]}&apos;s inventory
                            </h3>

                            <div className="grid gap-x-5 gap-y-2.5 grid-cols-3">
                                <div className="font-bold col-span-1">Item</div>
                                <div className="font-bold col-span-1 text-right">
                                    In Inventory
                                </div>
                                <div className="font-bold col-span-1 text-right">
                                    Requesting
                                </div>

                                {/* Listing out all possible inventory items like this is not ideal, but it's the fastest solution, and it works for the limited amount of potential item types. */}
                                {Object.entries(ITEM_DATA_MAP).map(
                                    ([key, item]) => (
                                        <React.Fragment key={key}>
                                            <label
                                                htmlFor="register_right_inventory_0"
                                                className="col-span-1 text-left"
                                            >
                                                {item.name}
                                            </label>

                                            <div className="flex justify-end">
                                                {/* Would be faster as a dictionary, but since there are only 4 items, there's not much point in overcomplicating it (yet). */}
                                                {survivor.inventory.find(
                                                    (survivorItem) =>
                                                        survivorItem.itemType ===
                                                        Number(key)
                                                )?.count ?? 0}
                                            </div>

                                            <input
                                                type="number"
                                                id={`register_right_inventory_${key}`}
                                                name={`right_inventory_${key}`}
                                                dir="rtl"
                                                min={0}
                                                className="field_std field_std_small col-span-1 text-right"
                                                value={
                                                    selectedItemsRight[
                                                        Number(key)
                                                    ]
                                                }
                                                onChange={(e) => {
                                                    setSelectedItemsRight(
                                                        (prevState) => {
                                                            const newState = {
                                                                ...prevState,
                                                            };
                                                            newState[
                                                                Number(key)
                                                            ] = Number(
                                                                e.target.value
                                                            );
                                                            return newState;
                                                        }
                                                    );
                                                }}
                                                max={
                                                    survivor.inventory.find(
                                                        (survivorItem) =>
                                                            survivorItem.itemType ===
                                                            Number(key)
                                                    )?.count ?? 0
                                                }
                                            />
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-5 text-center">
                        <p className="text-sm">Current balance</p>

                        <div className="flex gap-5 justify-center items-center">
                            <p className="text-2xl font-black font-mono">
                                {leftValue * 100} U
                            </p>

                            <hr className="border-0 bg-gray-200 w-px h-10" />

                            <p className="text-2xl font-black font-mono">
                                {rightValue * 100} U
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-5 justify-left">
                        <button
                            type="submit"
                            className="button_std button_std_positive"
                            disabled={leftValue !== rightValue || isLoading}
                            title={
                                leftValue !== rightValue
                                    ? "The trade must be equivalent to proceed."
                                    : ""
                            }
                        >
                            Propose trade
                        </button>
                        <button
                            type="button"
                            className="button_std"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    ) : null;
};

export default TradeModal;
