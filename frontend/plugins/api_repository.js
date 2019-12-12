import createRepository from '@/common/api.service'
export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)
  inject('apiService', repositoryWithAxios)
}
