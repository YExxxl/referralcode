<template>
  <scroll-view class="jobList" scroll-y="true">
    <view class="jobItem" v-for="job in jobs" :key="job.id" @click="showJobDetail(job)">
      <view class="left">
        <view class="jobHeader">
          <view class="jobTitle">
            <text class="jobCompany">{{ job.company }}</text>
            <text class="jobFuntion">{{ job.funtion }}</text>
          </view>
          <view class="jobPosition">
            <text class="jobZhaopinType">{{ job.zhaopinType }}</text>
            <text class="jobCompanyType">{{ job.companyType }}</text>
          </view>
        </view>

        <view class="jobInfo">
          <view class="jobLink">
            <image class="image1" src="/static/zhaopin/地点.png" mode="aspectFit"></image>
            <text class="jobCity">{{ job.city }}</text>
          </view>
          <view class="jobRole">
            <image class="image1" src="/static/zhaopin/行业.png" mode="aspectFit"></image>
            <text class="jobTag">{{ job.category }}</text>
          </view>
        </view>

      </view>
      <view class="right">
        <view class="companyLogo">
          <image class="image1" :src="job.companyLogo" mode="aspectFit"></image>
        </view>
        <view class="jobDate">
          <image class="image2" src="/static/index/时间戳.png"></image>
          <text>{{ job.expiry }}</text>
        </view>
      </view>

    </view>

    <uni-popup ref="popup" type="bottom" @change="popupChange">
      <view class="popupContent" v-if="selectedJob">
        <view class="popupHeader">
          <text class="popupTitle">{{ selectedJob.company }}</text>
        </view>

        <text class="jobNeituima">内推码：{{ selectedJob.neituima }}</text>

        <view class="popupTips1">
          <view class="tipsTitle">
            <text>暂不支持移动端，请前往电脑端，投递用户体验感更好复制粘贴链接在任意浏览器后即可继续投递</text>
          </view>
          <view class="webLink">
            <text class="webLinkText">https://szly.zhiye.com/campus...</text>
            <button class="webCopyBtn">复制</button>
          </view>
        </view>


        <view class="popupTips2">
          <text class="tipsContent">您也可通过电脑浏览器访问官网 “www.xydsh.cn”，</text>
          <text class="tipsContent">在首页点击『校招』，即可直达各企业官方网申通道</text>
        </view>

        <view class="footer">
          <view class="collect">
            <image class="image1" src="/src/static/index/收藏.png" mode="aspectFill"></image>
            <text>收藏</text>
          </view>
          <button class="knowBtn" type="primary">知道了</button>
        </view>


      </view>
    </uni-popup>

  </scroll-view>
</template>

<script lang="ts">
import { ref } from 'vue';
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';

export default {
  components: {
    uniPopup,
  },
  props: {
    jobs: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const popup = ref(null);
    const selectedJob = ref(null);

    interface PopupChangeEvent {
      show: boolean;
    }

    const showJobDetail = (job) => {
      selectedJob.value = job;
      popup.value?.open();
    };

    const closePopup = () => {
      popup.value?.close();
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

    return {
      popup,
      selectedJob,
      showJobDetail,
      closePopup,
      popupChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.jobList {
  margin: 0;
  padding: 0;
}

.jobItem {
  background: white;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .jobHeader {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 10px;

    .jobTitle {
      font-weight: bold;
      margin-right: 10px;
      font-size: 14px;
    }

    .jobPosition {
      display: flex;
      justify-content: flex;
      align-items: center;
      font-size: 11px;
      font-weight: 400;
      text-align: center;

      .jobZhaopinType {
        color: rgba(212, 163, 86, 1);
        background: rgba(250, 240, 225, 1);
        border-radius: 5px;
        padding: 2px 5px;
        margin: 5px 10px 0 0;
      }

      .jobCompanyType {
        color: rgba(120, 131, 151, 1);
        background-color: rgba(231, 239, 252, 1);
        border-radius: 5px;
        padding: 2px 5px;
        margin: 5px 5px 0 0;
      }
    }
  }

  .jobInfo {
    font-size: 11px;

    .jobLink {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }

    .jobRole {
      display: flex;
      align-items: center;
    }

    .image1 {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }

}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .companyLogo {
    .image1 {
      width: 60px;
      height: 60px;
    }
  }

  .jobDate {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .image2 {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }

    text {
      font-size: 10px;
      color: rgba(166, 166, 166, 1);
    }
  }
}

.popupContent {
  background: white;
  padding: 15px;
  border-radius: 16px 16px 0 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .popupHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .popupTitle {
      font-weight: bold;
      font-size: 24px;
    }
  }

  .jobNeituima {
    font-size: 18px;
    margin-bottom: 10px;
    text-align: center;
    color: rgba(56, 148, 252, 1);
  }

  .popupTips1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    background-color: rgba(185, 208, 237, 0.16);
    font-size: 13px;
    padding: 20px;

    .tipsTitle {
      color: rgba(56, 56, 56, 1);
      margin-bottom: 10px;
      text-align: center;
    }

    .webLink {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 5px;
      font-size: 12px;
      border-radius: 5px;

      .webLinkText {
        color: rgba(0, 0, 0, 0.7);
        margin-right: 5px;
        text-overflow: ellipsis;// 文字溢出时显示省略号
      }

      .webCopyBtn {
        background: rgba(97, 169, 252, 1);
        color: white;
        border-radius: 3px;
        font-size: 12px;
        padding: 0 10px;
      }
    }
  }

  .popupTips2 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;

    .tipsContent {
      font-size: 12px;
      color: rgba(56, 56, 56, 0.7);
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .collect {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 30px;

      .image1 {
        width: 16px;
        height: 16px;
      }

      text {
        font-size: 12px;
        color: rgba(56, 56, 56, 0.8);
      }
    }

    .knowBtn {
      background: rgba(97, 169, 252, 1);
      color: white;
      border-radius: 23px;
      padding: 0 50px;
      margin: 0 30px;
      font-size: 12px;
    }
  }
}
</style>
