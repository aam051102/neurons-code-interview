import { FormEventHandler, useState } from "react";

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
        const formData = new FormData(event.target as HTMLFormElement);
        const data = {
            name: formData.get("name") as IRegisterForm["name"],
            age: Number(formData.get("age")) as IRegisterForm["age"],
            gender: Number(formData.get("gender")) as IRegisterForm["gender"],
            longitude: formData.get("longitude") as IRegisterForm["longitude"],
            latitude: formData.get("latitude") as IRegisterForm["latitude"],
        };

        setIsLoading(true);
        fetch(`http://localhost:8000/survivors/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(async () => {
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
                            />
                        </div>

                        <div>
                            <label htmlFor="register_gender">Gender</label>
                            <select
                                name="gender"
                                id="register_gender"
                                className="field_std"
                                defaultValue={"0"}
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
                            />
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
