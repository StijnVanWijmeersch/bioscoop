import { useFormik } from "formik"
import { loginSchema } from "../schemas"
import PropTypes from "prop-types"
import AuthButton from "../components/AuthButton";
import { authenticate } from "../api";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import useLoginCheck from "../hooks/useLoginCheck";

const LoginForm = ({ handleClick }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { notifySuccess, notifyFailure } = useToast();
    const { setIsLoggedIn } = useLoginCheck();

    const onSubmitLogin = async () => {
        try {
            const loginResponse = await authenticate(values);
            const { status } = loginResponse;
            if(status === 200) {
                notifySuccess("Login successfull")
                setIsLoggedIn(true)
                
                setTimeout(() => { 
                    location.state?.from 
                    ? navigate(location.state.from)
                    : navigate('/');
                }, 1500);
            }
        } catch(err) {
            notifyFailure(err.response.data);
        }
        
    }

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: onSubmitLogin,
    });



    return (
        <div className="p-14 pt-12 shadow-xl rounded-lg bg-slate-100 shadow-gray-300">

            <Toaster />

            <h1 className="mb-8 font-semibold text-4xl text-amber-900 tracking-wide">Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col">
                    <label className="text-amber-900 mb-2 font-medium text-lg">email</label>
                    <input className={`${errors.email && touched.email ?
                    'border-red-600 border-b-2' :
                    'border-slate-300 border-b-2'}
                    appearance-none py-2 pr-2 text-gray-700 leading-tight outline-none w-80 bg-slate-100`}
                    type="email" placeholder="email" value={values.email} onChange={handleChange} onBlur={handleBlur} name="email"/>
                    {errors.email && touched.email && <span className="text-red-600 text-xs mt-1">{errors.email}</span>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="text-amber-900 mb-2 font-medium text-lg">Password</label>
                    <input className={`${errors.password && touched.password ?
                    'border-red-600 border-b-2' :
                    'border-slate-300 border-b-2'} appearance-none border-b-2 w-80 py-2 pr-2 text-gray-700 leading-tight outline-none bg-slate-100`}
                    type="password" placeholder="*********" value={values.password} onChange={handleChange} onBlur={handleBlur} name="password"/>
                    {errors.password && touched.password && <span className="text-red-600 text-xs mt-1">{errors.password}</span>}
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-sm font-light text-amber-700 hover:cursor-pointer hover:text-amber-500" onClick={handleClick}>Sign up here!</p>
                    <AuthButton type='submit'>Login</AuthButton>
                </div>
            </form>
        </div>
    )
}


LoginForm.propTypes = {
    handleClick: PropTypes.func
}

export default LoginForm