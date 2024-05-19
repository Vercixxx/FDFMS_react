import axios from 'axios';

export interface IState {
    id: number;
    name: string;
    country: string;
}

export const GetStates = async () => {
    try {
        const response = await axios.get('api/states/get/');
        return response.data;
    } catch (error) {
        return false;
    }
}


export const AddState = async (data: IState) => {
    try {
        console.log(data);
        
        await axios.post('api/states/add/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const DeleteState = async (id: number) => {
    try {
        await axios.delete(`api/states/delete/${id}/`);
        return true;
    } catch (error) {
        return false;
    }
}



