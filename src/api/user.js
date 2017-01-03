import api from './index.js'

const login = (data) => {
  return api.baseCreate('auth/login/', data)
}

const register = (data) => {
  return api.baseCreate('auth/register/', data)
}

const checkUsername = (name) => {
  return api.baseCreate('auth/checkusername/', {username: name})
}

const getProfile = () => {
  return api.baseGet('api/profile/')
}

const getNotifications = () => {
  return api.baseGet('api/user/notification/')
}

const getContributions = (params) => {
  return api.baseGet('api/user/contribution/', params)
}

const getUserList = (params) => {
  return api.baseGet('api/user/mention/', params)
}

export default {
  login,
  register,
  getProfile,
  checkUsername,
  getNotifications,
  getContributions,
  getUserList
}
