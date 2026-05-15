import http from '@/utils/http'

export function loginAPI({ account, password }) {
  return http({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password,
    },
  })
}
