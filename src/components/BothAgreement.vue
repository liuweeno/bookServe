<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false,
  },
);

const emit = defineEmits<{
  'update:show': [show: Boolean];
  agree: [agree: void];
}>();

function agree() {
  emit('agree');
}
function closeAgreement() {
  emit('update:show', false);
}
</script>

<template>
  <u-popup :show="show" :round="10" mode="bottom" :closeOnClickOverlay="true" @close="closeAgreement">
    <view class="agreement-content">
      <view class="agreement-title">
        <image @click="closeAgreement" src="@/assets/img/home/close.png"></image>
        <view>服务条款及隐私政策</view>
      </view>
      <view class="agreement-detail">
        <view class="content"
          ><text>在您注册成为 Cephalon core 会员的过程中，您需要通过点击同意的形式在线签署</text
          ><text class="bold-font">《 Cephalon core 用户服务协议》</text><text>与</text
          ><text class="bold-font">《 Cephalon core 隐私政策》</text
          ><text
            >请您务必仔细阅读、充分理解条款内容后再点击同意
            (尤其是以粗体标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制)。
          </text>
          <view class="common-font"
            ><text class="bold-font">点击同意即表示您已阅读并同意 </text
            ><text class="purple-font">《 Cephalon core 用户服务协议》</text><text>、</text
            ><text class="purple-font">《 Cephalon core 隐私政策》</text></view
          ></view
        >
        <view class="btn">
          <button class="common-btn cancel-btn" @click="closeAgreement">暂不同意</button>
          <button class="common-btn" @click="agree">同 意</button>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<style scoped lang="scss">
.agreement-content {
  height: 100%;
  width: 100%;

  .agreement-title {
    font-size: 32rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 44rpx;
    border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
    height: 92rpx;
    @include flex-mode;
    position: relative;

    > image {
      width: 28rpx;
      height: 28rpx;
      position: absolute;
      right: 48rpx;
    }
  }

  .agreement-detail {
    padding: 32rpx 48rpx 48rpx 48rpx;

    .content {
      > text {
        font-size: 28rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 40rpx;
      }

      .common-font {
        font-size: 28rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 40rpx;
        margin-top: 48rpx;
      }

      .bold-font {
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }

      .purple-font {
        color: rgba(121, 58, 234, 1);
      }
    }

    .btn {
      margin-top: 48rpx;
      @include flex-mode(row, space-between, center);

      .common-btn {
        @include flex-mode;
        width: 314rpx;
        height: 96rpx;
        background: #793aea;
        border-radius: 8rpx;

        font-size: 34rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 48rpx;
      }

      .cancel-btn {
        border: 2rpx solid #793aea;
        color: #793aea;
        background: white;
        border-radius: 8rpx;
      }
    }
  }
}
</style>
