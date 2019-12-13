export const createApiRepository = ($axios) => ({
  query(resource, params) {
    return $axios.get(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  get(resource, slug = '') {
    return $axios.get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  post(resource, params) {
    return $axios.post(`${resource}`, params)
  },

  update(resource, slug, params) {
    return $axios.put(`${resource}/${slug}`, params)
  },

  put(resource, params) {
    return $axios.put(`${resource}`, params)
  },

  delete(resource) {
    return $axios.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }
})

export const authApiRepository = (genericApiService) => ({
  login({ email, password }) {
    return genericApiService.post('/authentication/users/login/', {
      user: { email, password }
    })
  }
})
