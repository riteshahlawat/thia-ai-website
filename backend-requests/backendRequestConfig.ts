import axios from 'axios';

const BackendRequestConfig = axios.create({
    baseURL: 'https://api.thia.tech/',
});

// See https://stackoverflow.com/questions/27513994/chrome-stalls-when-making-multiple-requests-to-same-resource
BackendRequestConfig.defaults.headers.common['Cache-Control'] = 'no-cache';

export default BackendRequestConfig;
