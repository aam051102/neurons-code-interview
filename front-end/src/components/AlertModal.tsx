import { SetStateAction } from "react";
import Modal from "./Modal";

export type IAlertModalObject = {
    children: React.ReactNode;
    isOpen: boolean;
};

const AlertModal = ({
    subModal,
    setSubModal,
}: {
    subModal: IAlertModalObject;
    setSubModal: React.Dispatch<SetStateAction<IAlertModalObject>>;
}) => {
    return (
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
    );
};

export default AlertModal;
