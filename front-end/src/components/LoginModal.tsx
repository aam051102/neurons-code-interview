import { CurrentUserContext } from "@/context";
import { FormEventHandler, useContext, useState } from "react";
import Modal from "./Modal";

export default function LoginModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) {
    const currentUserCtx = useContext(CurrentUserContext);
    const setCurrentUser = currentUserCtx?.setCurrentUser;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [subModalChildren, setSubModalChildren] =
        useState<React.ReactNode>(null);

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
                    setSubModalChildren(
                        "Something went wrong. User could not be found!"
                    );
                    setIsLoading(false);
                    return;
                }

                setCurrentUser({
                    id: data.id,
                    inventory: res.inventory,
                });
                localStorage.setItem("userID", data.id.toString()); // Using localStorage rather than cookies because it's faster to use without libraries.
                setIsLoading(false);
                setIsOpen(false);
            })
            .catch(() => {
                setSubModalChildren(
                    "Something went wrong. User could not be found!"
                );
                setIsLoading(false);
            });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="mb-2.5 font-black text-lg">Login</h2>

                {/* In a real application, this would be a login page. For the purposes of this task, it is a simple ID entry, which directly "signs you in" to the survior in question. */}
                <form onSubmit={onSubmit}>
                    <div className="mb-10">
                        <label htmlFor="login_id">Survivor ID</label>

                        <input
                            type="text"
                            id={`login_id`}
                            name={`id`}
                            className="field_std"
                            required
                        />
                    </div>

                    <div className="flex gap-5">
                        <button
                            type="submit"
                            className="button_std button_std_positive"
                            disabled={isLoading}
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            className="button_std"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={!!subModalChildren}
                onClose={() => setSubModalChildren(null)}
            >
                {subModalChildren}

                <div className="mt-5">
                    <button
                        type="button"
                        className="button_std"
                        onClick={() => setSubModalChildren(null)}
                    >
                        Okay
                    </button>
                </div>
            </Modal>
        </>
    );
}
