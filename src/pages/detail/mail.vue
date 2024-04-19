<template>
  <view class="visit-index">
    <NavigationBar :showArrow="true" title="寄件维修订单详情" :border="false" background="white"></NavigationBar>
    <div class="tips">
      <span class="big-one">{{ modeShow[status].title }}</span
      ><span class="small-one">{{ modeShow[status].littleTitle }}</span>
      <div v-if="status == 7 || status == 8" class="evaluate" @click="openEvaluate">评价</div>
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
          <u--input disabled v-model="orderForm.name" border="none"></u--input>
        </u-form-item>
        <u-form-item label="物流名称: " :borderBottom="true" prop="userInfo.shippingName" borderBottom ref="item1">
          <u--input
            :disabled="!(Number(status) === 2 && Number(role) === 1)"
            v-model="orderForm.shippingName"
            border="none"
          ></u--input>
        </u-form-item>
        <u-form-item label="物流单号: " :borderBottom="true" prop="userInfo.shippingCode" borderBottom ref="item1">
          <u--input
            :disabled="!(Number(status) === 2 && Number(role) === 1)"
            v-model="orderForm.shippingCode"
            border="none"
          ></u--input>
        </u-form-item>
      </u-form>

      <div class="commodity-detail">
        <img :src="base + orderDetail.goodsPic" alt="" />
        <div>
          <div>{{ orderDetail.goodsName }}</div>
          <div style="color: #a4a4a4; font-size: small">{{ orderDetail.goodsDesc }}</div>
        </div>
      </div>
      <div class="showTime">
        <div class="item">
          <span class="title">订单编号： </span><span class="content">{{ orderDetail.orderId }}</span>
        </div>
        <div class="item">
          <span class="title">下单时间： </span><span class="content">{{ orderDetail.orderTime }}</span>
        </div>
      </div>
      <div class="confirm-btn-container">
        <div class="showPrice">
          预估费用 <span>¥{{ orderDetail.payment.toFixed(2) }}</span>
        </div>
        <div :class="canClick ? 'confirm-btn' : 'no-confirm'" @click="confirm">
          {{ buttonMessage }}
        </div>
      </div>
    </view>
    <up-modal @confirm="showEvaluate = false" :show="showEvaluate" title="评价" content="evaluateContent">
      <up-textarea v-model="evaluateContent" placeholder="请输入内容"></up-textarea
    ></up-modal>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { ref, onBeforeMount } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getGoodsDetail, getOrderDetail, updateOrderDetail } from '@/api/user';

const evaluateContent = ref('');
const showEvaluate = ref(false);
const base = 'http://114.132.45.214:9091/';
const orderForm = ref({
  name: '',
  shippingName: '',
  shippingCode: '',
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
  2: {
    title: '下单成功，请填写邮寄单号',
    littleTitle: '下单成功，请填写邮寄单号',
    notice: '1.邮寄设备请提前删除解锁密码，并做好备份处理',
  },
  4: {
    title: '物品已邮寄，请等待商家维修',
    littleTitle: '物品已邮寄，请等待商家维修',
    notice: '1.请关注物流动态，及时查看维修进度',
  },
  6: {
    title: '商家已寄回，请确认收货付款',
    littleTitle: '商家已寄回，请确认收货付款',
    notice: '1.请确认设备完好后再付款',
  },
  8: {
    title: '订单已完成',
    littleTitle: '订单已完成',
    notice: '1.如有问题请联系客服',
    buttonMessage: '订单已完成',
    canClick: false,
  },
};

function openEvaluate() {
  showEvaluate.value = true;
}

async function confirm() {
  switch (Number(status.value)) {
    case 2: {
      if (role.value === 1) {
        confirmObj.value.shippingName = orderForm.value.shippingName;
        confirmObj.value.shippingCode = orderForm.value.shippingCode;
        confirmObj.value.status = 4;
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
    case 4: {
      if (role.value === 2) {
        confirmObj.value.status = 6;
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
    case 6: {
      if (role.value === 1) {
        confirmObj.value.status = 8;
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

function sentConfirm() {}

onLoad(async (options: any) => {
  role.value = uni.getStorageSync('role');
  status.value = options.orderStatus;
  switch (Number(status.value)) {
    case 2:
      buttonMessage.value = role.value === 1 ? '确认提交' : '等待用户邮寄';
      canClick.value = role.value === 1;
      break;
    case 4:
      buttonMessage.value = role.value === 2 ? '确认寄回' : '等待商家寄回';
      canClick.value = role.value === 2;
      break;
    case 6:
      buttonMessage.value = role.value === 1 ? '确认收货' : '等待用户确认';
      canClick.value = role.value === 1;
      break;
    case 8:
      buttonMessage.value = '订单已完成';
      canClick.value = false;
      break;
  }
  id.value = options.orderId;
  const res = await getOrderDetail({ id: id.value });
  if (res.code === 200) {
    confirmObj.value = res.data;
    const { payment, id: orderId, createTime: orderTime, goodsId, receiver, shippingName, shippingCode } = res.data;
    orderForm.value = {
      name: receiver,
      shippingName,
      shippingCode,
    };
    console.log('设置完之后的orderForm', orderForm.value);
    const goodsRes = await getGoodsDetail({ goodsId });
    if (goodsRes.code === 200) {
      const { goodsName, description: goodsDesc, headPic: goodsPic } = goodsRes.data;
      orderDetail.value = {
        payment,
        orderId,
        orderTime,
        goodsName,
        goodsDesc,
        goodsPic,
      };
    }
  }
});
</script>

<style scoped lang="scss">
.visit-index {
  height: 100vh;
  width: 100vw;
  @include flex-mode(column, flex-start);
  background-color: #f2f2f5;

  .tips {
    position: relative;
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

    .evaluate {
      position: absolute;
      right: 20px;
      bottom: 20px;
      background-color: #c4469a;
      padding: 5px 10px;
      border-radius: 5px;
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
