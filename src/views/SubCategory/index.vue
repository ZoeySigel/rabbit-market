<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'

const route = useRoute()
const filterData = ref({})
const activeName = ref('publishTime')
const reqData = ref({
  categoryID: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})
const goodList = ref([])
const total = ref(0)

const tabChange = () => {
  reqData.value.sortField = activeName.value
  reqData.value.page = 1
  getGoodList()
}

const getFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  filterData.value = res.result
}
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.result.items
  total.value = res.result.counts
}
const pageChange = (page) => {
  reqData.value.page = page
  getGoodList()
}
const initData = () => {
  reqData.value.categoryId = route.params.id
  reqData.value.page = 1
  activeName.value = 'publishTime'
  reqData.value.sortField = 'publishTime'

  getFilterData()
  getGoodList()
}

onMounted(() => {
  initData()
})

watch(
  () => route.params.id,
  () => {
    initData()
  },
)
</script>

<template>
  <div class="container">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">
          {{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ filterData.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>

  <div class="sub-container">
    <el-tabs v-model="activeName" @tab-change="tabChange">
      <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
      <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
      <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
    </el-tabs>

    <div class="body">
      <RouterLink v-for="item in goodList" :key="item.id" class="goods-item" to="/">
        <img :src="item.picture" alt="" />
        <p class="name ellipis">{{ item.name }}</p>
        <p class="desc ellipis">{{ item.desc }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqData.pageSize"
        :current-page="reqData.page"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    min-height: 300px;
    color: #999;
  }
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
