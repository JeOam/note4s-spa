// const request = require('superagent')
// import { router } from '../main'
var localStorage = window.localStorage

var checkAuth = function () {
  var token = localStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
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
  checkAuth
}
