import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type'
import { LOGIN, LOGOUT, REGISTER } from './actions.type'
import ApiService from '@/common/api.service'
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
    return new Promise((resolve) => {
      ApiService.post('/authentication/users/login', { user: credentials })
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
    return new Promise((resolve, reject) => {
      ApiService.post('/authentication/users', { user: credentials })
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
