//import axios from 'axios';
import axios from './customize-axios';
const fetchUsers = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name, job });
}

const putUpdateUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`, { name, job });
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}

const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
}

export { fetchUsers, postCreateUser, putUpdateUser, deleteUser, loginApi };