<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useCartStore } from '@/stores/cart'

const categoryStore = useCategoryStore()
const cartStore = useCartStore()
onMounted(() => categoryStore.getCategory())
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>

      <ul class="app-header-nav">
        <li v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{
            item.name
          }}</RouterLink>
        </li>
      </ul>

      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>

      <
      <div class="cart">
        <a class="curr" href="javascript:;">
          <i class="iconfont icon-cart"></i>
          <em>{{ cartStore.allCount }}</em>
        </a>

        <div class="layer">
          <div class="list">
            <div class="item" v-for="i in cartStore.cartList" :key="i.skuId">
              <RouterLink to="/">
                <img :src="i.picture" alt="" />
                <div class="center">
                  <p class="name ellipsis-2">
                    {{ i.name }}
                  </p>
                  <p class="attr ellipsis">
                    {{ i.attrsText }}
                  </p>
                </div>
                <div class="right">
                  <p class="price">&yen;{{ i.price }}</p>
                  <p class="count">x{{ i.count }}</p>
                </div>
              </RouterLink>
              <i class="iconfont icon-close-new" @click="cartStore.delCart(i.skuId)"></i>
            </div>
            <div class="empty" v-if="cartStore.cartList.length === 0">购物车为空</div>
          </div>

          <div class="foot">
            <div class="total">
              <p>共 {{ cartStore.allCount }} 件商品</p>
              <p>&yen; {{ cartStore.allPrice.toFixed(2) }}</p>
            </div>
            <el-button size="large" type="primary" @click="$router.push('/cartlist')"
              >去购物车结算</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }

      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;
    position: relative;
    z-index: 600;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial, sans-serif;
      }
    }

    &:hover {
      .layer {
        opacity: 1;
        transform: none;
      }
    }

    .layer {
      opacity: 0;
      transition: all 0.4s 0.2s;
      transform: translateY(-200px) scale(1, 0);
      width: 400px;
      height: 400px;
      position: absolute;
      top: 50px;
      right: 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background: #fff;
      border-radius: 4px;
      padding-top: 10px;

      &::before {
        content: '';
        position: absolute;
        right: 14px;
        top: -10px;
        width: 20px;
        height: 20px;
        background: #fff;
        transform: scale(0.6, 1) rotate(45deg);
        box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
      }

      .foot {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 70px;
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background: #f8f8f8;
        align-items: center;

        .total {
          padding-left: 10px;
          color: #999;

          p {
            &:last-child {
              font-size: 18px;
              color: $priceColor;
            }
          }
        }
      }
    }

    .list {
      height: 310px;
      overflow: auto;
      padding: 0 10px;
      .empty {
        height: 310px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
      }

      .item {
        border-bottom: 1px solid #f5f5f5;
        padding: 10px 0;
        position: relative;

        i {
          position: absolute;
          bottom: 38px;
          right: 0;
          opacity: 0;
          color: #666;
          transition: all 0.5s;
        }

        &:hover {
          i {
            opacity: 1;
            cursor: pointer;
          }
        }

        a {
          display: flex;
          align-items: center;

          img {
            height: 80px;
            width: 80px;
          }

          .center {
            padding: 0 10px;
            width: 200px;

            .name {
              font-size: 16px;
            }

            .attr {
              color: #999;
              padding-top: 5px;
            }
          }

          .right {
            width: 100px;
            padding-right: 20px;
            text-align: center;

            .price {
              font-size: 16px;
              color: $priceColor;
            }

            .count {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
