import http from '@/utils/http'

export function getTopCategoryAPI(id) {
  return http({
    url: '/category',
    params: {
      id,
    },
  })
}
