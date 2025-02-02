import { IAlertModalObject } from "@/components/AlertModal";
import { SetStateAction, useState } from "react";

const useAlertModal = (): [
    IAlertModalObject,
    React.Dispatch<SetStateAction<IAlertModalObject>>
] => {
    const [subModal, setSubModal] = useState<IAlertModalObject>({
        children: null,
        isOpen: false,
    });

    return [subModal, setSubModal];
};

export default useAlertModal;
