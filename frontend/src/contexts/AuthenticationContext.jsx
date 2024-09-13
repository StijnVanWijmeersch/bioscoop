import { createContext, useEffect, useState } from "react"
import { verifyUser } from "../api";


export const AuthContext = createContext();


const AuthenticationContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        verify();
    },[])

    const verify = async () => {
        try {
            const response = await verifyUser();
            const { data } = response;
            setUser(data);
        } catch(err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return <AuthContext.Provider value={ { user, isLoading } } {...props}></AuthContext.Provider>
}

export default AuthenticationContextProvider