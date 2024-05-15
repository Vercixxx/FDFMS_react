import axios from 'axios';

export const GetCountries = async () => {
    try {
        const response = await axios.get('api/countries/get/');
        const dataWithIds = response.data.map((item, index) => ({ id: index + 1, ...item }));
        return dataWithIds;
    } catch (error) {
        return false;
    }
}

