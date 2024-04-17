<template>
  <view class="visit-index">
    <NavigationBar :showArrow="true" title="上门维修订单详情" :border="false" background="white"></NavigationBar>
    <div class="tips">
      <span class="big-one">{{ modeShow[status].title }}</span
      ><span class="small-one">{{ modeShow[status].littleTitle }}</span>
    </div>
    <div class="tips second-tips">
      <span class="big-one second-big">注意事项</span>
      <span class="small-one">{{ modeShow[status].notice }}</span>
    </div>
    <view class="form">
      <u-form ref="visitForm" :model="orderForm" style="width: 100%">
        <u-form-item
          style="width: 100%"
          label="姓名: "
          :borderBottom="true"
          prop="userInfo.name"
          borderBottom
          ref="item1"
        >
          <u--input disabled v-model="confirmObj.receiver" border="none"></u--input>
        </u-form-item>
        <u-form-item label="手机: " :borderBottom="true" prop="userInfo.phone" borderBottom ref="item1">
          <u--input disabled v-model="confirmObj.phone" border="none"></u--input>
        </u-form-item>
        <u-form-item label="地址: " :borderBottom="true">
          <u--input disabled v-model="confirmObj.goAddress" border="none"></u--input>
        </u-form-item>
        <u-form-item label="上门时间:" borderBottom>
          <u--input disabled v-model="confirmObj.goTime" border="none"></u--input>
        </u-form-item>
      </u-form>
      <div class="commodity-detail">
        <img :src="base + confirmObj.goods.headPic" alt="" />
        <div>
          <div>{{ confirmObj.goods.goodsName }}</div>
          <div style="color: #a4a4a4; font-size: small">{{ confirmObj.goods.description }}</div>
        </div>
      </div>
      <div class="showTime">
        <div class="item">
          <span class="title">订单编号： </span><span class="content">{{ confirmObj.id }}</span>
        </div>
        <div class="item">
          <span class="title">下单时间： </span><span class="content">{{ confirmObj.createTime }}</span>
        </div>
      </div>
      <div class="confirm-btn-container">
        <div class="showPrice">
          预估费用 <span>¥{{ confirmObj.goods.price.toFixed(2) }}</span>
        </div>
        <div :class="canClick ? 'confirm-btn' : 'no-confirm'" @click="confirm">{{ buttonMessage }}</div>
      </div>
    </view>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { onBeforeMount, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getGoodsDetail, getOrderDetail, updateOrderDetail } from '@/api/user';
import { formatTimestampCommon } from '@/utils/common';

const base = 'http://114.132.45.214:9091/';
const orderForm = ref({
  name: '',
  phone: '',
  goAddress: '',
  goTime: '',
});
const role = ref<number>(0);
const status = ref<number>(0);
const id = ref<string>('');
const orderDetail = ref<{
  payment: number;
  orderId: string;
  orderTime: string;
  goodsName: string;
  goodsDesc: string;
  goodsPic: string;
}>({
  payment: 0,
  orderId: '',
  orderTime: '',
  goodsName: '',
  goodsDesc: '',
  goodsPic: '',
});
const confirmObj = ref({});
const buttonMessage = ref<string>('');
const canClick = ref<boolean>(false);

const modeShow = {
  1: {
    title: '用户已经下订单',
    littleTitle: '用户已经下订单，请安排工程师上门',
    notice: '1.请保持电话畅通，接收工程师的信息',
  },
  3: {
    title: '已安排工程师上门',
    littleTitle: '已经安排工程师上门，请保持电话畅通',
    notice: '1. 如需更改上门维修时间，请提前联系',
  },
  5: {
    title: '工程师已上门，维修完毕',
    littleTitle: '工程师已上门，维修完毕',
    notice: '1.请确认设备完好后再付款',
  },
  7: {
    title: '订单已完成',
    littleTitle: '订单已完成',
    notice: '1.如有问题请联系客服',
  },
};

