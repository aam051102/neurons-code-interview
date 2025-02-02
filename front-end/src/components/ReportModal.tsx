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
    const [subModal, setSubModal] = useState<{
        children: React.ReactNode;
        isOpen: boolean;
    }>({ children: null, isOpen: false });

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
                setSubModal({ children: "Report successful!", isOpen: true });
            })
            .catch(() => {
                setSubModal({
                    children: "Error! Report failed. Please try again later.",
                    isOpen: true,
                });
            });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="mb-2.5 font-black text-lg">Report Infection</h2>

                <p className="mb-5">
                    Are you sure you want to report an infection for{" "}
                    {survivor?.name}?
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
            </Modal>

            <Modal
                isOpen={subModal.isOpen}
                onClose={() =>
                    setSubModal((prevState) => ({
                        ...prevState,
                        isOpen: false,
                    }))
                }
            >
                {subModal.children}

                <div className="mt-5">
                    <button
                        type="button"
                        className="button_std"
                        onClick={() =>
                            setSubModal((prevState) => ({
                                ...prevState,
                                isOpen: false,
                            }))
                        }
                    >
                        Okay
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ReportModal;
