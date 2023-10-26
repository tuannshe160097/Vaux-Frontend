import axios from 'axios';
// import { config } from 'vuex-module-decorators';

export default function ({ app }) {
    const instance = axios.create({
        baseURL: process.env.baseURL,
    });
    instance.interceptors.request.use(
        (config) => {
            const token = app.$cookies.get('jwt');
            if (token) config.headers.Authorization = `Bearer ${token}`;
            // else app.$router.push('/authen/login')
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    app.$axios = instance;
}