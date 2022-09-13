import axios from 'axios';
const cookies = require('js-cookie');

const BASE_URL = "http://localhost:5000/api/"
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjEzZDliMjZiODNkNDQzZTA3M2VlYmQiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjUwNjEwMTE4fQ.hJDsyZ1dRtPdctdQ7Funmae-f2r0aFbS48RpnW3morE"
console.log("access toke0", access_token)

export const adminRequest = axios.create({
    baseURL: BASE_URL,
    headers: { access_token: access_token }
})