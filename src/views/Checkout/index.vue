<script setup>
import { getCheckoutInfoAPI } from '@/apis/checkout'
import { ref, onMounted } from 'vue'

const checkInfo = ref({
  goods: [],
  userAddresses: [],
  summary: {
    goodsCount: 0,
    totalPrice: 0,
    postFee: 0,
    totalPayPrice: 0,
  },
})
const curAddress = ref(null)

const getCheckoutInfo = async () => {
  try {
    const res = await getCheckoutInfoAPI()

    console.log('结算接口完整返回：', res)
    console.log('结算商品列表：', res.result.goods)

    checkInfo.value = res.result
    curAddress.value = res.result.userAddresses[0]
  } catch (error) {
    console.log('结算接口报错：', error)
    console.log('后端返回：', error.response?.data)
  }
}
onMounted(() => {
  getCheckoutInfo()
})
const showDialog = ref(false)
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>

              <ul v-else>
                <li><span>收货人:</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式:</span>{{ curAddress.contact }}</li>
                <li><span>收货地址:</span>{{ curAddress.fullLocation }}{{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large">添加地址</el-button>
            </div>
          </div>
        </div>

        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checkInfo.goods" :key="item.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付 5 元手续费</span>
        </div>
      </div>
      <!-- 金额明细 -->
      <h3 class="box-title">金额明细</h3>

      <div class="box-body">
        <div class="total">
          <dl>
            <dt>商品件数:</dt>
            <dd>{{ checkInfo.summary.goodsCount }}件</dd>
          </dl>
          <dl>
            <dt>商品总价:</dt>
            <dd>&yen;{{ checkInfo.summary.totalPrice?.toFixed(2) }}</dd>
          </dl>
          <dl>
            <dt>运费：</dt>
            <dd>&yen;{{ checkInfo.summary.postFee?.toFixed(2) }}</dd>
          </dl>
          <dl>
            <dt>应付总额：</dt>
            <dd class="price">&yen;{{ checkInfo.summary.totalPayPrice?.toFixed(2) }}</dd>
          </dl>
        </div>
      </div>
      <!-- 提交订单 -->
      <div class="submit">
        <el-button type="primary" size="large">提交订单</el-button>
      </div>
    </div>
  </div>

  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" v-for="item in checkInfo.userAddresses" :key="item.id">
        <li><span>收货人：</span>{{ item.receiver }}</li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation }} {{ item.address }}</li>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;
  .addressWrapper {
    max-height: 500px;
    overflow-y: auto;
  }

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        border-color: $xtxColor;
        background: lighten($xtxColor, 50%);
      }

      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
  .my-btn {
    width: 228px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-right: 25px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: $xtxColor;
    }
  }

  .total {
    dl {
      display: flex;
      justify-content: flex-end;
      line-height: 50px;

      dd {
        width: 240px;
        text-align: right;
        padding-right: 70px;

        &.price {
          font-size: 20px;
          color: $priceColor;
        }
      }
    }
  }

  .submit {
    text-align: right;
    padding: 60px;
    border-top: 1px solid #f5f5f5;
  }

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;

      .goods {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;

        .info {
          display: flex;
          text-align: left;

          img {
            width: 70px;
            height: 70px;
            margin-right: 20px;
          }

          .right {
            line-height: 24px;

            p {
              &:last-child {
                color: #999;
              }
            }
          }
        }

        tr {
          th {
            background: #f5f5f5;
            font-weight: normal;
          }

          td,
          th {
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #f5f5f5;

            &:first-child {
              border-left: 1px solid #f5f5f5;
            }

            &:last-child {
              border-right: 1px solid #f5f5f5;
            }
          }
        }
      }
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;
        }
      }
    }
  }

  .action {
    width: 420px;
    text-align: center;
  }
}
</style>
