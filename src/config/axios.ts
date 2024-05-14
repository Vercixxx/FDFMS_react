import axios from 'axios';

axios.defaults.baseURL = 'http://172.105.74.117:8000/';


const refreshToken = async () => {
    const token = sessionStorage.getItem('token');
    let refreshToken = null;
    let accessToken = null;

    if (token) {
        try {
            refreshToken = JSON.parse(token).refreshToken;
            accessToken = JSON.parse(token).accessToken;
        } catch (error) {
            console.error('Invalid token in session storage', error);
        }
    }

    if (refreshToken) {
        axios.post('/api/v1/jwt/refresh/', { refresh: refreshToken }).then((response) => {
            sessionStorage.setItem('token', JSON.stringify(response.data));
            axios.defaults.headers.common['Authorization'] = `JWT ${response.data.accessToken}`;
        }).catch((error) => {
            console.log(error);
        });
    }
};

setInterval(refreshToken, 58 * 60 * 1000);