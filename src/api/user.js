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

const getProfile = (params) => {
  return api.baseGet('api/profile/', params)
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

const followUser = (name) => {
  return api.baseCreate('api/user/follow/', {username: name})
}

const unfollowUser = (name) => {
  return api.baseCreate('api/user/unfollow/', {username: name})
}

const getFollowers = (params) => {
  return api.baseGet('api/user/follower/', params)
}

const getFollowing = (params) => {
  return api.baseGet('api/user/following/', params)
}

const getStars = (params) => {
  return api.baseGet('api/user/star/', params)
}

export default {
  login,
  register,
  getProfile,
  checkUsername,
  getNotifications,
  getContributions,
  getUserList,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getStars
}
