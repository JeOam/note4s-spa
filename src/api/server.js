// const request = require('superagent')

export default {
  getNotebooks (userId) {
    // request.get()
    return [
      { id: 1, name: 'Learn JavaScript' },
      { id: 2, name: 'Learn Vue.js' },
      { id: 3, name: 'Build Something Awesome' }
    ]
  }
}
