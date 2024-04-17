<template>
  <div class="personal-page-container" catchtouchmove="return" scroll-y>
    <img class="background-img" src="@/assets/img/personalCenter/backgroundone.png" alt="" />
    <NavigationBar class="nav-bar-wrapper" title="个人中心" :showArrow="false" :border="false"></NavigationBar>
    <scroll-view class="scroll-view" scroll-y>
      <div class="page-container">
        <div class="userInfo-box">
          <div class="avatar-box">
            <img class="avatar" src="@/assets/img/personalCenter/defaultAvatar.png" alt="" />
          </div>
          <div class="username-box">
            <div class="username">{{ userInfo.username }}</div>
            <div class="edit-btn">
              编辑个人资料
              <u-icon name="arrow-right"></u-icon>
            </div>
          </div>
        </div>
        <div class="bg">
          <div class="amount-box">
            <img class="background" src="@/assets/img/personalCenter/backgroundTwo.png" mode="widthFix" alt="" />
            <div class="top-side">
              <span class="title">手机号码</span>
              <div class="detail-box">
                <span class="amount"><span style="font-size: 0.875rem"></span>{{ userInfo.phone }}</span>
              </div>
            </div>
            <div class="bottom-side">
              <div class="left-side">
                <span class="title">用户名</span>
                <span class="amount"><span style="font-size: 0.875rem"></span>{{ userInfo.username }}</span>
              </div>
              <div class="right-side">
                <span class="title">角色</span>
                <span class="amount">
                  <span style="font-size: 0.875rem"></span>{{ userInfo.role === 1 ? '普通用户' : '管理员' }}</span
                >
              </div>
            </div>
          </div>
          <div class="record-box">
            <div class="btn-box">
              <div class="left">
                <img class="icon" src="@/assets/img/personalCenter/record.png" alt="wu" />
                <span class="word">结算记录</span>
              </div>
              <u-icon name="arrow-right"></u-icon>
            </div>
            <div class="btn-box" @click="goToAllOrder">
              <div class="left">
                <img class="icon" src="@/assets/img/personalCenter/account.png" alt="wu" />
                <span class="word">所有订单</span>
              </div>
              <u-icon name="arrow-right"></u-icon>
            </div>
          </div>
          <button class="u-button">退出登录</button>
        </div>
      </div>
      <u-divider text="猜你喜欢"></u-divider>
      <view class="grid-item">
        <u-grid :border="true" col="2">
          <u-grid-item v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
            <img src="@/assets/img/login/is-check.png" alt="" />
            <text class="grid-text">{{ baseListItem.title }}</text>
          </u-grid-item>
        </u-grid>
        <u-toast ref="uToastRef" />
      </view>
    </scroll-view>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const userInfo = ref({
  phone: '',
  role: 1,
  username: '',
});
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
const getAccount = async () => {
  console.log('getAccount');
};

const getAmountInfo = async () => {
  console.log('getAmountInfo');
};

function goToAllOrder() {
  uni.navigateTo({
    url: '/pages/user/allOrder',
  });
}

onLoad(() => {
  userInfo.value.phone = uni.getStorageSync('phone');
  userInfo.value.role = uni.getStorageSync('role');
  userInfo.value.phone = uni.getStorageSync('phone');
});
</script>

<style lang="scss">
.scroll-view {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 144rpx;
  width: 100%;
  height: calc(100% - 144rpx);
}

.background-img {
  position: absolute;
  width: 100%;
  height: 1000rpx;
}

