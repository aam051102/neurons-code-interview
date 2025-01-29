import Link from "next/link";

const Nav = () => {
    const userID = 0;

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex-shrink-0">
            <div className="container px-20 mx-auto h-16 gap-5 flex items-stretch justify-start">
                <Link
                    href="/survivors"
                    className="h-full flex items-center text-center justify-center hover:bg-gray-200 p-5"
                >
                    All Survivors
                </Link>

                <Link
                    href={`/survivors/${userID}`}
                    className="h-full flex items-center text-center justify-center hover:bg-gray-200 p-5"
                >
                    My Profile
                </Link>
            </div>
        </nav>
    );
};

export default Nav;
