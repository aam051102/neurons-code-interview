import {
    ITEM_DATA_MAP,
    LATITUDE_PATTERN,
    LONGITUDE_PATTERN,
} from "@/constants";
import React, { FormEventHandler, useState } from "react";

type IRegisterForm = {
    name: string;
    age: number;
    gender: number;
    longitude: string;
    latitude: string;
};

const RegisterModal = ({
    isOpen,
    setIsOpen,
    refetch,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    refetch: () => Promise<void>;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: FormEventHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        // Get all inventory items
        // Controlled input fields would probably make this easier and a bit more scalable, but considering the time constraints, this is quite stable.
        const inventory = [];
        for (const item of formData.entries()) {
            if (item[0].startsWith("inventory_")) {
                inventory.push({
                    itemType: Number(item[0].split("_")[1]),
                    count: Number(item[1]),
                });
            }
        }

        // Data object
        const data = {
            name: formData.get("name") as IRegisterForm["name"],
            age: Number(formData.get("age")) as IRegisterForm["age"],
            gender: Number(formData.get("gender")) as IRegisterForm["gender"],
            longitude: formData.get("longitude") as IRegisterForm["longitude"],
            latitude: formData.get("latitude") as IRegisterForm["latitude"],
            inventory,
        };

        setIsLoading(true);
        fetch(`http://localhost:8000/survivors/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                if (res.status >= 400) throw new Error();
                await refetch();
                setIsLoading(false);
                setIsOpen(false);
                alert("Registration successful!");
            })
            .catch(() => {
                alert("Error! Registration failed. Please try again later.");
            });
    };

    return isOpen ? (
        <dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="modal_std"
        >
            <div className="modal_std_inner">
                <p className="mb-5">Register survivor</p>

                <form onSubmit={onSubmit}>
                    <div className="flex gap-2.5 flex-col mb-10">
                        <div>
                            <label htmlFor="register_name">Name</label>
                            <input
                                type="text"
                                id="register_name"
                                name="name"
                                className="field_std"
                                placeholder="John Doe Smith"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="register_age">Age</label>
                            <input
                                type="number"
                                id="register_age"
                                name="age"
                                className="field_std"
                                min={0}
                                max={200}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="register_gender">Gender</label>
                            <select
                                name="gender"
                                id="register_gender"
                                className="field_std"
                                defaultValue={"0"}
                                required
                            >
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="register_latitude">Latitude</label>
                            <input
                                type="string"
                                id="register_latitude"
                                name="latitude"
                                className="field_std"
                                placeholder="0.000000"
                                pattern={LATITUDE_PATTERN}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="register_longitude">
                                Longitude
                            </label>
                            <input
                                type="string"
                                id="register_longitude"
                                name="longitude"
                                className="field_std"
                                placeholder="0.000000"
                                pattern={LONGITUDE_PATTERN}
                                required
                            />
                        </div>

                        <div>
                            <p className="mb-2.5 mt-5 font-bold">Inventory:</p>

                            <div className="grid gap-x-5 gap-y-2.5 grid-cols-2">
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
                                            <input
                                                type="number"
                                                id={`register_inventory_${key}`}
                                                name={`inventory_${key}`}
                                                min={0}
                                                className="field_std field_std_small text-right col-span-1"
                                                defaultValue={0}
                                                required
                                            />
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <button
                            type="submit"
                            className="button_std"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Register"}
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

export default RegisterModal;
