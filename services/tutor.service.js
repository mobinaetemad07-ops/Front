import api from '../utils/axios';

export const tutorsService = {

  getAll: async () => {
    const response = await api.get('/tutors/');
    return response.data;
  },
};