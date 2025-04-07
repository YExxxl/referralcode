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
      <button class="picture" @tap="showPopup">
        <image :src="userInfo.avatar" mode="aspectFit"></image>
      </button>
      <view class="name">
        <view class="nameLogin">{{ userInfo.nickname }}</view>
        <view class="nameTip" v-if="!isLogin">点击头像可登录/注册</view>
      </view>
    </view>

    <view class="content">
      <view class="content1 common">
        <text class="formTitle">常用服务</text>
        <view class="form">
          <navigator class="myCollection" url="/pages/geren/myCollection" open-type="navigate">
            <image src="/src/static/geren/常用服务——收藏 .png" mode="aspectFill" />
            <text>收藏</text>
          </navigator>
          <navigator class="myPost" url="/pages/geren/myPost" open-type="navigate">
            <image src="/src/static/geren/常用服务——发布.png" mode="aspectFill" />
            <text>发布</text>
          </navigator>
          <navigator class="pinnedPromotion" url="/pages/geren/pinnedPromotion" open-type="navigate">
            <image src="/src/static/geren/常用服务——置顶.png" mode="aspectFill" />
            <text>置顶推广</text>
          </navigator>
          <navigator class="mySetting" url="/pages/geren/mySetting" open-type="navigate">
            <image src="/src/static/geren/常用服务——设置.png" mode="aspectFill" />
            <text>设置</text>
          </navigator>
        </view>
      </view>

      <view class="content1 other">
        <text class="formTitle">其他服务</text>
        <view class="form">
          <navigator class="aboutUs" url="/pages/geren/aboutUs" open-type="navigate">
            <image src="/src/static/geren/其他服务——关于我们.png" mode="aspectFill" />
            <text>关于我们</text>
          </navigator>
          <navigator class="privacyAgreement" url="/pages/geren/privacyAgreement" open-type="navigate">
            <image src="/src/static/geren/其他服务——隐私政策.png" mode="aspectFill" />
            <text>隐私协议</text>
          </navigator>
          <navigator class="serviceAgreement" url="/pages/geren/serviceAgreement" open-type="navigate">
            <image src="/src/static/geren/其他服务——服务协议.png" mode="aspectFill" />
            <text>服务协议</text>
          </navigator>
          <navigator class="legalNotices" url="/pages/geren/legalNotices" open-type="navigate">
            <image src="/src/static/geren/其他服务——法律声明.png" mode="aspectFill" />
            <text>法律声明</text>
          </navigator>
        </view>
      </view>

    </view>

    <!-- 弹窗 -->
    <uni-popup ref="popup" type="bottom" :mask="true" @change="popupChange" :animation="false">
      <view class="popupContent">
        <!-- <uni-icons type="closeempty" size="24" color="#999" @click="closePopup"></uni-icons> -->
        <view class="welcomeSection">
          <text class="welcomeTitle">欢迎来到内推码</text>
          <text class="welcomeSubtitle">内推码，求职快人一步！</text>
        </view>

        <view class="buttonGroup">
          <button open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber" :disabled="!agreementChecked"
            class="authButton">
            <image src="/src/static/geren/手机号快捷登录.png" />
            <text>手机号快捷登录</text>
          </button>

          <button class="smsButton" @click="handleSmsLogin">
            <image src="/src/static/geren/短信验证码登录.png" />
            <text>短信验证码登录</text>
          </button>

        </view>

        <view class="agreement">
          <checkbox :checked="false" @click="toggleAgreement" style="transform:scale(0.7)" class="borderblue blue" />
          <text class="agreementText">我已阅读并同意</text>
          <text class="linkText">《用户服务协议》</text>
          <text class="agreementText">和</text>
          <text class="linkText">《隐私政策》</text>
        </view>
      </view>
    </uni-popup>

  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { getStatusBarHeight, getTitleBarHeight } from '@/utils/system.js';
import { postLoginWxMinAPI } from '@/services/login';
import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';


interface UserInfo {
  avatar: string;
  nickname: string;
}


