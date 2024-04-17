<template>
  <view class="login-index">
    <NavigationBar :showArrow="false" title="牙e维修在线平台" :border="false"></NavigationBar>
    <div class="login-index-content">
      <div class="content"><image src="@/assets/img/login/logo.png" alt="" /><text>微笑 · 无忧维修</text></div>
      <button class="btn-quick btn-content" open-type="getPhoneNumber" @click="clickQuickLogin">本机登录</button>
      <button class="btn-phone btn-content" @click="clickRegister">注册</button>
      <Agreement v-model:checked="checked" class="agreement"></Agreement>
    </div>
    <div class="background-yellow"></div>
    <div class="background-purple"></div>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import Agreement from '@/components/Agreement.vue';
import { ref } from 'vue';

const checked = ref<boolean>(false);

function clickQuickLogin() {
  console.log('clickQuickLogin');
  uni.navigateTo({
    url: '/pages/login/phoneLogin',
  });
}
function clickRegister() {
  uni.navigateTo({
    url: '/pages/register/index',
  });
}
</script>

<style scoped lang="scss">
.btn-content {
  width: 70%;
  font-size: 17px;
  font-family:
    PingFangSC,
    PingFang SC,
    serif;
  font-weight: 400;
  color: #ffffff;
  line-height: 24px;
}

.login-index {
  height: 100vh;
  width: 100vw;
  @include flex-mode(column, flex-start);

  .login-index-content {
    height: 100%;
    @include flex-mode(column, flex-start);

    .content {
      flex: 1;
      @include flex-mode(column);

      > image {
        width: 72px;
        height: 72px;
      }

      > text {
        margin-top: 16px;
        font-size: 20px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 28px;
      }
    }

    .btn-quick {
      width: 227px;
      height: 48px;
      background: #793aea;
      border-radius: 4px;
      @include flex-mode;
    }

    .btn-phone {
      margin-bottom: 90rpx;
      margin-top: 24px;
      @include flex-mode;
      background-color: transparent;
      border: none;
      width: 327px;
      height: 48px;
      border-radius: 4px;
      font-size: 17px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      color: #353535;
      line-height: 24px;
    }
    .btn-phone::after {
      border: none;
    }

    .agreement {
      margin-top: 33px;
    }
  }

  .background-yellow {
    z-index: -999;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 180rpx;
    height: 784rpx;
    background: linear-gradient(180deg, #7f00b4 0%, #fbcfff 100%);
    opacity: 0.15;
    filter: blur(50px);
  }
  .background-purple {
    z-index: -999;
    position: absolute;
    right: 0;
    top: 190rpx;
    width: 184rpx;
    height: 524rpx;
    background: linear-gradient(180deg, #b45900 0%, #fff9cf 100%);
    opacity: 0.35;
    filter: blur(50px);
  }
}
</style>
