import { LATITUDE_PATTERN, LONGITUDE_PATTERN } from "@/constants";
import { CurrentUserContext } from "@/context";
import { FormEventHandler, useContext, useState } from "react";

type ILocationForm = {
    latitude: string;
    longitude: string;
};

const LocationModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const currentUserCtx = useContext(CurrentUserContext);
    const currentUser = currentUserCtx?.currentUser;

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: FormEventHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = {
            longitude: formData.get("longitude") as ILocationForm["longitude"],
            latitude: formData.get("latitude") as ILocationForm["latitude"],
        };

        setIsLoading(true);
        fetch(`http://localhost:8000/survivors/update`, {
            method: "PATCH",
            body: JSON.stringify({
                id: currentUser?.id,
                latitude: data.latitude,
                longitude: data.longitude,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                if (res.status >= 400) throw new Error();
                setIsLoading(false);
                setIsOpen(false);
                alert("Location change successful!");

                // NOTE: This is not ideal, but it's the quickest way to make sure that the data on the page is updated to match the location change.
                // Ideally, this should be a call to a refetch function of some sort.
                window.location.reload();
            })
            .catch(() => {
                alert("Error! Location change failed. Please try again later.");
            });
    };

    return isOpen ? (
        <dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="modal_std"
        >
            <div className="modal_std_inner">
                <h2 className="mb-5 font-black text-lg">Update Location</h2>

                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-2.5 mb-10">
                        <div>
                            <label htmlFor="register_latitude">Latitude</label>
                            <input
                                type="string"
                                id="location_latitude"
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
                                id="location_longitude"
                                name="longitude"
                                className="field_std"
                                placeholder="0.000000"
                                pattern={LONGITUDE_PATTERN}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <button
                            type="submit"
                            className="button_std"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Update Location"}
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

export default LocationModal;
