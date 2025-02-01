import { CurrentUserContext } from "@/context";
import { ISurvivor } from "@/types/ISurvivor";
import { useContext, useState } from "react";
import Modal from "./Modal";

const ReportModal = ({
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

    const [isLoading, setIsLoading] = useState(false);
    const [subModalChildren, setSubModalChildren] =
        useState<React.ReactNode>(null);

    const onSubmit = () => {
        if (!survivor) return;

        setIsLoading(true);
        fetch(`http://localhost:8000/survivors/report`, {
            method: "POST",
            body: JSON.stringify({
                reported: survivor.id,
                reporter: currentUser?.id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(async () => {
                await refetch();
                setIsLoading(false);
                setIsOpen(false);
                setSubModalChildren("Report successful!");
            })
            .catch(() => {
                setSubModalChildren(
                    "Error! Report failed. Please try again later."
                );
            });
    };

    return (
        <>
            {isOpen && survivor ? (
                <dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="modal_std"
                >
                    <div className="modal_std_inner">
                        <h2 className="mb-2.5 font-black text-lg">
                            Report Infection
                        </h2>

                        <p className="mb-5">
                            Are you sure you want to report an infection for{" "}
                            {survivor.name}?
                        </p>

                        <div className="flex gap-5">
                            <button
                                type="button"
                                className="button_std button_std_danger"
                                onClick={onSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Report"}
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
                    </div>
                </dialog>
            ) : null}

            <Modal
                isOpen={!!subModalChildren}
                onClose={() => setSubModalChildren(null)}
            >
                {subModalChildren}

                <div className="mt-5">
                    <button
                        type="button"
                        className="button_std"
                        onClick={() => setSubModalChildren(null)}
                    >
                        Okay
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ReportModal;
