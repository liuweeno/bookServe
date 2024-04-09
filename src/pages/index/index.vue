<template>
  <NavigationBar :showArrow="false" title="首页" :border="false" background="white"></NavigationBar>

  <view class="index">
    <u-search placeholder="日照香炉生紫烟1" v-model="keyword"></u-search>
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
    <view class="ad">
      <img src="../../assets/img/index/ad.png" alt="" />
    </view>
    <view class="grid-item">
      <u-grid :border="true" @click="click" col="2">
        <u-grid-item v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
          <img src="https://cdn.uviewui.com/uview/swiper/swiper1.png" alt="" />
          <text class="grid-text">{{ baseListItem.title }}</text>
        </u-grid-item>
      </u-grid>
      <u-toast ref="uToastRef" />
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';

const uToastRef = ref(null);
const list1 = reactive([
  'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  'https://cdn.uviewui.com/uview/swiper/swiper3.png',
]);
const keyword = ref('遥看瀑布挂前川1');
// 创建响应式数据
const baseList = ref([
  {
    name: 'photo',
    title: '图片',
  },
  {
    name: 'lock',
    title: '锁头',
  },
  {
    name: 'star',
    title: '星星',
  },
  {
    name: 'hourglass',
    title: '沙漏',
  },
  {
    name: 'home',
    title: '首页',
  },
  {
    name: 'volume', // 注意：这里修改了 name 从 'star' 改为 'volume'，以避免列表中两个元素具有相同的 name
    title: '音量',
  },
]);

function change(index) {}
function click(index) {
  console.log('click', index);
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
    @include br;
    overflow: hidden;
    margin-top: 16px;
    height: 80px;
    width: 100%;
    border-radius: 50px;

    > img {
      width: 1%;
      height: 100%;
    }
  }
}
</style>
