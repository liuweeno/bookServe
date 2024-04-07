<template>
  <view>
    <NavigationBar :showArrow="false" title="维修日历" :border="false" background="white"></NavigationBar>
    <up-calendar :show="show"></up-calendar>
    <up-button @click="show = true">打开</up-button>
  </view>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import { ref } from 'vue';

const show = ref(false);
</script>
