import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    timeout: 10000
})

export default instance;