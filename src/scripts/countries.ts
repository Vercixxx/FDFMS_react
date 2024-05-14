import axios from 'axios';

export const GetCountries = async () => {
    try {
        const response = await axios.get('api/countries/get/');
        return response.data;
    } catch (error) {
        return false;
    }
}

