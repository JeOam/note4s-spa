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
  return api.baseGet('api/profile')
}

export default {
  login,
  register,
  getProfile,
  checkUsername
}