onLoad(async (options: any) => {
  role.value = uni.getStorageSync('role');
  status.value = options.orderStatus;
  id.value = options.orderId;
  switch (Number(status.value)) {
    case 1:
      buttonMessage.value = role.value === 2 ? '确认安排工程师上门' : '等待商家安排工程师';
      canClick.value = role.value === 2;
      break;
    case 3:
      buttonMessage.value = role.value === 2 ? '确认上门' : '等待工程师上门';
      canClick.value = role.value === 2;
      break;
    case 5:
      buttonMessage.value = role.value === 1 ? '确认维修完毕' : '等待用户确认';
      canClick.value = role.value === 1;
      break;
    case 7:
      buttonMessage.value = '订单已完成';
      canClick.value = false;
      break;
  }
  const res = await getOrderDetail({ id: id.value });
  if (res.code === 200) {
    confirmObj.value = res.data;
  }
});

async function confirm() {
  switch (Number(status.value)) {
    case 1: {
      if (role.value === 2) {
        confirmObj.value.status = 3;
        confirmObj.value.id = id.value;
        const res = await updateOrderDetail(confirmObj.value);
        if (res.code === 200) {
          uni.showToast({
            title: '提交成功',
            icon: 'success',
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        }
      }
      break;
    }
    case 3: {
      if (role.value === 2) {
        confirmObj.value.status = 5;
        const res = await updateOrderDetail(confirmObj.value);
        if (res.code === 200) {
          uni.showToast({
            title: '提交成功',
            icon: 'success',
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        }
      }
    }
    case 5: {
      if (role.value === 1) {
        confirmObj.value.status = 7;
        const res = await updateOrderDetail(confirmObj.value);
        if (res.code === 200) {
          uni.showToast({
            title: '提交成功',
            icon: 'success',
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.visit-index {
  @include br;
  height: 100vh;
  width: 100vw;
  @include flex-mode(column, flex-start);
  background-color: #f2f2f5;

  .tips {
    height: 80px;
    padding: 20px;
    width: 100%;
    background-color: #6a40d9;
    color: white;
    @include flex-mode(column, flex-start, flex-start);
    gap: 2px;

    .big-one {
      font-weight: bold;
      font-size: large;
    }

    .small-one {
      font-size: small;
    }
  }

  .second-tips {
    height: 70px;
    background-color: #a894ea;
    color: black;

    .second-big {
      font-size: small;
    }
  }

  .form {
    position: relative;
    padding: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: white;
    @include flex-mode(column, flex-start, flex-start);

    .commodity-detail {
      height: 125px;
      width: 100%;
      border-top: solid #f2f2f5 24px;
      border-bottom: 1px #e7e7e8 solid;
      @include flex-mode(row, flex-start);

      > img {
        margin-right: 8px;
        width: 50px;
        height: 50px;
      }
    }

    .showTime {
      border-bottom: 1px #e7e7e8 solid;
      height: 80px;
      width: 100%;
      @include flex-mode(column);
      gap: 2px;
      font-size: small;
      .item {
        width: 100%;

        .title {
          color: #999999;
        }
      }
    }

    .confirm-btn-container {
      border-top: 1px solid #f2f2f5;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 55px;
      @include flex-mode(row, space-between);

      .showPrice {
        padding-left: 8px;
        height: 100%;
        @include flex-mode();

        > span {
          margin-left: 3px;
          color: #713de1;
          font-size: x-large;
          font-weight: bold;
        }
      }

      .confirm-btn {
        padding: 0 28px;
        white-space: nowrap;
        height: 100%;
        background-color: #713de1;
        color: white;
        @include flex-mode;
      }

      .no-confirm {
        padding: 0 28px;
        white-space: nowrap;
        height: 100%;
        background-color: gainsboro;
        color: white;
        @include flex-mode;
      }
    }
  }
}
</style>
