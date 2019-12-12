import { getToken } from '@/common/jwt.service'

export default function({ $axios }) {
  $axios.onRequest((config) => {
    if (getToken()) {
      config.headers.common.Authorization = 'Token ' + getToken()
    }
  })
}
