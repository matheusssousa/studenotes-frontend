import axios from "axios";

const ApiAdmin = axios.create({
    baseURL: 'http://localhost:8000/api/admin',
    headers: { Authorization: `Bearer ${sessionStorage.getItem("@App:token")}` },
})

export default ApiAdmin;