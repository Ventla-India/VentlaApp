import api from './api';
import { ENDPOINTS } from './urls';

export const fetchInformation = async () => {
  try {
    const response = await api.get(ENDPOINTS.INFORMATION);
    return response.data;
  } catch (error) {
    // You can customize error handling here
    throw error;
  }
}; 