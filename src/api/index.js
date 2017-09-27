import axios from 'src/axios'
import user from './user'
import note from './note'
import organization from './organization'

const baseGet = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: data}).then((response) => {
      resolve(response.data.data)
    }, () => {})
  })
}
const baseGetDetail = (url, id) => {
  return new Promise((resolve, reject) => {
    let _url = url + id
    axios.get(_url).then((response) => {
      resolve(response.data.data)
    }, () => {})
  })
}
const baseUpdate = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.put(`${url}/${data.id}`, data).then((response) => {
      resolve(response.ok)
    }, () => {})
  })
}
const baseCreate = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then((response) => {
      resolve([response.ok, response.data.data])
    }, () => {})
  })
}
const baseDelete = (url, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${url}/${id}`).then((response) => {
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
  axios.get(url).then(getFile).then(link => {
    link.click()
  })
}

const uploadFile = function (url, target) {
  return new Promise((resolve, reject) => {
    let formData = new window.FormData()
    formData.append('file', target.files[0])
    axios.post(url, formData).then((response) => {
      resolve(response.data)
    })
  })
}

export default {
  baseGet,
  baseGetDetail,
  baseUpdate,
  baseCreate,
  baseDelete,
  baseDownload,
  uploadFile,
  user,
  note,
  organization
}
