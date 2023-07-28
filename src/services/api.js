import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.1.4:3001/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default api