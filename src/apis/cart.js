import http from '@/utils/http'

export const insertCartAPI = ({ skuId, count }) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}

export const findNewCartListAPI = () => {
  return http({
    url: '/member/cart',
  })
}
