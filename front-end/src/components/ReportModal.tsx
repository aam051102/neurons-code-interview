import { ISurvivor } from "@/types/ISurvivor";

const ReportModal = ({
    survivor,
    isOpen,
    setIsOpen,
}: {
    survivor?: ISurvivor;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    return isOpen && survivor ? (
        <dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="bg-white rounded-md p-10">
                <p className="mb-5">
                    Are you sure you want to report an infection for{" "}
                    {survivor.name}?
                </p>

                <div className="flex gap-5">
                    <button
                        type="button"
                        className="button_std button_std_danger"
                        onClick={() => {
                            // TODO: Send report
                            setIsOpen(false);
                        }}
                    >
                        Report
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

export default ReportModal;
