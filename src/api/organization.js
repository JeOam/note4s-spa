import api from './index.js'

const checkOrgName = (name) => {
  return api.baseCreate('api/organization/checkname/', {name: name})
}

const createOrganization = (params) => {
  return api.baseCreate('api/organization/', params)
}

export default {
  checkOrgName,
  createOrganization
}
