import axios from 'axios';

const API_URL = 'http://localhost:5002/api/climate-changes';

export const fetchClimateChanges = async () => {
    return await axios.get(API_URL);
};

export const fetchClimateChangeById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const fetchDisasterById = async (id) => {
    return await axios.get(`${API_URL}/disaster/${id}`);
};
