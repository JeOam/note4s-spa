var Vue = require('vue')

var login = function (email, password) {
  return new Promise((resolve, reject) => {
    Vue.http.post('api/rest-auth/login/', {email: email, password: password}).then((response) => {
      resolve(response.data)
    }, (response) => {
      reject({
        'status': 'FAILURE',
        'message': '登录失败，请检查网络连接。'
      })
    })
  })
}

var getNotebooks = function () {
  return []
  // Vue.http.get
}

export default {
  login,
  getNotebooks
}
