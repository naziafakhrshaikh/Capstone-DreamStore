import axios from 'axios';

// const baseUrl = 'http://localhost:3500/api/products/';
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3500/api/';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export async function adminAddProduct(product) {
    const { data } = await axios.post(baseUrl, product, getAuthHeader());
    return data;
}

export async function adminUpdateProduct(id, product) {
    const { data } = await axios.put(`${baseUrl}${id}`, product, getAuthHeader());
    return data;
}

export async function adminDeleteProduct(id) {
    const { data } = await axios.delete(`${baseUrl}${id}`, getAuthHeader());
    return data;
}