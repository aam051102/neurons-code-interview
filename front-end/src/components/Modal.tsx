import React from "react";

const Modal = ({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    return (
        <dialog
            aria-modal={true}
            open={isOpen}
            onClose={onClose}
            className="modal_std"
        >
            <div className="modal_std_inner">{children}</div>
        </dialog>
    );
};

export default Modal;
