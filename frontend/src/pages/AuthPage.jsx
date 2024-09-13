import { useState } from "react"
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true);

    const toggleAuth = () => {
        setIsLogin(val => !val);
    }

    return (
        <div className="w-full h-screen grid grid-flow-col grid-cols-1 lg:grid-cols-2 bg-slate-100">
            <div className="w-full h-full flex justify-center items-center">
                {
                    isLogin ?
                    <LoginForm handleClick={toggleAuth} /> :
                    <RegisterForm handleClick={toggleAuth} />
                }
            </div>
            <div className="w-full h-full hidden lg:block overflow-hidden rounded-tl-full roundend shadow-2xl shadow-black">
                <img className="object-cover w-full h-full" src="/src/assets/authBg.jpg" alt="Picture of movies" />
            </div>
        </div>
    )
}

export default AuthPage