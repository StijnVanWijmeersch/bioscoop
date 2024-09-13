import { createContext } from "react";
import toast from "react-hot-toast";

export const ToastContext = createContext();

const ToastContextProvider = (props) => {

    const notifySuccess = (message) => toast.success(message, {
        duration: 1500,
        position: "top-right",
    });

    const notifyFailure = (message) => toast.error(message, {
        duration: 2500,
        position: "top-right",
    });

    return <ToastContext.Provider value={{ notifySuccess, notifyFailure }} {...props}></ToastContext.Provider>
}

export default ToastContextProvider;