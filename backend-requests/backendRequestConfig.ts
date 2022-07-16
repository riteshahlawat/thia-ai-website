import axios from 'axios';

export const BACKEND_URL_DEV = 'http://127.0.0.1:3987';
export const BACKEND_URL_PROD = 'https://api.thia.tech';

/**
 *	Configuration for Backend API requests
 */
const BackendRequestConfig = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// See https://stackoverflow.com/questions/27513994/chrome-stalls-when-making-multiple-requests-to-same-resource
BackendRequestConfig.defaults.headers.common['Cache-Control'] = 'no-cache';

export default BackendRequestConfig;
