<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue'
import { useCategory } from './composables/useCategory'
import { useBanner } from './composables/useBanner'

const { categoryData } = useCategory()
const { bannerList } = useBanner()
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="home-banner">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.imgUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="item in categoryData.children" :key="item.id">
          <RouterLink :to="`/category/sub/${item.id}`">
            <img :src="item.picture" alt="" />
            <p>{{ item.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
      <div class="head">
        <h3>- {{ item.name }} -</h3>
      </div>

      <div class="body">
        <GoodsItem v-for="good in item.goods" :key="good.id" :goods="good" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
  .home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;

    img {
      width: 100%;
      height: 500px;
    }
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
</style>
