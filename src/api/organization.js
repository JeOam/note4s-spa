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

const getOrganizations = () => {
  return api.baseGet('api/organizations/')
}

const getNotebooks = (params) => {
  return api.baseGet('api/organization/notebook/', params)
}

const getPeople = (params) => {
  return api.baseGet('api/organization/people/', params)
}

const sentInvite = (params) => {
  return api.baseCreate('api/organization/invite/', params)
}

const checkMembership = (name) => {
  return api.baseGet('api/organization/checkmembership/', {name: name})
}

const accept = (params) => {
  return api.baseCreate('api/organization/accept/', params)
}

export default {
  checkOrgName,
  createOrganization,
  getOrganizationProfile,
  getOrganizations,
  getNotebooks,
  getPeople,
  sentInvite,
  checkMembership,
  accept
}
