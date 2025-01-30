import { ISurvivor } from "@/types/ISurvivor";
import { userID } from "@/userData";
import { useState } from "react";

const ReportModal = ({
    survivor,
    isOpen,
    setIsOpen,
}: {
    survivor?: ISurvivor;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if (!survivor) return;

        setIsLoading(true);
        fetch(`http://localhost:8000/survivors/report`, {
            method: "POST",
            body: JSON.stringify({
                reported: survivor.id,
                reporter: userID,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
                setIsLoading(false);
                setIsOpen(false);
                alert("Report successful!");
            })
            .catch(() => {
                alert("Error! Report failed. Please try again later.");
            });
    };

    return isOpen && survivor ? (
        <dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="modal_std"
        >
            <div className="modal_std_inner">
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
    ) : null;
};

export default ReportModal;
