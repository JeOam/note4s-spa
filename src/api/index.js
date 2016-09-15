import Vue from 'vue'
import user from './user'

const baseGet = (url, data) => {
  return new Promise((resolve, reject) => {
    Vue.http.get(url, {params: data}).then((response) => {
      resolve(response.data.data)
    })
  })
}
const baseGetDetail = (url, id) => {
  return new Promise((resolve, reject) => {
    let computedUrl = url + id
    Vue.http.get(computedUrl).then((response) => {
      resolve(response.data.data)
    })
  })
}
const baseUpdate = (url, data) => {
  return new Promise((resolve, reject) => {
    var _url = url + data.id
    Vue.http.put(_url, data).then((response) => {
      resolve(response.ok)
    })
  })
}
const baseCreate = (url, data) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data).then((response) => {
      resolve([response.ok, response.data.data])
    })
  })
}
const baseDelete = (url, id) => {
  return new Promise((resolve, reject) => {
    let _url = url + id
    Vue.http.delete(_url).then((response) => {
      resolve(response.ok)
    })
  })
}

export default {
  baseGet,
  baseGetDetail,
  baseUpdate,
  baseCreate,
  baseDelete,
  user
}
