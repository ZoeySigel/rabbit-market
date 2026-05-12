import http from '@/utils/http'

export function getTopCategoryAPI(id) {
  return http({
    url: '/category',
    params: {
      id,
    },
  })
}
export function getCategoryFilterAPI(id) {
  return http({
    url: '/category/sub/filter',
    params: {
      id,
    },
  })
}
export function getSubCategoryAPI(data) {
  return http({
    url: '/category/goods/temporary',
    method: 'POST',
    data,
  })
}
