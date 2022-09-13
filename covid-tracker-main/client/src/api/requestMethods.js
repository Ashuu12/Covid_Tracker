import axios from 'axios';
import cookies from 'js-cookie'

const BASE_URL = "http://localhost:5000/api/"
const access_token = cookies.get("access-token")

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { access_token }
})