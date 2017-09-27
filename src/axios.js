import axios from 'axios'
import NProgress from 'nprogress'

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 1000
})

const pendingRequest = {}

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  NProgress.inc(0.2)
  pendingRequest[config.url] = 1
  let token = window.localStorage.getItem('token')
  if (token && !config.url.startsWith('api/rest-auth')) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  delete pendingRequest[response.config.url]
  let router = window.app.$router
  if (response.config.headers['Content-Type'] && response.config.headers['Content-Type'][0] === 'application/pdf; charset="utf-8"') {
    console.log(response.config.url)
  } else if (!response.statusText === 'OK' && response.status === 0) {
    // 网络错误
    window.app.methods.showNotification(
      'Network Errors: Please check your network configuration.',
      'warning',
      3,
      window.app.$children[0]
    )
    response.status = 200
    response.data = {
      code: 200,
      data: []
    }
  } else if (response.status === 401 || response.data.code === 401) {
    // 未登录或登录过期
    window.app.methods.showNotification('Please login first.', 'warning', 3, window.app.$children[0])
    response.status = 200
    response.ok = false
    response.data = {
      code: 200,
      data: []
    }
    window.localStorage.removeItem('token')
    if (router.app.$route.name !== 'login') {
      window.localStorage.setItem('lastRouteParams', JSON.stringify(router.app.$route.params))
      router.push({name: 'login', query: {next: router.app.$route.name}})
    } else {
      router.push({name: 'login', query: {next: router.app.$route.query.next}})
    }
  } else if (response.status === 404 || response.data.code === 404) {
    router.push({name: '404'})
  } else if (response.status >= 300 || response.data.code !== 200) {
    // API 访问出错
    window.app.methods.showNotification(response.data.message, 'error', 5, window.app.$children[0])
    response.status = 200
    response.ok = false
    response.data = {
      code: 200,
      data: []
    }
  } else {
    console.log(response.config.url)
  }
  if (Object.keys(pendingRequest).length === 0) {
    NProgress.done()
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
