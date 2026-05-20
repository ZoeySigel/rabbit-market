import http from '@/utils/http'

export function getUserOrderAPI(params) {
  return http({
    url: '/member/order',
    method: 'GET',
    params,
  })
}
