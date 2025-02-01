"use client";

import { CurrentUserContext } from "@/context";
import { useRouter } from "next/navigation";
import { FormEventHandler, useContext, useState } from "react";

export default function Home() {
    const currentUserCtx = useContext(CurrentUserContext);
    const setCurrentUser = currentUserCtx?.setCurrentUser;

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: FormEventHandler = async (event) => {
        if (!setCurrentUser) return;

        event.stopPropagation();
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        // Data object
        const data = {
            id: Number(formData.get("id") as string),
        };

        setIsLoading(true);

        await fetch(
            `http://localhost:8000/survivors/find?format=json&id=${data.id}`
        )
            .then((res) => res.json())
            .then((res) => {
                if (!res) {
                    alert("Something went wrong. User could not be found!");
                    setIsLoading(false);
                    return;
                }

                setCurrentUser({
                    id: data.id,
                    inventory: res.inventory,
                });
                localStorage.setItem("userID", data.id.toString()); // Using localStorage rather than cookies because it's faster to use without libraries.
                setIsLoading(false);
                router.push("/survivors");
            })
            .catch(() => {
                alert("Something went wrong. User could not be found!");
                setIsLoading(false);
            });
    };

    return (
        <div className="min-h-screen py-20 custom_container flex items-center justify-center">
            <div className="max-w-lg w-full">
                <h1 className="text-3xl font-black uppercase mb-2.5 mt-5">
                    Enter Survivor ID
                </h1>

                {/* In a real application, this would be a login page. For the purposes of this task, it is a simple ID entry, which directly "signs you in" to the survior in question. */}
                <form onSubmit={onSubmit}>
                    <div className="mb-5">
                        <label htmlFor="login_id">Survivor ID</label>

                        <input
                            type="text"
                            id={`login_id`}
                            name={`id`}
                            className="field_std"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="button_std"
                        disabled={isLoading}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
