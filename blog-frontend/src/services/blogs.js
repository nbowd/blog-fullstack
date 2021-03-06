import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}
const blogService = { setToken, getAll, create, updateBlog, deleteBlog }

export default blogService