export default defineComponent({
  components: {
    UniPopup,
  },

  setup() {
    interface PopupChangeEvent {
      show: boolean;
    }

    const state = reactive({
      searchIcon: false,
    });


    const popup = ref<{
      open: () => void;
      close: () => void
    }>();  // popup 初始值为 undefined

    const showPopup = async (): Promise<void> => {
      if (isLogin.value) return;  // 如果已登录，直接返回，不打开弹窗
      await getCode();  // 获取微信登录 code
      popup.value?.open();  // 调用弹窗的 open() 方法
    };

    //通过弹窗显隐控制导航栏的显示和隐藏
    const popupChange = (e: PopupChangeEvent) => {

      if (e.show) {
        //隐藏tabbar
        uni.hideTabBar()
      } else {
        //显示tabbar
        uni.showTabBar()
      }
      state.searchIcon = e.show
    }

    const isLogin = ref(false);
    const userInfo = reactive<UserInfo>({
      avatar: '/static/geren/头像.png',
      nickname: '未登录/注册'
    });

    const agreementChecked = ref(false);

    const toggleAgreement = () => {
      agreementChecked.value = !agreementChecked.value;
    };


    let loginCode = '';

    const getCode = async (): Promise<void> => {
      try {
        const res = await uni.login({ provider: 'weixin' });
        loginCode = res.code;
      } catch (error) {
        console.error('获取登录凭证失败:', error);
      }
    };

    const handleGetPhoneNumber = (event: { detail: { encryptedData?: string; iv?: string } }) => {
      if (!agreementChecked.value) {
        uni.showToast({ title: '请先同意用户协议和隐私政策', icon: 'none' });
        return; // 阻止获取手机号
      }
      onGetphonenumber(event); // 调用原来的登录逻辑
    };

    const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {

      if (!ev.detail?.encryptedData || !ev.detail.iv) {
        uni.showToast({ title: '获取手机号失败', icon: 'none' });
        return;
      }

      try {
        const res = await postLoginWxMinAPI({
          code: loginCode,
          encryptedData: ev.detail.encryptedData,
          iv: ev.detail.iv
        });

        // 更新用户信息
        const { userInfo: wechatUserInfo } = await uni.getUserInfo({
          provider: 'weixin'
        });

        userInfo.avatar = wechatUserInfo.avatarUrl;
        userInfo.nickname = wechatUserInfo.nickName;
        isLogin.value = true;

        popup.value?.close();
        uni.showToast({ title: '登录成功' });

        // 处理后续逻辑（如存储token等）
        console.log('登录响应:', res);

      } catch (error) {
        console.error('登录失败:', error);
        uni.showToast({ title: '登录失败，请重试', icon: 'none' });
      }
    };

    const handleSmsLogin = () => {
      if (!agreementChecked.value) {
        uni.showToast({
          title: '请先同意用户协议和隐私政策',
          icon: 'none'
        });
        return;
      }
      // 跳转到短信登录页
      uni.navigateTo({
        url: '/pages/geren/smsLogin'
      });
    };

    return {
      getStatusBarHeight,
      getTitleBarHeight,
      showPopup,
      popup,
      onGetphonenumber,
      userInfo,
      isLogin,
      popupChange,
      state,
      toggleAgreement,
      agreementChecked,
      getCode,
      handleGetPhoneNumber,
      handleSmsLogin,
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
  z-index: 0;

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
    border-radius: 50%;
    width: 65px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin-right: 20px;
    margin-left: 0;
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

.popupContent {
  height: 650rpx;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10rpx 20rpx;
  border-radius: 20px 20px 0 0;
  background-color: #ffffff;
  z-index: 1000;

  .welcomeSection {
    text-align: center;
    margin: 15px 0;

    .welcomeTitle {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      display: block;
      margin-bottom: 16rpx;
    }

    .welcomeSubtitle {
      font-size: 12px;
      color: #666;
      display: block;
    }
  }

  .buttonGroup {
    margin: 20px 50px;

    button {

      &::after {
        border: none;
      }

      +button {
        margin-top: 32rpx;
      }
    }

    .authButton {
      background: rgba(53, 146, 252, 1);
      color: #fff;
      transition: opacity 0.3s;
      border-radius: 23px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      height: 46px;

      image {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }
    }

    &:active {
      opacity: 0.8;
    }


    .smsButton {
      background: rgba(229, 229, 229, 1);
      color: rgba(0, 0, 0, 1);
      border-radius: 23px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      height: 46px;

      image {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }

      &:active {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }

  .agreement {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-size: 10px;

    .agreementText {
      color: rgba(0, 0, 0, 1);
    }

    .linkText {
      color: rgba(53, 146, 252, 1);
      padding: 0 8rpx;
    }
  }
}
</style>