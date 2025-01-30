import { CurrentUserContext } from "@/context";
import Link from "next/link";
import { useContext } from "react";

const Nav = () => {
    const currentUserCtx = useContext(CurrentUserContext);
    const currentUser = currentUserCtx?.currentUser;

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex-shrink-0">
            <div className="custom_container h-16 gap-5 flex items-stretch justify-start">
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
            </div>
        </nav>
    );
};

export default Nav;
