<script setup>
import { powerSet } from '@/utils/power-set'
import { watch } from 'vue'
let pathMap = {}
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({}),
  },
})
const changeSku = (item, val) => {
  if (val.disabled) return
  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach((valItem) => {
      valItem.selected = false
    })
    val.selected = true
  }
  updateDisabledState(props.goods.specs, pathMap)
}
const getPathMap = (goods) => {
  const pathMap = {}

  const effectiveSkus = goods.skus.filter((sku) => sku.inventory > 0)

  effectiveSkus.forEach((sku) => {
    const selectedValArr = sku.specs.map((spec) => spec.valueName)

    const valueArrPowerSet = powerSet(selectedValArr)

    valueArrPowerSet.forEach((arr) => {
      const key = arr.join('*')

      if (pathMap[key]) {
        pathMap[key].push(sku.id)
      } else {
        pathMap[key] = [sku.id]
      }
    })
  })

  return pathMap
}
const initDisabledState = (specs, pathMap) => {
  specs.forEach((item) => {
    item.values.forEach((val) => {
      val.disabled = !pathMap[val.name]
    })
  })
}
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((value) => value.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })

  return arr
}
const updateDisabledState = (specs, pathMap) => {
  specs.forEach((item, index) => {
    const selectedValues = getSelectedValues(specs)

    item.values.forEach((val) => {
      if (val.selected) return

      const _selectedValues = [...selectedValues]

      _selectedValues[index] = val.name

      const key = _selectedValues.filter((value) => value).join('*')

      val.disabled = !pathMap[key]
    })
  })
}
watch(
  () => props.goods,
  (goods) => {
    console.log('goods：', goods)
    console.log('goods.skus：', goods.skus)

    if (goods.skus) {
      console.log('skus数量：', goods.skus.length)
      console.log('第一个sku：', goods.skus[0])
      console.log(
        '有库存skus：',
        goods.skus.filter((sku) => sku.inventory > 0),
      )

      pathMap = getPathMap(props.goods)
      console.log('路径字典：', pathMap)

      initDisabledState(props.goods.specs, pathMap)
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
          />
          <span
            v-else
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
          >
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        object-fit: cover;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
