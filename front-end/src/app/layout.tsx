// NOTE: For the sake of development speed, everything is client-side, which is not best practice, but a lot faster than separating server-side and client-side components.

"use client";
//import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "@/context";
import { IUser } from "@/types/IUser";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
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
    const [currentUser, setCurrentUser] = useState<IUser | null>({
        id: 12,
        inventory: [],
    });

    useEffect(() => {
        if (!currentUser?.id) return;

        // Faking a "login"
        fetch(
            `http://localhost:8000/survivors/find?format=json&id=${currentUser.id}`
        )
            .then((res) => res.json())
            .then((res) => {
                if (!res) {
                    alert("Something went wrong. User could not be found!");
                    return;
                }

                setCurrentUser({
                    id: currentUser.id,
                    inventory: res.inventory,
                });
            });
    }, [currentUser?.id]);

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
            >
                <CurrentUserContext.Provider
                    value={{ currentUser, setCurrentUser }}
                >
                    <Nav />

                    {children}
                </CurrentUserContext.Provider>
            </body>
        </html>
    );
}
