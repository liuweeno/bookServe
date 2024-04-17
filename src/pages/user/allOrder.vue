<template>
  <view class="all-order-container">
    <NavigationBar :showArrow="true" title="所有订单页面" :border="true" background="white"></NavigationBar>
    <div class="home-index-container">
      <u-skeleton rows="10" :loading="loading" :animate="true" v-if="orderList.length !== 0">
        <div class="device-list-container">
          <scroll-view class="scroll-view" scroll-y>
            <div
              @click="goToOrderDetail(item.options, item.status, item.id)"
              class="device-list-item"
              v-for="item in orderList"
              :key="item.id"
            >
              <div class="device-title">
                <div class="prefix" :class="[item.status]"></div>
                <span class="title">订单编号{{ item.id }}</span
                >y
                <span class="status busy" :class="item.status === 7 || item.status === 8 ? 'offline' : null">{{
                  item.status === 7 || item.status === 8 ? '已完成' : '进行中'
                }}</span>
                <div class="device-list-item-right">
                  <u-icon name="arrow-right"></u-icon>
                </div>
              </div>
              <div class="device-detail">
                <div class="icon">
                  <image :src="base + item.goods.headPic"></image>
                  <div class="bottom-color" :class="[item.status]"></div>
                </div>
                <div class="content">
                  <div>
                    商品信息：<text class="value">{{ item.goods.goodsName }}</text>
                  </div>
                  <div>
                    维修方式：<text class="value">{{ showWay[item.options] }}</text>
                  </div>
                </div>
              </div>
              <div class="device-card">
                <div class="card-item">合计：¥ {{ item.payment.toFixed(2) }}</div>
              </div>
            </div>
            <div class="perch-line"></div>
          </scroll-view>
        </div>
      </u-skeleton>
      <div class="empty-status" v-if="orderList.length === 0">
        <scroll-view class="scroll-view" scroll-y>
          <div class="device-empty">
            <image src="@/assets/img/home/empty.png"></image>
            <div class="tips">暂无订单</div>
          </div>
        </scroll-view>
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';
import { getAllUserAllOrder, getUserAllOrder } from '@/api/user.ts';
import { onShow } from '@dcloudio/uni-app';

const showWay = ['寄件维修', '上门维修'];
const base = 'http://114.132.45.214:9091/';
const loading = ref<boolean>(true);
const orderList = ref<
  {
    id: string;
    status: number;
    options: number;
    goodsName: string;
    payment: number;
    imgUrl: string;
    goods: object;
  }[]
>([
  {
    id: '1',
    status: 0,
    options: 1,
    goodsName: '牙具/维修器具',
    payment: 98.0,
    imgUrl: '@/assets/img/home/empty.png',
    goods: {},
  },
]);

onBeforeMount(async () => {
  loading.value = false;
  const role = uni.getStorageSync('role');
  console.log('role', role);
  const res = role === 1 ? await getUserAllOrder() : await getAllUserAllOrder();
  if (res.code === 200) {
    orderList.value = res.data;
  }
});

function goToOrderDetail(options: number, status: number, orderId: string) {
  console.log('status', status);
  if (options === 0) {
    uni.navigateTo({
      url: `/pages/detail/mail?orderStatus=${status}&orderId=${orderId}`,
    });
  } else {
    uni.navigateTo({
      url: `/pages/detail/visit?orderStatus=${status}&orderId=${orderId}`,
    });
  }
}

onShow(() => {
  loading.value = true;
  setTimeout(async () => {
    const role = uni.getStorageSync('role');
    console.log('role', role);
    const res = role === 1 ? await getUserAllOrder() : await getAllUserAllOrder();
    if (res.code === 200) {
      orderList.value = res.data;
    }
    loading.value = false;
  }, 500);
});
</script>

