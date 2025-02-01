import { CurrentUserContext } from "@/context";
import Link from "next/link";
import { useContext, useState } from "react";
import LocationModal from "./LocationModal";

const Nav = () => {
    const currentUserCtx = useContext(CurrentUserContext);
    const currentUser = currentUserCtx?.currentUser;

    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-white shadow-sm flex-shrink-0">
                <div className="custom_container h-16 flex items-stretch justify-start">
                    <Link
                        href="/"
                        className="h-full flex items-center text-center justify-center hover:bg-gray-200 p-5"
                    >
                        Change Survivor
                    </Link>

                    {currentUser ? (
                        <>
                            <Link
                                href="/survivors"
                                className="h-full flex items-center text-center justify-center hover:bg-gray-200 p-5"
                            >
                                All Survivors
                            </Link>

                            <Link
                                href={`/survivors/${currentUser?.id}`}
                                className="h-full flex items-center text-center justify-center hover:bg-gray-200 p-5"
                            >
                                My Profile
                            </Link>

                            <button
                                type="button"
                                className="h-full flex items-center text-center justify-center hover:bg-gray-200 p-5"
                                onClick={() => setIsLocationModalOpen(true)}
                            >
                                Update Location
                            </button>
                        </>
                    ) : null}
                </div>
            </nav>

            <LocationModal
                isOpen={isLocationModalOpen}
                setIsOpen={setIsLocationModalOpen}
            />
        </>
    );
};

export default Nav;
