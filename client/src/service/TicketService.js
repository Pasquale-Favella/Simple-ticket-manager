import axios from "axios";

export const BASE_URL = '/api/tickets';

export const getAllTickets = async ()=>{

    const response = await axios.get(BASE_URL);
    return response.data
}

export const editTicket = async ({id,title,description,laneId})=>{

    const response = await axios.put(`${BASE_URL}/edit/${id}`,
    {title,description,laneId}
    );
    return response.data
}

export const deleteTicket = async({id,laneId})=>{

    const response = await axios.delete(`${BASE_URL}/delete/${id}`,
    {data:{laneId}}
    );
    return response.data

}