<style scoped lang="scss">
.all-order-container {
  width: 100%;
  height: 100vh;
  @include flex-mode(column, flex-start);

  .home-index-container {
    @include br;
    flex: 1;
    width: 100vw;
    background-color: #f4f4f6;
    @include flex-mode(column, flex-start);
    overflow: auto;

    :deep(.u-skeleton) {
      height: 100%;
    }

    .empty-status {
      margin-top: 8px;
      flex: 1;
      // @include flex-mode(column);

      .search-container {
        margin-bottom: 24rpx;
        margin-top: 48rpx;
        height: 72rpx;
        width: 100%;
        @include flex-mode(row, center, space-between);
        gap: 24rpx;

        :deep(.u-input) {
          background-color: #fff;
          border: none;
        }
        :deep(.placeholder-style) {
          color: rgba(0, 0, 0, 0.45);
        }
        .input-device-name {
          height: 72rpx;
          flex: 1;
        }

        > image {
          width: 72rpx;
          height: 72rpx;
        }
      }

      .device-empty {
        background: #ffffff;
        width: 654rpx;
        height: 320rpx;
        background: #ffffff;
        border-radius: 12rpx;
        @include flex-mode(column, center, center);
        gap: 24rpx;
        overflow: visible;

        > image {
          width: 128rpx;
          height: 128rpx;
        }

        .tips {
          font-size: 28rpx;
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.45);
          line-height: 40rpx;

          .link {
            color: rgba(163, 113, 255, 1);
          }
        }
      }

      .scroll-view {
        height: calc(100% - 144rpx);
      }
    }

    .device-list-container {
      padding: 0 46rpx;
      height: 100%;
      width: 100%;

      .search-container {
        margin-bottom: 24rpx;
        margin-top: 48rpx;
        height: 72rpx;
        width: 100%;
        @include flex-mode(row, center, space-between);
        gap: 24rpx;

        :deep(.placeholder-style) {
          color: rgba(0, 0, 0, 0.45);
        }

        :deep(.u-input) {
          background-color: #fff;
          border: none;
        }

        .input-device-name {
          height: 72rpx;
          flex: 1;
        }

        > image {
          width: 72rpx;
          height: 72rpx;
        }
      }

      .device-list-item {
        :nth-child(1) {
          margin-top: 0;
        }

        background: #ffffff;
        margin-top: 24rpx;
        width: 654rpx;
        height: 320rpx;
        background: #ffffff;
        border-radius: 12rpx;
        .device-title {
          padding: 0 24rpx;
          height: 72rpx;
          @include flex-mode(row, flex-start, center);
          position: relative;
          border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);

          .prefix {
            width: 4rpx;
            height: 34rpx;
            border-radius: 2rpx;
            margin-right: 8rpx;
          }

          .title {
            font-size: 28rpx;
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 40rpx;
          }

          > image {
            width: 28rpx;
            height: 28rpx;
            margin-left: 14rpx;
            margin-right: 14rpx;
          }

          .status {
            margin-left: 14rpx;
            @include flex-mode();
            width: 100rpx;
            height: 40rpx;
            border-radius: 12rpx;

            font-size: 24rpx;
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 34rpx;
          }

          .busy {
            background: #52c41a;
          }
          .online {
            background-color: rgba(26, 150, 196, 1);
          }
          .offline {
            background-color: rgba(148, 148, 148, 1);
          }

          .device-list-item-right {
            position: absolute;
            right: 24rpx;
          }
        }

        .device-detail {
          margin: 0 24rpx;
          border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
          height: 168rpx;
          @include flex-mode(row, flex-start, center);
          gap: 24rpx;

          .icon {
            position: relative;
            width: 132rpx;
            height: 136rpx;
            background: #f8f8f8;
            border-radius: 8rpx;
            @include flex-mode(column, flex-start);

            > image {
              width: 100rpx;
              height: 70rpx;
              margin-top: 16rpx;
            }

            .bottom-color {
              bottom: 0;
              position: absolute;
              width: 132rpx;
              height: 34rpx;
              border-radius: 0rpx 0rpx 8rpx 8rpx;
              @include flex-mode();

              > text {
                white-space: nowrap;
                width: 32rpx;
                height: 34rpx;
                font-size: 24rpx;
                font-family:
                  PingFangSC,
                  PingFang SC;
                font-weight: 500;
                line-height: 34rpx;
              }
            }

            .busy {
              background: #d5efd2;
              > text {
                color: #45cf3c;
              }
            }
            .online {
              background: rgba(204, 224, 231, 1);
              > text {
                color: rgba(26, 150, 196, 1);
              }
            }
            .offline {
              background-color: rgba(235, 235, 235, 1);
              > text {
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }

          .content {
            height: 100%;
            flex: 1;
            @include flex-mode(column, center, flex-start);
            gap: 16rpx;
            font-size: 28rpx;
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 500;
            color: #000000;
            line-height: 40rpx;

            .value {
              color: rgba(0, 0, 0, 0.65);
            }
          }
        }

        .device-card {
          padding: 0 24rpx;
          height: 76rpx;
          @include flex-mode(row, flex-start, center);
          gap: 16rpx;
          .card-item {
            width: 158rpx;
            height: 44rpx;
            background: #f8f8f8;
            border-radius: 8rpx;
            @include flex-mode();

            font-size: 20rpx;
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 400;
            color: #9f9f9f;
            line-height: 28rpx;
          }
        }
      }

      .perch-line {
        height: 20rpx;
      }
    }
  }
}

.home-index {
  @include flex-mode(column, flex-start, stretch);
  height: 100vh;
  background-color: #f4f4f6;
}

.popup-add-device {
  box-sizing: border-box;
  padding: 48rpx 32rpx;
  @include flex-mode(column, center, center);
  gap: 24rpx;

  :deep(.u-form) {
    width: 100%;
  }
  .has {
    :deep(.u-border) {
      border-color: #793aea !important;
    }
  }
  .no {
    :deep(.u-border) {
      border-color: red !important;
    }
  }
  :deep(.u-form-item__body) {
    padding-top: 0 !important;

    .u-form-item__body__right__message {
      box-sizing: border-box;
      margin-top: -10rpx !important;
      margin-bottom: 8rpx;
      margin-left: 0rpx !important;
    }
  }
  :deep(.u-input) {
    @include br;
    padding: 10px !important;
    width: 100%;
    height: 88rpx;
    background: #ffffff;
    border-radius: 8rpx;
    border: 2rpx solid rgba(0, 0, 0, 0.25);
  }

  .warning {
    font-size: 24rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    color: #ff4d4f;
    line-height: 34rpx;
  }
}

.btn-popup {
  color: white;
  width: 558rpx;
  height: 96rpx;
  background: #793aea;
  border-radius: 8rpx;
  @include flex-mode();

  > text {
    font-size: 34rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 48rpx;
  }
}

.popup-add-result {
  @include flex-mode(column, flex-start, center);
  gap: 24rpx;

  > image {
    margin-top: 48rpx;
    height: 200rpx;
    width: 200rpx;
  }

  .tips {
    font-size: 32rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 44rpx;
  }

  .little-tips {
    font-size: 28rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 40rpx;
  }

  .no-add {
    font-size: 34rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 48rpx;
    margin-bottom: 72rpx;
  }
}
</style>
