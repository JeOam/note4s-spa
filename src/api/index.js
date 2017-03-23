import Vue from 'vue'
import user from './user'
import note from './note'
import organization from './organization'

const baseGet = (url, data) => {
  return new Promise((resolve, reject) => {
    Vue.http.get(url, {params: data}).then((response) => {
      resolve(response.data.data)
    }, () => {})
  })
}
const baseGetDetail = (url, id) => {
  return new Promise((resolve, reject) => {
    let _url = url + id
    Vue.http.get(_url).then((response) => {
      resolve(response.data.data)
    }, () => {})
  })
}
const baseUpdate = (url, data) => {
  return new Promise((resolve, reject) => {
    Vue.http.put(`${url}/${data.id}`, data).then((response) => {
      resolve(response.ok)
    }, () => {})
  })
}
const baseCreate = (url, data) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data).then((response) => {
      resolve([response.ok, response.data.data])
    }, () => {})
  })
}
const baseDelete = (url, id) => {
  return new Promise((resolve, reject) => {
    Vue.http.delete(`${url}/${id}`).then((response) => {
      resolve(response.ok)
    }, () => {})
  })
}

const getFile = function (response) {
  let result = document.createElement('a')
  let contentDisposition = response.headers.get('Content-Disposition') || ''
  let filename = contentDisposition.split('filename=')[1]
  filename = filename.replace(/"/g, '')
  return response.blob().then(function (data) {
    result.href = window.URL.createObjectURL(data)
    result.target = '_self'
    result.download = filename
    return result
  })
}

const baseDownload = (url) => {
  Vue.http.get(url).then(getFile).then(link => {
    link.click()
  })
}

export default {
  baseGet,
  baseGetDetail,
  baseUpdate,
  baseCreate,
  baseDelete,
  baseDownload,
  user,
  note,
  organization
}
