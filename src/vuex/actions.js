import api from '../api/server'

let falure = 'FAILURE'
let success = 'SUCCESS'

export const fetchNotebooks = function ({dispatch}, e) {
  dispatch('GETNOTEBOOKS', api.getNotebooks(e))
}

export const updateNotebookInfo = function ({dispatch}, e) {
  dispatch('UPDATENOTEBOOKINFO', e.target.value)
}

export const login = function ({dispatch}, email, password) {
  return new Promise((resolve, reject) => {
    api.login(email, password).then(function (data) {
      if (data.status === falure) {
        dispatch('SETALERT', data.message, 'warning')
      } else if (data.status === success) {
        dispatch('LOGIN', data.data.key)
        resolve()
      }
    })
  })
}

export const logout = function ({dispatch}) {
  dispatch('LOGOUT')
}

export const setAlert = function ({dispatch}, message, type) {
  dispatch('SETALERT', message, type)
}
