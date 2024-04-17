<template>
  <view class="main-container">
    <NavigationBar title="用户注册" />
    <div class="slogan-container">
      <image src="@/assets/img/login/logo.png" class="image" />
      <text class="slogan">微笑 · 无忧维修</text>
    </div>
    {{ newUserForm }}
    <view class="control-container">
      <up-input
        border="bottom"
        type="number"
        placeholderClass="placeholder-class"
        placeholder="请输入手机号"
        v-model="newUserForm.phone"
        fontSize="34rpx"
      >
        <template #prefix>
          <image class="prefix-image" src="@/assets/img/login/phone.png"></image>
        </template>
      </up-input>
      <up-input
        border="bottom"
        type="text"
        password
        placeholderClass="placeholder-class"
        placeholder="请输入你的密码"
        v-model="newUserForm.password"
        fontSize="34rpx"
      >
        <template #prefix>
          <image class="prefix-image" src="@/assets/img/login/pw.png"></image>
        </template>
      </up-input>
      <up-input
        border="bottom"
        type="string"
        placeholderClass="placeholder-class"
        placeholder="请输入姓名"
        v-model="newUserForm.username"
        fontSize="34rpx"
      >
        <template #prefix>
          <image class="prefix-image" src="@/assets/img/register/name.png"></image>
        </template>
      </up-input>
      <div class="choose-container">
        <image class="prefix-image" src="@/assets/img/register/sex.png"></image>
        <up-radio-group v-model="newUserForm.sex" placement="row">
          <up-radio
            :customStyle="{ marginBottom: '8px' }"
            v-for="(item, index) in sexList"
            :key="index"
            :label="item.name"
            :name="item.name"
          >
          </up-radio>
        </up-radio-group>
      </div>
      <div class="choose-container">
        <image class="prefix-image" src="@/assets/img/register/role.png"></image>
        <up-radio-group v-model="newUserForm.role" placement="row">
          <up-radio
            :customStyle="{ marginBottom: '8px' }"
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.name"
            :name="item.value"
          >
          </up-radio>
        </up-radio-group>
      </div>
      <button class="certain-button certain-button-ready" @click="clickRegister">注册</button>
    </view>

    <div class="background-yellow"></div>
    <div class="background-purple"></div>
  </view>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import Agreement from '@/components/Agreement.vue';
import { ref } from 'vue';
import BothAgreement from '@/components/BothAgreement.vue';
import { register } from '@/api/user';

const wayChoose = ref<string>('code-login');
const phoneNumber = ref<string>('');
const newUserForm = ref<{
  username: string;
  password: string;
  phone: string;
  sex: string;
  role: number;
  profile: string;
}>({
  username: '',
  password: '',
  phone: '',
  sex: '男',
  role: 1,
  profile: '123123',
});
const passwordAndCode = ref<string>('');
// const phoneNumber = ref<string>('13187098660');
// const passwordAndCode = ref<string>('qq222222');
const checked = ref<boolean>(false);
const canSendCode = ref<boolean>(true);
const seconds = ref<number>(60);
const showBothAgreement = ref<boolean>(false);

const sexList = [
  { name: '男', value: 0 },
  { name: '女', value: 1 },
];
const roleList = [
  { name: '用户', value: 1 },
  { name: '店员', value: 2 },
];
interface Body {
  phone: string;
  way?: string;
  pwd?: string;
  code?: string;
  app_type?: string;
}

function clickChangeWay(way: string) {
  wayChoose.value = way;
}

async function clickSentCode() {}

async function clickRegister() {
  const res = await register(newUserForm.value);
  if (res.code === 200) {
    uni.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 2000,
    });
    uni.navigateBack();
  } else {
    uni.showToast({
      title: res.msg,
      icon: 'none',
      duration: 2000,
    });
  }
}

function bothAgreement() {
  console.log('bothAgreement');
  checked.value = true;
  clickRegister();
}
</script>

<style scoped lang="scss">
.main-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  @include flex-mode(column, flex-start);

  .slogan-container {
    margin: 80rpx;
    @include flex-mode(column, center, center);

    .image {
      width: 72px;
      height: 72px;
    }

    .slogan {
      @include flex-mode;
      white-space: nowrap;
      margin-top: 16px;
      width: 224px;
      height: 28px;
      font-size: 20px;
      font-family:
        PingFangSC,
        PingFang SC,
        serif;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 28px;
    }
  }

  .control-container {
    height: 496rpx;
    box-sizing: border-box;
    padding: 80rpx 80rpx;
    .login-way {
      width: 604rpx;
      height: 66rpx;
      @include flex-mode(row, flex-start, center);

      > text {
        white-space: nowrap;
        height: 48rpx;
        font-size: 34rpx;
        font-family:
          PingFangSC,
          PingFang SC,
          serif;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.65);
        line-height: 48rpx;
        margin-right: 48rpx;
        position: relative;
        transition: font-size 0.3s;
        will-change: auto;

        &::after {
          content: '';
          position: absolute;
          width: 0;
          height: 4rpx;
          font-size: 32rpx;
          border-radius: 4rpx;
          bottom: -10rpx;
          left: 50%;
          transform: translateX(-50%);
          background-color: #8e50ff;
          transition: width 0.3s;
          will-change: auto;
          top: 76rpx;
        }
      }

      .checked-way {
        white-space: nowrap;
        height: 60rpx;
        font-size: 44rpx;
        font-family:
          PingFangSC,
          PingFang SC,
          serif;
        font-weight: 500;
        color: #000000;
        line-height: 60rpx;

        &::after {
          width: 60%;
        }
      }
    }

    :deep(.u-input) {
      margin-top: 28rpx;
      font-size: 34rpx;
      font-family:
        PingFangSC-Medium,
        PingFang SC,
        serif;
      font-weight: 500;
      color: #000000;
      line-height: 48rpx;
      padding: 0.1rpx 0.1rpx 18rpx;
      border-bottom: 1rpx solid #e5e5e5;
      opacity: 0.9;

      .prefix-image {
        width: 40rpx;
        height: 40rpx;
      }

      :deep(u-input__content__subfix-icon) {
        color: blue;
      }

      .send-code {
        width: 170rpx;
        height: 48rpx;
        font-size: 34rpx;
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 400;
        color: #a371ff;
        line-height: 48rpx;
      }

      .sent-code {
        color: #cccccc;
        @include flex-mode;
      }
    }

    .certain-button {
      margin-top: 48rpx;
      width: 604rpx;
      height: 100rpx;
      background: #000000;
      border-radius: 8rpx;
      opacity: 0.2;

      @include flex-mode;
      font-size: 32rpx;
      font-family:
        PingFangSC-Regular,
        PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 44rpx;
    }

    .certain-button-ready {
      background: #793aea;
      opacity: 1;
    }

    .choose-container {
      height: 60px;
      border-bottom: 1rpx solid #e5e5e5;
      @include flex-mode(row, flex-start);
      .prefix-image {
        width: 40rpx;
        height: 40rpx;
        margin-left: 15rpx;
        margin-right: 9rpx;
      }
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
