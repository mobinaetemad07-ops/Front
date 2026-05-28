import api from "../utils/axios";


export const authService = {
  getMe: async () => {
    try {
      const response = await api.get('/me/');
      return response.data;
    } catch (error) {
      console.error('getMe error:', error);
      return null;
    }
  },
  login: async (data) => {
    const response = await api.post('/login/', data);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/logout/');
    return response.data;
  },
};