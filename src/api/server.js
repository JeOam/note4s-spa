var Vue = require('vue')

var login = function (email, password, callback) {
  Vue.http.post('api/rest-auth/login/', {email: email, password: password}).then(function (response) {
    return callback(response.data)
  }, function (response) {
    return callback({
      'status': 'FAILURE',
      'message': '登录失败，请检查网络连接。'
    })
  })
}

export default {
  getNotebooks (userId) {
    // request.get()
    return [
      { id: 1, name: 'Learn JavaScript' },
      { id: 2, name: 'Learn Vue.js' },
      { id: 3, name: 'Build Something Awesome' }
    ]
  },
  login
}
