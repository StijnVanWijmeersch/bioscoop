import { useContext } from "react"
import { AuthContext } from "../contexts/AuthenticationContext"

const useAuthentication = () => {
    return useContext(AuthContext);
}

export default useAuthentication;