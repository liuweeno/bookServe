<template>
  <NavigationBar :showArrow="false" title="首页" :border="false" background="white"></NavigationBar>

  <view class="index">
    <u-search placeholder="" v-model="keyword"></u-search>
    <view class="swiper">
      <u-swiper :list="list1" @change="change" @click="click" class="swiper"></u-swiper>
    </view>
    <view class="grid-item">
      <u-grid :border="true" @click="click">
        <u-grid-item v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
          <u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="baseListItem.name" :size="22"></u-icon>
          <text class="grid-text">{{ baseListItem.title }}</text>
        </u-grid-item>
      </u-grid>
      <u-toast ref="uToastRef" />
    </view>
    <view class="ad"> <img src="../../assets/img/index/ad.png" alt="" /> </view>
    <view class="grid-item">
      <u-grid :border="true" col="2">
        <u-grid-item
          v-for="(baseListItem, baseListIndex) in commodityList"
          :key="baseListIndex"
          @click="goToDetail(baseListItem.id)"
        >
          <img class="grid-img" :src="base + baseListItem.headPic" alt="" />
          <text class="grid-text">{{ baseListItem.goodsName }}</text>
        </u-grid-item>
      </u-grid>
      <u-toast ref="uToastRef" />
    </view>
    <up-calendar :show="showCalendar" @close="closeCalendar" @close-on-click-overlay="closeCalendar"></up-calendar>
  </view>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';
import { getCommodity } from '@/api/user.ts';

const showCalendar = ref(false);
const base = 'http://114.132.45.214:9091/';
const commodityList = ref([]);
const uToastRef = ref(null);
const list1 = reactive([
  'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  'https://cdn.uviewui.com/uview/swiper/swiper3.png',
]);
const keyword = ref('');
// 创建响应式数据
const baseList = ref([
  {
    name: 'home',
    title: '首页',
  },
  {
    name: 'man-add',
    title: '我的',
  },
  {
    name: 'email',
    title: '日历',
  },
  {
    name: 'more-circle',
    title: '更多',
  },
  {
    name: 'server-man',
    title: '客服',
  },
  {
    name: 'share-square', // 注意：这里修改了 name 从 'star' 改为 'volume'，以避免列表中两个元素具有相同的 name
    title: '分享',
  },
]);

function change(index) {}
function click(index) {
  console.log('click', index);
  if (index === 2) {
    showCalendar.value = true;
  }
}

function goToDetail(id) {
  uni.navigateTo({
    url: `/pages/choose/index?id=${id}`,
  });
}

onMounted(async () => {
  const res = await getCommodity({ page: 1, size: 100 });
  if (res.code !== 200) {
    uToastRef.value.show('获取商品列表失败');
    return;
  }
  commodityList.value = res.data.records;
});

function closeCalendar() {
  showCalendar.value = false;
}
</script>

<style lang="scss">
.index {
  height: 100%;
  width: 100%;
  padding: 0 16px;

  .swiper {
    margin-top: 16px;
  }

  .grid-item {
    margin-top: 16px;

    .grid-img {
      width: 60px;
      height: 60px;
    }

    .grid-text {
      font-size: 14px;
      color: #909399;
      padding: 10rpx 0 20rpx 0rpx;
      /* #ifndef APP-PLUS */
      box-sizing: border-box;
      /* #endif */
    }
  }

  .ad {
    overflow: hidden;
    margin-top: 16px;
    height: 80px;
    width: 100%;
    border-radius: 50px;

    > img {
      width: 100%;
    }
  }
}
</style>
