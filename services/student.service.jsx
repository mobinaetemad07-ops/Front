import api from '../utils/axios';

export const studentService = {
 
  getProfile: async () => {
    const response = await api.get('/students/me/dashboard');
    return response.data;
  },

 
  updateProfile: async (data) => {
    const response = await api.patch('/students/me/profile/', data);
    return response.data;
  },

 
  getDashboard: async () => {
    const response = await api.get('/students/me/dashboard/');
    return response.data;
  },

 
  enrollCourse: async (courseId) => {
    const response = await api.post('/enrollments/', { course_id: courseId });
    return response.data;
  },
};