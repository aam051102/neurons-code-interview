import { LATITUDE_PATTERN, LONGITUDE_PATTERN } from "@/constants";
import { CurrentUserContext } from "@/context";
//import { useRouter } from "next/navigation";
import { FormEventHandler, useContext, useState } from "react";
import Modal from "./Modal";
import AlertModal from "./AlertModal";
import useAlertModal from "@/hooks/useAlertModal";

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
    //const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [subModal, setSubModal] = useAlertModal();

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
                setSubModal({
                    children: "Location change successful!",
                    isOpen: true,
                });

                // NOTE: This is not ideal, but it's the quickest way to make sure that the data on the page is updated to match the location change.
                // Ideally, this should be a call to a refetch function of some sort.
                // NOTE on the note: Reloading the page like this messes up the tests. Fixing it seems like it would require extensive mocking of the Next Router. Probably don't have the time.
                // router.refresh();
            })
            .catch(() => {
                setSubModal({
                    children:
                        "Error! Location change failed. Please try again later.",
                    isOpen: true,
                });
            });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
                            className="button_std button_std_positive"
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
            </Modal>

            <AlertModal subModal={subModal} setSubModal={setSubModal} />
        </>
    );
};

export default LocationModal;