.personal-page-container {
  background: linear-gradient(to bottom, transparent, rgba(244, 244, 246, 1) 1000rpx, rgba(244, 244, 246, 1));
  height: calc(100vh);
  position: relative;
  z-index: 1;
  @include flex-mode(column, flex-start, stretch);

  .nav-bar-wrapper {
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .page-container {
    width: 100vw;
    @include flex-mode(column, flex-start);
    flex: 1;
    box-sizing: border-box;
    padding: 48rpx;

    .bg {
      box-sizing: content-box;
      background-color: #f4f4f6;

      width: 100%;
    }

    .userInfo-box {
      margin-bottom: 24rpx;
      width: 100%;
      @include flex-mode(row, left, center);

      .avatar-box {
        @include flex-mode;

        .avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
        }
      }

      .username-box {
        @include flex-mode(column, space-around, left);
        margin-left: 32rpx;

        .username {
          margin-bottom: 16rpx;
          font-size: 34rpx;
          line-height: 48rpx;
        }

        .edit-btn {
          @include flex-mode(row, left, left);
          line-height: 34rpx;
          font-size: 24rpx;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }

    .amount-box {
      position: relative;
      box-sizing: border-box;
      padding: 40rpx 44rpx 26rpx 48rpx;
      width: 100%;
      height: 300rpx;
      border-radius: 20rpx;
      @include flex-mode(column, center, left);

      .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
      }

      .title {
        color: rgba(255, 255, 255, 0.8);
        font-size: 24rpx;
        line-height: 34rpx;
      }

      .top-side {
        z-index: 1;

        .detail-box {
          color: white;
          line-height: 40rpx;
          font-size: 44rpx;
          @include flex-mode(row, space-between, center);

          .amount {
            margin-top: 16rpx;
          }

          .btn {
            @include flex-mode;
            background-color: rgba(255, 255, 255, 0.65);
            color: rgba(121, 58, 234, 1);
            height: 64rpx;
            width: 162rpx;
            font-size: 28rpx;
            line-height: 40rpx;
            white-space: nowrap;
            margin: 0;
          }
        }
      }

      .bottom-side {
        z-index: 1;
        margin-top: 38rpx;
        color: white;
        display: flex;
        .amount {
          font-size: 34rpx;
          line-height: 40rpx;
          margin-top: 8rpx;
        }
        .left-side {
          @include flex-mode(column, center, left);
        }

        .right-side {
          @include flex-mode(column, center, left);
          margin-left: 68rpx;
        }
      }
    }

    .record-box {
      width: 100%;
      margin-top: 30rpx;
      @include flex-mode(row, space-between, center);
      gap: 20rpx;
      .btn-box {
        @include flex-mode(row, space-between, center);
        .left {
          @include flex-mode;
          .icon {
            width: 48rpx;
            height: 48rpx;
          }
          .word {
            font-size: 28rpx;
            line-height: 40rpx;
            margin-left: 16rpx;
            white-space: nowrap;
          }
        }
        position: relative;
        box-sizing: border-box;
        padding: 24rpx;
        padding-right: 20rpx;

        height: 96rpx;
        width: 316rpx;
        background-color: #fff;
        border-radius: 10rpx;
      }
    }

    .account-box {
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10rpx;
      margin-top: 24rpx;
      width: 100%;
      @include flex-mode(column, left, left);
      line-height: 40rpx;
      font-size: 28rpx;

      .title {
        font-weight: 500;
        padding-top: 16rpx;
        padding-bottom: 16rpx;
        padding-left: 24rpx;
        align-items: center;
        border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
      }

      .addAccount-box {
        height: 136rpx;
        color: rgba(163, 113, 255, 1);
        @include flex-mode(column);
      }

      .accountInfo-box {
        box-sizing: border-box;
        padding: 24rpx;

        .accountInfo-box--detail {
          @include flex-mode(row, space-between, center);
          .content {
            font-size: 28rpx;
            line-height: 40rpx;
            .detail {
              color: rgba(0, 0, 0, 0.45);
            }
          }
          .left-box {
            @include flex-mode(column, center, left);
            gap: 16rpx;
          }
          .right-box {
            @include flex-mode;
            gap: 6rpx;
          }
        }
      }
    }

    .devices-box {
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10rpx;
      margin-top: 24rpx;
      width: 100%;
      @include flex-mode(column, left, left);
      line-height: 40rpx;
      font-size: 28rpx;

      .title {
        font-weight: 500;
        padding-top: 16rpx;
        padding-bottom: 16rpx;
        padding-left: 24rpx;
        align-items: center;
        border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
      }

      .devices-list {
        line-height: 88rpx;
        box-sizing: border-box;
        padding: 0 24rpx;
        @include flex-mode(column);

        .device-item:first-child {
          border: none;
        }

        .device-item {
          box-sizing: border-box;
          width: 100%;
          border-top: 2rpx solid rgba(0, 0, 0, 0.1);
          @include flex-mode(row, left, center);

          .icon {
            margin: 0 8rpx;
            width: 26rpx;
            height: 32rpx;
          }
        }
      }
    }
    .more-serve {
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10rpx;
      margin-top: 24rpx;
      width: 100%;
      @include flex-mode(column, left, left);
      line-height: 40rpx;
      font-size: 28rpx;

      .title {
        font-weight: 500;
        padding-top: 16rpx;
        padding-bottom: 16rpx;
        padding-left: 24rpx;
        align-items: center;
        border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
      }

      .btn-list {
        @include flex-mode(row, space-around, center);
        margin: 24rpx 0;

        .btn-item {
          @include flex-mode(column, center, center);

          .image {
            margin-bottom: 8rpx;
            width: 56rpx;
            height: 56rpx;
          }

          .name {
            white-space: nowrap;
            font-size: 20rpx;
            line-height: 24rpx;
            color: rgba(127, 131, 137, 1);
          }
        }
      }
    }

    .u-button {
      width: 100%;
      margin-top: 24rpx;
      background-color: #fff;
      color: rgba(255, 77, 79, 1);
      line-height: 96rpx;
      font-size: 34rpx;
    }
    .u-button::after {
      border: none;
    }

    .btn-box {
      height: 320rpx;
      @include flex-mode(column, center, center);

      .btn {
        margin-bottom: 32rpx;
        width: 314rpx;
      }
    }

    .input-box-weifutong {
      box-sizing: border-box;
      padding: 48rpx 32rpx;
      display: flex;
      flex-direction: column;

      :deep(.u-form) {
        width: 100%;
      }

      :deep(.u-form-item__body) {
        padding-top: 0 !important;
        padding-bottom: 32rpx !important;
      }

      :deep(.u-form-item__body__right__message) {
        box-sizing: border-box;
        margin-top: -10rpx !important;
        margin-bottom: 8rpx;
        margin-left: 0rpx !important;
      }

      :deep(.u-input) {
        padding: 10px !important;
        width: 100%;
        height: 88rpx;
        background: #ffffff;
        border-radius: 8rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.25);
      }

      .btn {
        width: 558rpx;
      }
    }

    .input-box-personal {
      box-sizing: border-box;
      padding: 48rpx 32rpx;
      // min-height: 672rpx;
      display: flex;
      flex-direction: column;

      :deep(.u-form) {
        width: 100%;
      }

      :deep(.u-form-item__body) {
        padding-top: 0 !important;
        padding-bottom: 32rpx !important;
      }

      :deep(.u-form-item__body__right__message) {
        box-sizing: border-box;
        margin-top: -10rpx !important;
        margin-bottom: 8rpx;
        margin-left: 0rpx !important;
      }

      :deep(.u-input) {
        padding: 10px !important;
        width: 100%;
        height: 88rpx;
        background: #ffffff;
        border-radius: 8rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.25);
      }
      .btn {
        width: 558rpx;
      }
    }

    .instruction-box {
      box-sizing: border-box;
      padding: 32rpx;
      height: 420rpx;
      font-size: 28rpx;
      line-height: 40rpx;

      .content {
        .detail {
          display: flex;
          flex-direction: column;
          margin-top: 16rpx;
          color: rgba(0, 0, 0, 0.65);
          font-size: 24rpx;
          line-height: 34rpx;
          gap: 8rpx;
        }
      }

      .btn {
        margin-top: 32rpx;
        width: 558rpx;
      }
    }

    .inputAmount-box {
      box-sizing: border-box;
      padding: 32rpx;
      height: 430rpx;

      .text {
        font-size: 28rpx;
        line-height: 40rpx;
      }

      .money-box {
        .input {
          overflow: visible;
          margin-top: 24rpx;
          .placeholder {
            font-size: 30rpx;
          }
        }
        margin-bottom: 20rpx;
      }
      .tips {
        font-size: 24rpx;
        line-height: 34rpx;
        color: rgba(0, 0, 0, 0.65);
        .all {
          color: rgba(163, 113, 255, 1);
        }
      }
      .btn-one {
        @include flex-mode;
        margin-top: 32rpx;
        background-color: #793aea;
        height: 96rpx;
      }
    }

    .finish-box {
      @include flex-mode(column, center, center);
      box-sizing: border-box;

      padding: 48rpx 32rpx;
      text-align: center;
      font-size: 28rpx;
      line-height: 40rpx;
      gap: 24rpx;

      .title {
        font-size: 32rpx;
        line-height: 44rpx;
      }
      .tips {
        color: rgba(0, 0, 0, 0.65);
      }

      .img {
        width: 200rpx;
        height: 200rpx;
      }

      .btn {
        // margin-top: 1rem;
        width: 558rpx;
      }
    }

    .success-box {
    }
    .fail-box {
    }
    .btn {
      font-size: 34rpx;
      line-height: 48rpx;
      height: 96rpx;
      @include flex-mode;
      background-color: #793aea;
      color: white;
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
  }
  // }
}
</style>
