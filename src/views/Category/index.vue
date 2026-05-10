<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTopCategoryAPI } from '@/apis/category'

const route = useRoute()

const categoryData = ref({})

const getCategory = async () => {
  const res = await getTopCategoryAPI(route.params.id)
  categoryData.value = res.result
}

onMounted(() => {
  getCategory()
})
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
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="item in categoryData.children" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p>{{ item.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  .bread-container {
    padding: 25px 0;
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
