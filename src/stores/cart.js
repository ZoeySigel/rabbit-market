import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])

    const addCart = (goods) => {
      const item = cartList.value.find((item) => item.skuId === goods.skuId)

      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push({
          ...goods,
          selected: goods.selected ?? true,
        })
      }
    }

    const delCart = (skuId) => {
      const index = cartList.value.findIndex((item) => item.skuId === skuId)
      if (index != -1) {
        cartList.value.splice(index, 1)
      }
    }
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      if (item) {
        item.selected = selected
      }
    }

    const allCheck = (selected) => {
      cartList.value.forEach((item) => {
        item.selected = selected
      })
    }

    const isAll = computed(() => {
      return (
        cartList.value.length > 0 &&
        cartList.value.every((item) => {
          return item.selected
        })
      )
    })

    const allCount = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count, 0)
    })

    const allPrice = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.count * item.price, 0)
    })

    const selectedCount = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.count, 0)
    })
    const selectedPrice = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.count * item.price, 0)
    })
    return {
      cartList,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      isAll,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
    }
  },
  {
    persist: true,
  },
)
