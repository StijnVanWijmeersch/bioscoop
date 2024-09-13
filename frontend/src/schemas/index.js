import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email("This is not a valid email").required("Must enter an email"),
    password: yup.string().required("Must enter a password")
})

export const registerSchema = yup.object().shape({
    firstName: yup.string().required("Must enter a firstname"),
    lastName: yup.string().required("Must enter a lastname"),
    email: yup.string().email("This is not a valid email").required("Must enter an email"),
    password: yup.string().min(8, "Password must be at least 8 character long").required("Must enter a password"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match!").required("Must enter a confirmation password")
})