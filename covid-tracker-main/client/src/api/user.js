import axios from 'axios';
import cookies from 'js-cookie'

const url3 = "http://127.0.0.1:5000";

export const getUser = async () => {
    let changableUrl = `${url3}/api/user/`;
    try {
        console.log("Trying to sent data")
        console.log(cookies.get('access-token'));
        const data = await axios.post(changableUrl, {
            access_token: cookies.get("access-token")
        });
        console.log("Hello")
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const getUserProfile = async () => {
    let changableUrl = `${url3}/api/user/profile`;
    try {
        console.log("Trying to sent data")
        console.log(cookies.get('access-token'));
        const data = await axios.post(changableUrl, {
            access_token: cookies.get("access-token")
        });
        console.log("Hello")
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const makeWriter = async () => {
    let changableUrl = `${url3}/api/user/make-writer`;
    try {
        console.log("Trying to sent data")
        console.log(cookies.get('access-token'));
        const data = await axios.post(changableUrl, {
            access_token: cookies.get("access-token")
        });
        console.log("Hello")
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}