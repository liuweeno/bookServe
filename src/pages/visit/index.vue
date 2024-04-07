<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { ref } from 'vue';

const showSex = ref(false);
const model1 = ref({
  userInfo: {
    name: '',
    sex: '',
    phone: '',
    address: '',
  },
});
const showTimePicker = ref<boolean>(false);
const timeValue = ref<string>('');

const actions = [
  {
    name: '男',
  },
  {
    name: '女',
  },
  {
    name: '保密',
  },
];

function sexSelect(e: any) {
  model1.value.userInfo.sex = e.name;
  // visitForm.validateField('userInfo.sex');
}

function confirmMonth(e: { value: string }) {
  timeValue.value = e.value;
  closePicker();
}

function closePicker() {
  showTimePicker.value = false;
}
</script>

<template>
  <view class="visit-index">
    <NavigationBar :showArrow="false" title="上门维修" :border="false" background="white"></NavigationBar>
    <view class="visit">
      <view class="form">
        <u-form ref="visitForm" :model="model1">
          <u-form-item label="姓名: " prop="userInfo.name" borderBottom ref="item1">
            <u--input v-model="model1.userInfo.name" border="none"></u--input>
          </u-form-item>
          <u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true" ref="item1">
            <u--input
              v-model="model1.userInfo.sex"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择性别"
              border="none"
            ></u--input>
            <template #right>
              <u-icon name="arrow-right"></u-icon>
            </template>
          </u-form-item>
          <u-form-item label="手机: " prop="userInfo.phone" borderBottom ref="item1">
            <u--input v-model="model1.userInfo.phone" border="none"></u--input>
          </u-form-item>
          <u-form-item label="地址: " borderBottom>
            <u--textarea v-model="model1.userInfo.address" placeholder="请输入地址" count></u--textarea>
          </u-form-item>
          <u-form-item
            label="上门时间"
            borderBottom
            @click="showTimePicker = true"
            @confirm="confirmMonth"
            @cancel="closePicker"
          >
            <template #right> <u-icon name="arrow-right"></u-icon> </template
          ></u-form-item>
          <view class="confirm-btn-container"><button class="confirm-btn">确认提交</button></view>
        </u-form>
      </view>
    </view>
    <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false" @select="sexSelect">
    </u-action-sheet>
    <u-datetime-picker
      ref="datetimePickerRef"
      :show="showTimePicker"
      @confirm="confirmMonth"
      @cancel="closePicker"
      v-model="timeValue"
      mode="date"
    ></u-datetime-picker>
  </view>
</template>

<style scoped lang="scss">
.visit-index {
  height: 100vh;
  width: 100vw;
  @include flex-mode(column, flex-start);
  background-color: #f2f2f5;

  .visit {
    width: 100%;
    height: 100%;
    padding: 20px;

    .form {
      padding: 15px;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: white;
      @include flex-mode(column);

      .confirm-btn-container {
        @include flex-mode;
        .confirm-btn {
          margin-top: 20px;
          background-color: #9675ef;
          width: 50%;
          height: 40px;
          color: white;
          @include flex-mode;
          font-size: small;
        }
      }
    }
  }
}
</style>
