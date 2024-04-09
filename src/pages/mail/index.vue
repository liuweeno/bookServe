<template>
  <view class="visit-index">
    <NavigationBar :showArrow="false" title="邮寄维修" :border="false" background="white"></NavigationBar>
    <view class="visit">
      <view class="form">
        <div class="tips">
          在邮寄物品前，请确保包装完整，用泡沫或气泡纸包裹物品以防损坏。填写清晰的寄件信息，并保留邮寄跟踪号码以便查询。
        </div>

        <u-form ref="visitForm" :model="orderForm" style="width: 100%">
          <u-form-item
            style="width: 100%"
            label="姓名: "
            :borderBottom="true"
            prop="userInfo.name"
            borderBottom
            ref="item1"
          >
            <u--input v-model="orderForm.userInfo.name" border="none"></u--input>
          </u-form-item>
          <u-form-item label="手机: " :borderBottom="true" prop="userInfo.phone" borderBottom ref="item1">
            <u--input v-model="orderForm.userInfo.phone" border="none"></u--input>
          </u-form-item>
          <u-form-item label="物流名称: " :borderBottom="true" prop="userInfo.shippingName" borderBottom ref="item1">
            <u--input v-model="orderForm.userInfo.shippingName" border="none"></u--input>
          </u-form-item>
          <u-form-item label="物流单号: " :borderBottom="true" prop="userInfo.shippingCode" borderBottom ref="item1">
            <u--input v-model="orderForm.userInfo.shippingCode" border="none"></u--input>
          </u-form-item>
        </u-form>

        <div class="commodity-detail">
          <img src="@/assets/img/login/is-check.png" alt="" />
          <div>
            <div>商品名称</div>
            <div style="color: #a4a4a4; font-size: small">详细介绍/详细介绍/详细介绍/详细介绍/详细介绍</div>
          </div>
        </div>
        <div class="confirm-btn-container">
          <div class="showPrice">预估费用 <span>¥89.00</span></div>
          <div class="confirm-btn">提交下单</div>
        </div>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { ref } from 'vue';

const showSex = ref(false);
const orderForm = ref({
  userInfo: {
    name: '',
    sex: '',
    phone: '',
    address: '',
    shippingName: '',
    shippingCode: '',
  },
});
const showTimePicker = ref<boolean>(false);
const timeValue = ref(Date.now());

const actions = [
  {
    name: '男',
  },
  {
    name: '女',
  },
];

function sexSelect(e: any) {
  orderForm.value.userInfo.sex = e.name;
  // visitForm.validateField('userInfo.sex');
}

function confirmMonth(e: { value: string }) {
  timeValue.value = e.value;
  closePicker();
  console.log(e.value);
}

function closePicker() {
  showTimePicker.value = false;
}
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
