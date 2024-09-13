import { useFormik } from "formik"
import PropTypes from "prop-types"
import AuthButton from "../components/AuthButton"
import { sendDataToApi } from "../api"
import { registerSchema } from "../schemas"
import { Toaster } from "react-hot-toast";
import useToast from "../hooks/useToast"

const RegisterForm = ({ handleClick }) => {

    const { notifySuccess, notifyFailure } = useToast();

    const handleRegister = async () => {
        try {
            const registerResponse = await sendDataToApi("/users", values);
            const { status, data } = registerResponse;
            const { email } = data;

            if(status === 201) {
                notifySuccess(`User with email ${email} has been successfully created`)
                setTimeout(() => {
                    handleClick()
                }, 1500);
            }

        } catch(err) {
            notifyFailure(err.response.data);
        }
    }

    const { values, handleSubmit, handleBlur, handleChange, errors, touched } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: registerSchema,
        onSubmit: handleRegister
    })

    return (
        <div className="p-14 pt-12 shadow-lg rounded-lg shadow-gray-300">

            <Toaster />

            <h1 className="mb-8 font-semibold text-4xl text-amber-900 tracking-wide">Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col">
                    <label className="text-amber-900 mb-2 font-medium text-lg">first name</label>
                    <input className={`${errors.firstName && touched.firstName ?
                    'border-red-600 border-b-2' :
                    'border-slate-300 border-b-2'}
                    appearance-none py-2 pr-2 text-gray-700 leading-tight outline-none w-80 bg-slate-100`} type="text" value={values.firstName} onChange={handleChange} onBlur={handleBlur} name="firstName"/>
                    {errors.firstName && touched.firstName && <span className="text-red-600 text-xs mt-1">{errors.firstName}</span>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="text-amber-900 mb-2 font-medium text-lg">last name</label>
                    <input className={`${errors.lastName && touched.lastName ?
                    'border-red-600 border-b-2' :
                    'border-slate-300 border-b-2'}
                    appearance-none py-2 pr-2 text-gray-700 leading-tight outline-none w-80 bg-slate-100`} type="text" value={values.lastName} onChange={handleChange} onBlur={handleBlur} name="lastName"/>
                    {errors.lastName && touched.lastName && <span className="text-red-600 text-xs mt-1">{errors.lastName}</span>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="text-amber-900 mb-2 font-medium text-lg">Email</label>
                    <input className={`${errors.email && touched.email ?
                    'border-red-600 border-b-2' :
                    'border-slate-300 border-b-2'}
                    appearance-none py-2 pr-2 text-gray-700 leading-tight outline-none w-80 bg-slate-100`} type="email" placeholder="******@*****.***" value={values.email} onChange={handleChange} onBlur={handleBlur} name="email"/>
                    {errors.email && touched.email && <span className="text-red-600 text-xs mt-1">{errors.email}</span>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="text-amber-900 mb-2 font-medium text-lg">Password</label>
                    <input className={`${errors.password && touched.password ?
                    'border-red-600 border-b-2' :
                    'border-slate-300 border-b-2'}
                    appearance-none py-2 pr-2 text-gray-700 leading-tight outline-none w-80 bg-slate-100`} type="password" placeholder="*********" value={values.password} onChange={handleChange} onBlur={handleBlur} name="password"/>
                    {errors.password && touched.password && <span className="text-red-600 text-xs mt-1">{errors.password}</span>}
                </div>
                <div className="mb-4 flex flex-col">
                    <label className="text-amber-900 mb-2 font-medium text-lg">confirm Password</label>
                    <input className={`${errors.confirmPassword && touched.confirmPassword ?
                    'border-red-600 border-b-2' :
                    'border-slate-300 border-b-2'}
                    appearance-none py-2 pr-2 text-gray-700 leading-tight outline-none w-80 bg-slate-100`} type="password" placeholder="*********" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} name="confirmPassword"/>
                    {errors.confirmPassword && touched.confirmPassword && <span className="text-red-600 text-xs mt-1">{errors.confirmPassword}</span>}
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-light text-amber-700 hover:cursor-pointer hover:text-amber-500" onClick={handleClick}>login!</p>
                    <AuthButton type='submit'>Sign up</AuthButton>
                </div>
            </form>
        </div>
  )
}

RegisterForm.propTypes = {
    handleClick: PropTypes.func
}

export default RegisterForm