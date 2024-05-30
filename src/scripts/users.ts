import axios from 'axios';

export interface QueryParams {
    limit: number;
    query: string;
    role: string;
    status: string;
}

export const getUsers = async (queryParams: Partial<QueryParams> = {}) => {
    try {

        const response = await axios.get('api/users/getall', {
            params: queryParams
        });

        return response.data;
    } catch (error) {
        const response = {
            message: error.message || 'Error while fetching data, please try again',
            type: 'error'
        };
        return response;
    }
}

export const getUserDetails = async (username: string, user_role: string) => {
    try {
        const response = await axios.get(`api/users/get/${username}/${user_role}`);
        return response.data;
    } catch (error) {
        const response = {
            message: error.message || 'Error while fetching data, please try again',
            type: 'error'
        };
        return response;
    }

};