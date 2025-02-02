import { CurrentUserContext } from "@/context";
import Link from "next/link";
import { useContext, useState } from "react";
import LocationModal from "./LocationModal";
import LoginModal from "./LoginModal";

const Nav = () => {
    const currentUserCtx = useContext(CurrentUserContext);
    const currentUser = currentUserCtx?.currentUser;

    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-white border-b border-b-gray-200 flex-shrink-0">
                <div className="custom_container h-16 flex items-stretch justify-start">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLoginModalOpen(true);
                        }}
                        className="nav_item"
                    >
                        Login
                    </button>

                    <Link href="/" className="nav_item">
                        Overview
                    </Link>

                    {currentUser ? (
                        <>
                            <Link
                                href={`/survivors/${currentUser?.id}`}
                                className="nav_item"
                            >
                                Profile
                            </Link>

                            <button
                                type="button"
                                className="nav_item"
                                onClick={() => setIsLocationModalOpen(true)}
                            >
                                Relocate
                            </button>
                        </>
                    ) : null}
                </div>
            </nav>

            <LocationModal
                isOpen={isLocationModalOpen}
                setIsOpen={setIsLocationModalOpen}
            />

            <LoginModal
                isOpen={isLoginModalOpen}
                setIsOpen={setIsLoginModalOpen}
            />
        </>
    );
};

export default Nav;
