<template>
  <view class="container">
    <view class="fixed-background"></view>
    <view class="navbar">
      <view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
      <view class="titleBar" :style="{ height: getTitleBarHeight() + 'px' }">
        个人中心
      </view>
    </view>

    <view class="fill" :style="{ height: (getStatusBarHeight() + getTitleBarHeight()) + 'px' }"></view>

    <view class="person">
      <view class="picture">
        <image src="/src/static/geren/头像.png" mode="aspectFill"></image>
      </view>
      <view class="name">
        <view class="nameLogin">未登录/注册</view>
        <view class="nameTip">点击头像可登录/注册</view>
      </view>
    </view>

    <view class="content">
      <view class="content1 common">
        <text class="formTitle">常用服务</text>
        <view class="form">
          <navigator clss="myCollection" url="/pages/geren/myCollection" open-type="navigate">
            <image src="/src/static/geren/常用服务——收藏 .png" mode="aspectFill" />
            <text>收藏</text>
          </navigator>
          <navigator clss="myPost" url="/pages/geren/myPost" open-type="navigate">
            <image src="/src/static/geren/常用服务——发布.png" mode="aspectFill" />
            <text>发布</text>
          </navigator>
          <navigator clss="pinnedPromotion" url="/pages/geren/pinnedPromotion" open-type="navigate">
            <image src="/src/static/geren/常用服务——置顶.png" mode="aspectFill" />
            <text>置顶推广</text>
          </navigator>
          <navigator clss="mySetting" url="/pages/geren/mySetting" open-type="navigate">
            <image src="/src/static/geren/常用服务——设置.png" mode="aspectFill" />
            <text>设置</text>
          </navigator>
        </view>
      </view>

      <view class="content1 other">
        <text class="formTitle">其他服务</text>
        <view class="form">
          <navigator clss="aboutUs" url="/pages/geren/aboutUs" open-type="navigate">
            <image src="/src/static/geren/其他服务——关于我们.png" mode="aspectFill" />
            <text>关于我们</text>
          </navigator>
          <navigator clss="privacyAgreement" url="/pages/geren/privacyAgreement" open-type="navigate">
            <image src="/src/static/geren/其他服务——隐私政策.png" mode="aspectFill" />
            <text>隐私协议</text>
          </navigator>
          <navigator clss="serviceAgreement" url="/pages/geren/serviceAgreement" open-type="navigate">
            <image src="/src/static/geren/其他服务——服务协议.png" mode="aspectFill" />
            <text>服务协议</text>
          </navigator>
          <navigator clss="legalNotices" url="/pages/geren/legalNotices" open-type="navigate">
            <image src="/src/static/geren/其他服务——法律声明.png" mode="aspectFill" />
            <text>法律声明</text>
          </navigator>
        </view>
      </view>

    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { getStatusBarHeight, getTitleBarHeight } from '@/utils/system.js';
import uniIcons from '../../components/uni-icons/uni-icons.vue';

export default defineComponent({
  components: {
    uniIcons
  },

  setup() {
    return {
      getStatusBarHeight,
      getTitleBarHeight
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  font-family: Arial, sans-serif;
}

.fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(53, 146, 252, 1) 20%, rgba(247, 247, 247, 1) 50%);
  z-index: -1;
}

.navbar {
  background-color: rgba(53, 146, 252, 1);
  position: fixed;
  width: 100%;
  z-index: 100;

  .titleBar {
    color: #ffffff;
    font-size: 18px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    flex: 1;
  }
}

.person {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 30px;

  .picture {
    margin-right: 20px;
    
    image {
      width: 65px;
      height: 65px;
    }
  }

  .name {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: #ffffff;

    .nameLogin {
      font-size: 18px;
    }

    .nameTip {
      font-size: 14px;
      margin-top: 5px;
    }
  } 
}

.content {
  background-color: rgba(247, 247, 247, 1);
  bottom: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 10px;

  .content1 {
    margin: 10px;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    line-height: 30px;
  }

  .formTitle {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .form {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    navigator {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      image {
        width: 25px;
        height: 25px;
      }

      text {
        font-size: 12px;
      }
    }
  }

}
</style>