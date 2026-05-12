<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

defineProps({
  imageList: {
    type: Array,
    default: () => [],
  },
})

const show = ref(false)
const activeIndex = ref(0)

const target = ref(null)

const { elementX, elementY, isOutside } = useMouseInElement(target)

const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)

watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) return

  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
  if (elementX.value < 100) {
    left.value = 0
  } else if (elementX.value > 300) {
    left.value = 200
  } else {
    left.value = elementX.value - 100
  }

  if (elementY.value < 100) {
    top.value = 0
  } else if (elementY.value > 300) {
    top.value = 200
  } else {
    top.value = elementY.value - 100
  }
})
</script>

<template>
  <div class="goods-image">
    <div class="middle" ref="target" @mouseenter="show = true" @mouseleave="show = false">
      <img :src="imageList[activeIndex]" alt="" />
      <div
        class="layer"
        v-show="show"
        :style="{
          left: `${left}px`,
          top: `${top}px`,
        }"
      ></div>
    </div>

    <div
      class="large"
      v-show="show"
      :style="{
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      }"
    />

    <ul class="small">
      <li
        v-for="(img, i) in imageList"
        :key="img"
        :class="{ active: i === activeIndex }"
        @mouseenter="activeIndex = i"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
    position: absolute;
  }

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      border: 2px solid transparent;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover,
      &.active {
        border-color: $xtxColor;
      }
    }
  }
}
</style>
