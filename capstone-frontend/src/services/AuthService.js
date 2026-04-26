import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3500/api/';

export async function signup(name, email, password) {
    const { data } = await axios.post(`${baseUrl}signup`, { name, email, password });
    return data;
}

export async function login(email, password) {
    const { data } = await axios.post(`${baseUrl}login`, { email, password });
    return data;
}