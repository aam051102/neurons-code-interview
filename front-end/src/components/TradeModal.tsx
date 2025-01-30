import { ITEM_DATA_MAP } from "@/constants";
import { ISurvivor } from "@/types/ISurvivor";
import React from "react";

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
    const leftValue = 0;
    const rightValue = 0;

    return isOpen && survivor ? (
        <dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="modal_std"
        >
            <div className="modal_std_inner">
                <div className="p-5 mb-5 rounded-sm border border-blue-500 bg-blue-200 text-blue-900">
                    <p className="mb-2.5 font-bold">
                        Remember! All trades must be equal based on the values
                        listed in the following table:
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

                <div className="flex gap-10 mb-10 max-w-screen-md flex-col md:flex-row">
                    <div className="w-full">
                        <h3 className="text-xl font-black mb-2.5 uppercase">
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
                                            htmlFor="register_inventory_0"
                                            className="col-span-1"
                                        >
                                            {item.name}
                                        </label>

                                        <div className="flex justify-end">
                                            {0}
                                        </div>

                                        <input
                                            type="number"
                                            id={`register_inventory_${key}`}
                                            name={`inventory_${key}`}
                                            min={0}
                                            className="field_std field_std_small text-right col-span-1"
                                            defaultValue={0}
                                        />
                                    </React.Fragment>
                                )
                            )}
                        </div>
                    </div>

                    <hr className="w-px bg-gray-200 border-0 h-auto flex-shrink-0 hidden md:block" />

                    <div className="w-full">
                        <h3 className="text-xl font-black mb-2.5 uppercase md:text-right">
                            {survivor.name}&apos;s inventory
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
                                            htmlFor="register_inventory_0"
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
                                            id={`register_inventory_${key}`}
                                            name={`inventory_${key}`}
                                            min={0}
                                            className="field_std field_std_small col-span-1 text-right"
                                            defaultValue={0}
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
                    <p className="text-sm">Current balance:</p>

                    <div className="flex gap-5 justify-center items-center">
                        <p className="text-2xl font-black font-mono">
                            {leftValue} U
                        </p>

                        <hr className="border-0 bg-gray-200 w-px h-10" />

                        <p className="text-2xl font-black font-mono">
                            {rightValue} U
                        </p>
                    </div>
                </div>

                <div className="flex gap-5 justify-left">
                    <button
                        type="button"
                        className="button_std button_std_positive"
                        onClick={async () => {
                            // TODO: Propose trade
                            await refetch();
                            setIsOpen(false);
                        }}
                    >
                        Propose trade
                    </button>
                    <button
                        type="button"
                        className="button_std"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    ) : null;
};

export default TradeModal;
