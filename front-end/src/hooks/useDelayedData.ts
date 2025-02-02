import { useEffect, useRef, useState } from "react";

/**
 * Maintains the previously given data value in its return value for some delay after isOpen has gone from true to false.
 * This helps prevent modals from suddenly changing their content mid-transition as they're closing.
 * Only ever used for animation purposes. Delay should match transition length.
 */
const useDelayedData = <T>({
    isOpen,
    data,
    delay,
}: {
    isOpen: boolean;
    data: T;
    delay: number;
}) => {
    const pastIsOpenRef = useRef<boolean>(isOpen);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [internalData, setInternalData] = useState(data);

    useEffect(() => {
        if (!isOpen && pastIsOpenRef.current) {
            pastIsOpenRef.current = isOpen;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                setInternalData(data);
            }, delay);
        } else if (isOpen && !pastIsOpenRef.current) {
            pastIsOpenRef.current = isOpen;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            setInternalData(data);
        } else {
            setInternalData(data);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isOpen, data, delay]);

    return internalData;
};

export default useDelayedData;
