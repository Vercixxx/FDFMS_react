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
        throw new Error(error.message || 'Error while fetching data, please try again');
    }
}

export const getUserDetails = async (username: string, user_role: string) => {
    try {
        const response = await axios.get(`api/users/get/${username}/${user_role}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error while fetching data, please try again');
    }

};

export const AddUser = async (data: any) => {};
export const EditUser = async (username: string, data: any) => {};