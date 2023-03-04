import { createContext, useEffect, useMemo, useState } from "react";
import data from "../data.json";

interface User {
    avatar: string;
    name: string;
}

type UserContextType = {
    user: User | null;
};

interface Props {
    children: React.ReactNode;
}

const iUserContextState = {
    user: null,
};

export const UserContext = createContext<UserContextType>(iUserContextState);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser({ avatar: data.currentUser.image.webp, name: data.currentUser.username });
    }, []);

    const value = useMemo(() => ({ user }), [user]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
