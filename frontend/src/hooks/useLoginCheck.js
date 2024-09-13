import { useContext } from "react"
import { LoginContext } from "../contexts/LoggedInContext"

const useLoginCheck = () => {
    return useContext(LoginContext);
}

export default useLoginCheck