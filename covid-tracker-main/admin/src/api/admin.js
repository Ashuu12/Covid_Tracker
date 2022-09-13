const axios = require('axios');
const cookies = require('js-cookie');

const url3 = "http://127.0.0.1:5000";
export const loginAdmin = async ({ adminId, password }) => {
    try {
        const { data } = await axios.post(`${url3}/api/admin/login`, { adminId, password });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchPendingUsers = async () => {
    console.log("qwq access token", cookies.get("access-token"))
    try {
        const { data } = await axios.post(`${url3}/api/admin/pending`, {
            access_token: cookies.get("access-token")
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const fetchUser = async (id) => {
    console.log(id)
    try {
        const { data } = await axios.post(`${url3}/api/admin/getUser`, {
            access_token: cookies.get("access-token"),
            id: id
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const acceptRequest = async (id) => {
    try {
        const { data } = await axios.post(`${url3}/api/admin/acceptRequest`, {
            access_token: cookies.get("access-token"),
            id: id
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const rejectRequest = async (id) => {
    try {
        const { data } = await axios.post(`${url3}/api/admin/rejectRequest`, {
            access_token: cookies.get("access-token"),
            id: id
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}