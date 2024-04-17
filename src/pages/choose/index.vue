<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { onMounted, ref } from 'vue';

const id = ref(0);

function goToMail() {
  uni.navigateTo({ url: `/pages/mail/index?id=${id}` });
}
function goToVisit() {
  uni.navigateTo({ url: `/pages/visit/index?id=${id}` });
}

onMounted(() => {
  let { getId } = (getCurrentPages()[1] as any).options;
  id.value = getId;
});
</script>

<template>
  <div class="choose-container">
    <NavigationBar :showArrow="true" title="选择维修模式" :border="false" background="white"></NavigationBar>
    <div class="control">
      <div class="mail common-style" @click="goToMail">邮寄维修</div>
      <div class="visit common-style" @click="goToVisit">上门维修</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.choose-container {
  @include br;
  height: 100vh;
  width: 100vw;
  @include flex-mode(column);

  .control {
    flex: 1;
    @include flex-mode(column, center, center);
    gap: 40px;
  }
  .common-style {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #7543e2;
    @include flex-mode(center);
    color: white;
  }
}
</style>
