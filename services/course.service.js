import api from '../utils/axios';

export const coursesService = {

  getAll: async () => {
    const response = await api.get('/courses/');
    return response.data;
  },


  getById: async (id) => {
    const response = await api.get(`/courses/${id}/`);
    return response.data;
  },

  
  enroll: async (courseId) => {
    const response = await api.post('/enrollments/', { course_id: courseId });
    return response.data;
  },
};