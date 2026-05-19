import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  const formatTime = computed(() => {
    return dayjs.unix(time.value).format('mm分ss秒')
  })
  const start = (currentTime) => {
    time.value = currentTime
    timer && clearInterval(timer)

    timer = setInterval(() => {
      if (timer.value <= 0) {
        clearInterval(timer)
        timer = null
        return
      }
      time.value--
    }, 1000)
  }
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start,
  }
}
