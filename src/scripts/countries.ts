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


export const AddCountry = async (name: string) => {
    try {
        await axios.post('api/countries/add/', { name: name });
        return true;
    } catch (error) {
        return false;
    }
}

export const DeleteCountry = async (name: string) => {
    try {        
        await axios.delete(`api/countries/delete/${name}`);
        return true;
    } catch (error) {
        return false;
    }
}