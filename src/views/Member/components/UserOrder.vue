<script setup>
import { getUserOrderAPI } from '@/apis/order'
import { onMounted, ref } from 'vue'

const tabTypes = [
  { name: 0, label: '全部订单' },
  { name: 1, label: '待付款' },
  { name: 2, label: '待发货' },
  { name: 3, label: '待收货' },
  { name: 4, label: '待评价' },
  { name: 5, label: '已完成' },
  { name: 6, label: '已取消' },
]
const orderList = ref([])
const total = ref(0)

const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 2,
})
const getOrderList = async () => {
  const res = await getUserOrderAPI(params.value)
  orderList.value = res.result.items
  total.value = res.result.counts
}
const tabChange = (type) => {
  params.value.orderState = type
  params.value.page = 1
  getOrderList()
}
const pageChange = (page) => {
  params.value.page = page
  getOrderList()
}
const formatOrderState = (orderState) => {
  const stateMap = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已完成',
    6: '已取消',
  }

  return stateMap[orderState]
}
onMounted(() => {
  getOrderList()
})
</script>

<template>
  <div class="order-container">
    <el-tabs @tab-change="tabChange">
      <el-tab-pane
        v-for="item in tabTypes"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
      <div class="main-container">
        <div v-if="orderList.length === 0" class="holder-container">
          <el-empty description="暂无订单数据"></el-empty>
        </div>
        <div v-else>
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <div class="head">
              <span>下单时间:{{ order.createTime }}</span>
              <span>订单编号:{{ order.id }}</span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li v-for="item in order.skus" :key="item.id">
                    <a class="image" href="javascript:;">
                      <img :src="item.image" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">{{ item.name }}</p>
                      <p class="attr ellipsis">
                        <span>{{ item.attrsText }}</span>
                      </p>
                    </div>

                    <div class="price">&yen;{{ item.realPay?.toFixed(2) }}</div>
                    <div class="count">x{{ item.quantity }}</div>
                  </li>
                </ul>
              </div>
              <div class="column state">
                <p>{{ formatOrderState(order.orderState) }}</p>
              </div>
              <div class="column amount">
                <p class="red">&yen;{{ order.payMoney?.toFixed(2) }}</p>
                <p>含运费：&yen;{{ order.postFee?.toFixed(2) }}</p>
                <p>在线支付</p>
              </div>
              <div class="column action">
                <el-button v-if="order.orderState === 1" type="primary" size="small">
                  立即付款
                </el-button>
                <el-button v-if="order.orderState === 3" type="primary" size="samll">
                  确认收货
                </el-button>
                <p><a href="javascript:;">查看详情</a></p>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                  <a href="javascript:;">再次购买</a>
                </p>
                <p v-if="[4, 5].includes(order.orderState)">
                  <a href="javascript:;">申请售后</a>
                </p>
                <p v-if="order.orderState === 1">
                  <a href="javascript:;">取消订单</a>
                </p>
              </div>
            </div>
          </div>
          <div class="pagination-container">
            <el-pagination
              :total="total"
              :page-size="params.pageSize"
              background
              layout="prev,pager,next"
              @current-change="pageChange"
            />
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
</style>
