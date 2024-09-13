import axios from "axios";


const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const sendDataToApi = async (route, payload, includeCredentials = false) => {
    const response = await axios.post(baseUrl+route, payload, {
        withCredentials: includeCredentials
    });
    return response;
}

export const authenticate = async (payload) => {
    const response = await axios.post(baseUrl+'/auth/login', payload, {
        withCredentials: true
    });
    return response;
}

export const logout = async () => {
    const response = await axios.get(baseUrl+'/auth/logout', { withCredentials: true });
    return response;
}

export const verifyUser = async () => {
    const response = await axios.get(baseUrl+'/auth/verify', { withCredentials: true });
    return response;
}

export const fetchAll = async (route, includeCredentials = false) => {
    const response = await axios.get(baseUrl+route, { withCredentials: includeCredentials });
    return response;
}

export const fetchById = async (route, id, includeCredentials = false) => {
    const response = await axios.get(baseUrl+route+`/${id}`, { withCredentials: includeCredentials });
    return response;
}

export const setTicketPayed = async (id) => {
    const response = await axios.put(baseUrl+'/tickets/'+id, null, { withCredentials: true });
    return response;
}