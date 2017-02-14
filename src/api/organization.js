import api from './index.js'

const checkOrgName = (name) => {
  return api.baseCreate('api/organization/checkname/', {name: name})
}

const createOrganization = (params) => {
  return api.baseCreate('api/organization/', params)
}

const getOrganizationProfile = (name) => {
  return api.baseGet('api/organization/', {name: name})
}

export default {
  checkOrgName,
  createOrganization,
  getOrganizationProfile
}
