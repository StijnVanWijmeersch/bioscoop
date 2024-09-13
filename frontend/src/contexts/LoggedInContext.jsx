import { createContext, useEffect, useState } from "react";
import { verifyUser } from "../api";

export const LoginContext = createContext();

const LoggedInContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await verifyUser();
                const { status } = response;
                if(status === 200) {
                    setIsLoggedIn(true)
                }
            } catch(err) {
                console.log(err);
            }
        })();
    }, [])

    return <LoginContext.Provider value={ { isLoggedIn, setIsLoggedIn } } {...props}></LoginContext.Provider>
}

export default LoggedInContextProvider