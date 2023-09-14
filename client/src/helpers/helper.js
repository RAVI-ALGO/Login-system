import axios from 'axios';
import jwt_decode from 'jwt-decode';

//axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** Make API Requests */


/** To get username from Token */
export async function getUsername() {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(userName) {
    try {
        return await axios.post(`${process.env.REACT_APP_API_URL}/api/authenticate`, { userName })
    } catch (error) {
        return { error: "Username doesn't exist...!" }
    }
}

/** get User details */
export async function getUser(userName) {
   
    try {

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userName}`);
        return { data };
    } catch (error) {
        return { error: "Username doesn't Match...!" }
    }
}

/** register user function */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, credentials);

        let { userName, email } = credentials;

        /** send email */
        if (status === 201) {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/registerMail`, { userName, userEmail: email, text: msg })
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}


/** update user profile function */
export async function updateUser(response) {
    try {
        const { id, ...details } = response;
        const token = await localStorage.getItem('token');
        
        const data = await axios.put(`${process.env.REACT_APP_API_URL}/api/updateuser/${id}`, details, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,

            }
        });

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile...!" })
    }
}

/** generate OTP */
export async function generateOTP(userName) {
    try {
        const { data: { code }, status } = await axios.get(`${process.env.REACT_APP_API_URL}/api/generateOTP`, { params: { userName } });
        
        if (status === 201) {
            let { data: { email } } = await getUser(userName);
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post(`${process.env.REACT_APP_API_URL}/api/registerMail`, { userName, userEmail: email, text, subject: "Password Recovery OTP" })
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ code }) {
    try {
        const { data, status } = await axios.get(`${process.env.REACT_APP_API_URL}/api/verifyOTP/${code}`,)
        return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ userName, password }) {
    try {
        const { data, status } = await axios.put(`${process.env.REACT_APP_API_URL}/api/reset-Password`, { userName, password });
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}