<template>
  <view class="visit-index">
    <NavigationBar :showArrow="true" title="邮寄维修" :border="false" background="white"></NavigationBar>
    <view class="visit">
      <view class="form">
        <div class="tips">
          在邮寄物品前，请确保包装完整，用泡沫或气泡纸包裹物品以防损坏。填写清晰的寄件信息，并保留邮寄跟踪号码以便查询。
        </div>

        <u-form ref="visitForm" :model="orderForm" style="width: 100%">
          <u-form-item
            style="width: 100%"
            label="联系人: "
            :borderBottom="true"
            prop="userInfo.name"
            borderBottom
            ref="item1"
          >
            <u--input v-model="orderForm.name" border="none"></u--input>
          </u-form-item>
          <u-form-item label="用户备注: " :borderBottom="true" prop="userInfo.shippingCode" borderBottom ref="item1">
            <up-textarea v-model="orderForm.buyMessage" placeholder="请输入用户备注"></up-textarea>
          </u-form-item>
        </u-form>

        <div class="commodity-detail">
          <img :src="base + itemDetail.headPic" alt="" />
          <div>
            <div>{{ itemDetail.goodsName }}</div>
            <div style="color: #a4a4a4; font-size: small">{{ itemDetail.description }}</div>
          </div>
        </div>
        <div class="confirm-btn-container">
          <div class="showPrice">
            预估费用 <span>¥ {{ itemDetail.price.toFixed(2) }}</span>
          </div>
          <div class="confirm-btn" @click="confirmAdd">提交下单</div>
        </div>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { ref, onMounted } from 'vue';
import { getGoodsDetail, addMailOrder } from '@/api/user';

const base = 'http://114.132.45.214:9091/';
const showSex = ref(false);
const orderForm = ref({
  name: '',
  shippingName: '',
  shippingCode: '',
  buyMessage: '',
});
const showTimePicker = ref<boolean>(false);
const timeValue = ref(Date.now());
const itemDetail = ref({
  goodsName: '商品名称1',
  description: '详细介绍/详细介绍/详细介绍/详细介绍/详细介绍',
  price: 100,
  id: 1,
  headPic: '',
});

const actions = [
  {
    name: '男',
  },
  {
    name: '女',
  },
];

function closePicker() {
  showTimePicker.value = false;
}

onMounted(async () => {
  let id = (getCurrentPages()[1] as any).options.id;
  console.log(id, 'id');
  const res = await getGoodsDetail({ goodsId: id });
  if (res.code !== 200) {
    uni.showToast({
      title: '获取商品详情失败',
      icon: 'none',
    });
  }
  itemDetail.value = res.data;
});

// 第一次创建订单
async function confirmAdd() {
  const name = uni.getStorageSync('username');
  const res = await addMailOrder({
    buyerMessage: orderForm.value.buyMessage,
    payment: itemDetail.value.price,
    buyerName: name,
    receiver: orderForm.value.name,
    options: 0,
    goodsId: itemDetail.value.id,
  });
  if (res.code !== 200) {
    uni.showToast({
      title: '下单失败',
      icon: 'none',
    });
    return;
  }
  uni.showToast({
    title: '下单成功',
    icon: 'success',
    duration: 1500,
  });
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages/user/allOrder',
    });
  }, 1500);
}

// 第二次进入订单，填写快递单号
function writeExpress() {}

// 第三次进入订单，付款
function pay() {}

// 第四次进入订单，评价
function evaluate() {}
</script>

<style scoped lang="scss">
.visit-index {
  height: 100vh;
  width: 100vw;
  @include flex-mode(column, flex-start);
  background-color: #f2f2f5;

  .visit {
    width: 100vw;
    height: 100%;
    padding: 20px;

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

      .tips {
        width: 100%;
        background-color: #f8f8f8;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
        color: #cecece;
      }

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
      }
    }
  }
}
</style>
