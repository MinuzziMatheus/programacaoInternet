import axios from 'axios'

const api = axios.create({
   baseURL: `http://${location.hostname}:3000`,
   'Content-Type': 'application/json',
   Accept: 'application/json',
   timeout: 5000
})

const get = (endpoint) => {
   return api.get(endpoint)
}

const post = (endpoint, content) => {
   return api.post(endpoint, content)
}

const deleteUser = (endpoint, content) => {
   return api.delete(endpoint, content)
}

export default {
   get, post, deleteUser
}