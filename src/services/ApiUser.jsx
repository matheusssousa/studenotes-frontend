import axios from "axios";

const ApiUser = axios.create({
    baseURL: 'http://localhost:8000/api/user',
    headers: { Authorization: `Bearer ${sessionStorage.getItem("@App:token")}` },
})

export default ApiUser;