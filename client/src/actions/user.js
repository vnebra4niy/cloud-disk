import axios from 'axios';
import { setUser } from '../reducers/userReducer';

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        });
        alert(response.data.message);
    } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
            alert(e.response.data.message);
        } else {
            alert('Something went wrong with the request.');
        }
    }
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message);
            } else {
                alert('Something went wrong with the request.');
            }
        }
    };
};

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            localStorage.removeItem('token');
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message);
            }
        }
    };
};