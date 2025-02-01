// NOTE: For the sake of development speed, everything is client-side, which is not best practice, but a lot faster than separating server-side and client-side components.

"use client";
//import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { useCallback, useEffect, useState } from "react";
import { CurrentUserContext } from "@/context";
import { IUser } from "@/types/IUser";

const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
});

/*export const metadata: Metadata = {
    title: "Survivors",
    description: "",
};*/

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

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
                        alert("Something went wrong. User could not be found!");
                        return;
                    }

                    setCurrentUser({
                        id: actualId,
                        inventory: res.inventory,
                    });
                });
        },
        [currentUser?.id]
    );

    useEffect(() => {
        const savedUserID = Number(localStorage.getItem("userID"));
        if (currentUser?.id === savedUserID) return;
        refetchUser(savedUserID);
    }, [refetchUser, currentUser?.id]);

    return (
        <html lang="en">
            <body className={`${notoSans.variable} antialiased bg-white`}>
                <CurrentUserContext.Provider
                    value={{ currentUser, setCurrentUser, refetchUser }}
                >
                    <Nav />

                    {children}
                </CurrentUserContext.Provider>
            </body>
        </html>
    );
}
