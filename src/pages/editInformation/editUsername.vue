<template>
  <NavigationBar title="修改昵称" :showArrow="true" :border="false"></NavigationBar>
  <div class="page-background">
    <div class="page-container">
      <div class="input-box">
        <up-input
          placeholder="请输入新的昵称"
          fontSize="34rpx"
          border=""
          type="text"
          placeholderClass="placeholder-style"
          v-model="username"
        ></up-input>
      </div>
      <u-button size="large" color="rgba(163, 113, 255, 1)" :disabled="!username" @click="changeNickName">
        确 定
      </u-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/components/NavigationBar.vue';
import { ref } from 'vue';
import { setUserInformation, showMessage } from '@/utils/common';

const username = ref<string>('');

function changeNickName() {}
</script>

<style lang="scss">
.page-container {
  height: 100vh;
  background-color: rgba(244, 244, 246, 1);
  box-sizing: border-box;
  padding: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 48rpx;

  .input-box {
    background-color: #fff;
    border-radius: 8rpx;

    :deep(.u-input) {
      height: 88rpx;
      box-sizing: border-box;
    }
  }
}
</style>
