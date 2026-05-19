<script setup>
import { getOrderAPI } from '@/apis/checkout'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const isPaySuccess = computed(() => {
  return route.query.payResult === 'true'
})
const orderInfo = ref({})
const getOrderInfo = async () => {
  const res = await getOrderAPI(route.query.orderId)
  orderInfo.value = res.result
}
onMounted(() => {
  getOrderInfo()
})
</script>

<template>
  <span class="iconfont icon-queren2 green" v-if="isPaySuccess"></span>
  <span class="iconfont icon-shanchu red" v-else></span>

  <p class="tit">支付{{ isPaySuccess ? '成功' : '失败' }}</p>
  <p class="tip">
    {{ isPaySuccess ? '我们将尽快为您发货，请保持手机畅通' : '支付未完成，请返回订单重新支付' }}
  </p>
  <p>支付方式：<span>支付宝</span></p>
  <p>
    支付金额：<span>&yen;{{ orderInfo.payMoney?.toFixed(2) }}</span>
  </p>
  <div class="btn">
    <el-button type="primary" style="margin-right: 20px">查看订单</el-button>
    <el-button @click="$router.push('/')">进入首页</el-button>
  </div>
</template>

<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;
  .btn {
    margin-top: 50px;
  }

  > .iconfont {
    font-size: 100px;
  }

  .green {
    color: #1dc779;
  }

  .red {
    color: $priceColor;
  }

  .tit {
    font-size: 24px;
  }

  .tip {
    color: #999;
  }

  p {
    line-height: 40px;
    font-size: 16px;
  }
}
</style>
