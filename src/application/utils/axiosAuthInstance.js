import axios from "axios";
import store from "../redux/store";

const axiosAuthInstance = axios.create({
    baseURL: process.env.BASE_URL, // Ensure you set this environment variable
});

axiosAuthInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.user.user.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosAuthInstance;
