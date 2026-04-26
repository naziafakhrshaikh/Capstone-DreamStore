import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3500/api/';

export async function createCheckoutSession(items) {
    const { data } = await axios.post(`${baseUrl}create-checkout-session`, { items });
    return data;
}