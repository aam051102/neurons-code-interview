import { createContext } from "react";
import { IUser } from "./types/IUser";

const CurrentUserContext = createContext<{
    currentUser: IUser | null;
    setCurrentUser: (user: IUser | null) => void;
} | null>(null);

export { CurrentUserContext };
