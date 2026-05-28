import api from '../utils/axios'


export const blogService = {
 getAll:async()=>{
    const response = await api.get('/blogs/')
    return response.data
  },

  async getBlogById(id) {
    const response = await api.get(`/blogs/${id}/`)
    return response.data
  },
}