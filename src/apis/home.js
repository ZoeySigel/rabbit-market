import http from '@/utils/http'

export function getBannerAPI(params = {}) {
  const { distributionSite = '1' } = params
  return http({
    url: '/home/banner',
    params: {
      distributionSite,
    },
  })
}

export function getNewAPI() {
  return http({
    url: '/home/new',
  })
}

export function getHotAPI() {
  return http({
    url: '/home/hot',
  })
}

export function getGoodsAPI() {
  return http({
    url: '/home/goods',
  })
}

export function getLikeListAPI(params = {}) {
  const { limit = 4 } = params
  return http({
    url: '/goods/relevant',
    params: {
      limit,
    },
  })
}
