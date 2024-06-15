
import axios from 'axios';
import {getJwtToken} from "../auth/auth";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + getJwtToken(),
    },
    withCredentials: true,
});

export default instance;
