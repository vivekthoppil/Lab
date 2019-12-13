import { authApiRepository, createApiRepository } from '@/common/api.service'
export default (ctx, inject) => {
  const repositoryWithAxios = createApiRepository(ctx.$axios)
  inject('apiService', repositoryWithAxios)

  const authServiceInitialized = authApiRepository(repositoryWithAxios)
  inject('authService', authServiceInitialized)
}
