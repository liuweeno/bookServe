<script setup lang="ts">
import { ref } from 'vue';

const headerHeight = ref<number>(uni.getSystemInfoSync().statusBarHeight || 0);

defineProps({
  showArrow: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: 'Title',
  },
  border: {
    type: Boolean,
    default: true,
  },
  background: {
    type: String,
    default: '',
  },
});

function goBack() {
  uni.navigateBack();
}
</script>

<template>
  <view class="nav-bar-container" :style="{ background: background }">
    <view class="navigationBar" :style="{ height: `${headerHeight}px` }"></view>
    <view :class="border ? 'header' : 'no-border-header'">
      <view class="arrow" v-if="showArrow" @click="goBack"><u-icon name="arrow-left" /></view>
      <view class="title-content">{{ title }}</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.nav-bar-container {
  z-index: 999;
  backdrop-filter: blur(12px);
  top: 0;
  position: sticky;
  //background-color: #fff;
  width: 100vw;

  .navigationBar {
    width: 100%;
  }

  .header {
    position: relative;
    width: 100%;
    height: 44px;
    @include flex-mode;
    border-bottom: 1rpx solid #e5e5e5;

    font-size: 32rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 38rpx;
  }

  .no-border-header {
    position: relative;
    width: 100%;
    height: 44px;
    @include flex-mode;
  }

  .arrow {
    position: absolute;
    padding: 20rpx;
    left: 10px;
  }

  .title-content {
    font-size: 32rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 38rpx;
  }
}
</style>
