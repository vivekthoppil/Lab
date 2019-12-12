import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type'
import { LOGIN, LOGOUT, REGISTER } from './actions.type'
import JwtService from '@/common/jwt.service'

export const state = () => ({
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
})

export const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  }
}

export const actions = {
  [LOGIN](context, credentials) {
    const service = this.$apiService
    return new Promise((resolve) => {
      service
        .post('/authentication/users/login/', credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    })
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  [REGISTER](context, credentials) {
    const service = this.$apiService
    return new Promise((resolve, reject) => {
      service
        .post('/authentication/users', credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  }
}

export const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}
