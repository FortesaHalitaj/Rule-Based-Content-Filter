import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getHealth = async () => {
    const response = await API.get("/health");
    return response.data;
};

//rules
export const getRules = async () => {
    const response = await API.get("/rules");
    return response.data;
};

export const createRule = async (rule) => {
    const response = await API.post("/rules", rule);
    return response.data;
};

export const updateRule = async (id, rule) => {
    const response = await API.put(`/rules/${id}`, rule);
    return response.data;
};

export const deleteRule = async (id) => {
    const response = await API.delete(`/rules/${id}`);
    return response.data;
};

//filtering
export const filterContent = async (content) => {
    const response = await API.post("/filter/check", {
        content,
    });

    return response.data;
};

export default API;