<template>
  <view class="visit-index">
    <NavigationBar :showArrow="true" title="上门维修" :border="false" background="white"></NavigationBar>
    <view class="visit">
      <view class="form">
        <div class="tips">提前确认预约时间，确保双方时间充裕。详细描述问题，让维修人员带齐所需工具和备件。</div>

        <u-form ref="visitForm" :model="orderForm" style="width: 100%">
          <u-form-item
            style="width: 100%"
            label="姓名: "
            :borderBottom="true"
            prop="userInfo.name"
            borderBottom
            ref="item1"
          >
            <u--input v-model="orderForm.receiver" border="none"></u--input>
          </u-form-item>
          <u-form-item label="手机: " :borderBottom="true" prop="orderForm.phone" borderBottom ref="item1">
            <u--input v-model="orderForm.phone" border="none"></u--input>
          </u-form-item>
          <u-form-item label="地址: " :borderBottom="true">
            <u--textarea v-model="orderForm.goAddress" placeholder="请输入地址" count></u--textarea>
          </u-form-item>
          <u-form-item
            label="上门时间"
            borderBottom
            @click="showTimePicker = true"
            @confirm="confirmMonth"
            @cancel="closePicker"
          >
            {{ formatTimestamp(timeValue) }}<template #right> <u-icon name="arrow-right"></u-icon> </template
          ></u-form-item>
          <u-form-item label="备注: " :borderBottom="true">
            <u--textarea v-model="orderForm.buyerMessage" placeolder="请输入备注" count></u--textarea>
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
    <u-datetime-picker
      hasInput
      ref="datetimePickerRef"
      :show="showTimePicker"
      @confirm="confirmMonth"
      @cancel="closePicker"
      v-model="timeValue"
      mode="datetime"
      :closeOnClickOverlay="true"
    ></u-datetime-picker>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { ref, onBeforeMount } from 'vue';
import { addVisitOrder, getGoodsDetail } from '@/api/user';
import { formatTimestamp } from '@/utils/common';

const base = 'http://114.132.45.214:9091/';
const showSex = ref(false);
const orderForm = ref({
  buyName: '',
  buyerMessage: '',
  goAddress: '',
  goTime: '',
  phone: '',
  receiver: '',
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

function confirmMonth(e: { value: string }) {
  timeValue.value = e.value;
  closePicker();
  console.log(e.value);
}

function closePicker() {
  showTimePicker.value = false;
}

onBeforeMount(async () => {
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
  console.log('onBeforeMount');
});

async function confirmAdd() {
  Object.assign(orderForm.value, {
    goTime: formatTimestamp(timeValue.value),
    goodsId: itemDetail.value.id,
    options: 1,
    payment: itemDetail.value.price,
    buyName: uni.getStorageSync('username'),
  });
  const res = await addVisitOrder(orderForm.value);
  if (res.code !== 200) {
    uni.showToast({
      title: '下单失败',
      icon: 'none',
      duration: 1500,
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
  console.log('confirmAdd');
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
