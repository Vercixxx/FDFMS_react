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

export const AddUser = async (data: any) => {

    try {
        const response = await axios.post('api/create/', data);
        return response.data.message;
    
    } catch (error) {
        throw new Error(error.message || 'Error while fetching data, please try again');
    }

};
export const EditUser = async (username: string, data: any) => {};


export const DeleteUser = async (username: string) => {
    try {
        const response = await axios.delete(`api/users/delete/${username}/`);
        console.log(response);
        
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error while fetching data, please try again');
    }
} 