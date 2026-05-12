import http from '@/utils/http'

export function getDetailAPI(id) {
  return http({
    url: '/goods',
    params: {
      id,
    },
  })
}
export function getHotGoodsAPI({ id, type, limit = 3 }) {
  return http({
    url: 'goods/hot',
    params: {
      id,
      type,
      limit,
    },
  })
}
