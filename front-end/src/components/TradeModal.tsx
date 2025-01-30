import { ISurvivor } from "@/types/ISurvivor";

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
    return isOpen && survivor ? (
        <dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="modal_std"
        >
            <div className="modal_std_inner">
                <p className="mb-5">Propose trade with {survivor.name}?</p>

                <div className="flex gap-5">
                    <button
                        type="button"
                        className="button_std"
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
