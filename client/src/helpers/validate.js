import { toast } from "react-hot-toast";

export async function userNameValidate(values)
{
    const errors = userNameVerify({},values)
    
    return errors
}
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}


/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

/** validate register form */
export async function registerValidation(values){
    const errors = userNameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}



//...........................................



function userNameVerify(error={},values){
    if(!values.userName){
        error.userName = toast.error('Username Required...!')
    }else if(values.userName.includes(" ")) {
        error.userName = toast.error('Invalid Username...!')
        }
}

function passwordVerify(error={},values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        error.password = toast.error('Password Required...!')
    }else if(values.password.includes(" ")) {
        error.password = toast.error('Invalid Password...!')
    }else if(values.password.length <4) {
        error.password = toast.error('Password must be atleast 4 digits')
    }else if(!specialChars.test(values.password)){
        error.password = toast.error("Password must have special character");
    }
}

function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}