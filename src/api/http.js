import axios from "axios";

export const getRequest = async (url) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const API_URL = process.env.REACT_APP_API_BASE_URL;
