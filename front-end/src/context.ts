import { createContext } from "react";
import { IUser } from "./types/IUser";

const CurrentUserContext = createContext<{
    currentUser: IUser | null;
    setCurrentUser: (user: IUser | null) => void;
    refetchUser: () => Promise<void>;
} | null>(null);

export { CurrentUserContext };
