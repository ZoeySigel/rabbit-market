import http from '@/utils/http'

export const getCheckoutInfoAPI = () => {
  return http({
    url: '/member/order/pre',
  })
}
