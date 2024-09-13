import { useContext } from "react";
import { ToastContext } from "../contexts/ToasterContext";

const useToast = () => {
    return useContext(ToastContext)
}

export default useToast;