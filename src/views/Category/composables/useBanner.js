import { onMounted, ref } from 'vue'
import { getBannerAPI } from '@/apis/home'
import { FOCUSABLE_CHILDREN } from 'element-plus/es/directives/trap-focus/index.mjs'

export function useBanner() {
  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2',
    })
    bannerList.value = res.result
  }

  onMounted(() => {
    getBanner()
  })

  return {
    bannerList,
  }
}
