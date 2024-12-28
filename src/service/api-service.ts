import axios from "axios";

const API_URL = "http://localhost:3000/api";

const getHeaders = () => ({
    authorization: localStorage.getItem("token") || "",
});

const handleErrorResponse = (error: any) => {
    if (error.response?.status === 401) {
        console.error("Unauthorized");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
    throw error.response?.data || error;
};

export const getData = async (url: string) => {
    try {
        const response = await axios.get(`${API_URL}/${url}`, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
};

export const postData = async (url: string, data: any) => {
    try {
        const response = await axios.post(`${API_URL}/${url}`, data, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
};

export const putData = async (url: string, data: any) => {
    try {
        const response = await axios.put(`${API_URL}/${url}`, data, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
};
