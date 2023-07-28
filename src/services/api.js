import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-niceplanet.fly.dev/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default api