"use client";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "@/types/IUser";
import useAlertModal from "@/hooks/useAlertModal";
import { CurrentUserContext } from "@/context";
import Nav from "./Nav";
import AlertModal from "./AlertModal";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [subModal, setSubModal] = useAlertModal();

    const refetchUser = useCallback(
        async (id?: number) => {
            const actualId = id ?? currentUser?.id;
            if (!actualId) return;

            // Faking a "login"
            await fetch(
                `http://localhost:8000/survivors/find?format=json&id=${actualId}`
            )
                .then((res) => res.json())
                .then((res) => {
                    if (!res) {
                        setSubModal({
                            children:
                                "Something went wrong. User could not be found!",
                            isOpen: true,
                        });
                        return;
                    }

                    setCurrentUser({
                        id: actualId,
                        inventory: res.inventory,
                    });
                })
                .catch(() => {
                    setSubModal({
                        children:
                            "Something went wrong. User could not be found!",
                        isOpen: true,
                    });
                });
        },
        [currentUser?.id, setSubModal]
    );

    useEffect(() => {
        const savedUserID = Number(localStorage.getItem("userID"));
        if (currentUser?.id === savedUserID) return;
        refetchUser(savedUserID);
    }, [refetchUser, currentUser?.id]);

    return (
        <CurrentUserContext.Provider
            value={{ currentUser, setCurrentUser, refetchUser }}
        >
            <Nav />

            {children}

            <AlertModal subModal={subModal} setSubModal={setSubModal} />
        </CurrentUserContext.Provider>
    );
};

export default AppWrapper;
