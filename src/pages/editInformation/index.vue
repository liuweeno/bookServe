<template>
  <NavigationBar title="个人资料" :showArrow="true" :border="false"></NavigationBar>
  <div class="page-container">
    <div class="select-card--list">
      <div class="select-card--item">
        <span>头像</span>
        <div @click="changeAvatar">
          <img v-if="userInfo.avatar" class="avatar" :src="userInfo.avatar" />
          <img v-else class="avatar" src="@/assets/img/personalCenter/small-avatar.png" alt="" />
        </div>
      </div>
      <div class="select-card--item" @click="gotoEditUsername">
        <span>修改昵称</span>
        <u-icon name="arrow-right"></u-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '@/components/NavigationBar.vue';
import { ref } from 'vue';
import { setUserInformation, showMessage } from '@/utils/common';
import { onShow } from '@dcloudio/uni-app';

const userInfo = ref({});

onShow(() => {
  userInfo.value = uni.getStorageSync('info');
});

const changeAvatar = () => {
  uni.chooseImage({
    count: 1, // 默认 9
    // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    success: async function (res) {
      let paths = res.tempFilePaths;
      paths = typeof paths === 'string' ? [paths] : paths;
      console.log(paths);

      uni.uploadFile({
        url: 'https://cephalon.cloud/image-host/images',
        filePath: paths[0],
        name: 'images',
        formData: {
          images: paths,
        },
        async success(res) {
          const result = JSON.parse(res.data);
          const { code, data } = result;
          if (code === 20000 && data.length > 0) {
            let { url } = data[0];
            // console.log(1, url);
            const editRes = await editUserInfo({ url });
            if (editRes.code === 20000) {
              setUserInformation(editRes.data);
              showMessage('修改成功', 'success');
              userInfo.value = uni.getStorageSync('info');
            } else {
              showMessage('修改失败');
            }
          }
        },
        fail(err) {
          console.log(2, err);
        },
      });
    },
  });
};

const gotoEditUsername = () => {
  uni.navigateTo({
    url: '/pages/editInformation/editUsername',
  });
};
</script>

<style lang="scss">
.page-container {
  background-color: rgba(244, 244, 246, 1);
  height: 100vh;
  padding: 48rpx;

  .select-card--list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12rpx;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 24rpx;

    .select-card--item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 0;
      width: 100%;
      font-size: 28rpx;
      line-height: 40rpx;

      .avatar {
        width: 60rpx;
        height: 60rpx;
      }

      &:not(:first-child) {
        border-top: 2rpx solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
