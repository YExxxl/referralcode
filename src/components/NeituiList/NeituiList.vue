<template>
  <scroll-view class="jobList" scroll-y="true">
    <navigator :url="detailUrl" open-type="navigate">
      <view class="jobItem" v-for="job in jobs" :key="job.id">
        <view class="jobHeader">
          <view class="jobCompany">
            <text class="jobTitle">{{ job.company }}</text>
            <text class="jobTag">{{ job.category }}</text>
            <text class="jobPassRate">高通过率</text>
          </view>
          <text class="jobNeituima">{{ job.neituima }}</text>
        </view>

        <view class="jobInfo">
          <view class="jobLink">
            <image class="image1" src="/src/static/index/链接.png"></image>
            <text>投递链接{{ job.link }}内推码{{ job.neituima }}</text>
          </view>
          <view class="jobRole">
            <image class="image1" src="/src/static/index/发布人.png"></image>
            <text>{{ job.role }}</text>
          </view>
        </view>

        <view class="jobFooter">
          <view class="jobInt">
            <view class="jobViews">
              <image class="image2" src="/src/static/index/浏览.png"></image>
              <text>{{ job.views }}</text>
            </view>
            <view class="jobDate">
              <image class="image2" src="/src/static/index/时间戳.png"></image>
              <text>{{ job.expiry }}</text>
            </view>
          </view>
          <view class="jobCheck">
            <text>{{ checkDetail }}</text>
            <image :src="jobcheckIcon" />
          </view>
        </view>
      </view>
    </navigator>

  </scroll-view>
</template>

<script>
export default {
  props: {
    jobs: {
      type: Array,
      required: true,
    },
    detailUrl: {
      type: String,
      default: '/pages/index/xiangqing'
    },
    checkDetail: {
      type: String,
      default: '查看详情'
    },
    jobcheckIcon: {
      type: String,
      default: '/static/index/查看详情.png'
    }
  },
  setup(props) {
    return {
      // 你可以在 setup 中使用 props.jobs
    };
  },
};
</script>

<style lang="scss" scoped>
.jobList {
  margin: 0;
}

.jobItem {
  background: white;
  // margin: 10px;
  padding: 15px;
  border-radius: 10px;
  // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.jobHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .jobCompany {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .jobTitle {
      font-weight: bold;
      margin-right: 10px;
    }

    .jobTag {
      color: rgba(212, 106, 0, 1);
      background: rgba(255, 224, 194, 1);
      font-size: 10px;
      border-radius: 5px;
      padding: 1px 5px;
    }

    .jobPassRate {
      color: rgb(255, 255, 255);
      background-color: rgb(23, 83, 247);
      padding: 1px 5px;
      font-size: 8px;
      font-weight: bold;
      font-style: oblique;
      border-top-left-radius: 5px;
      border-bottom-right-radius: 5px;
      margin-left: 10px;
    }
  }

  .jobNeituima {
    font-size: 18px;
    color: rgba(53, 146, 252, 1);
    font-weight: 500;
  }
}

.jobInfo {
  font-size: 11px;
  margin-bottom: 10px;

  .jobLink {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .jobRole {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .image1 {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}

.jobFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(150, 150, 150, 1);

  .jobInt {
    display: flex;
    align-items: center;

    .image2 {
      width: 16px;
      height: 16px;
    }

    .jobViews {
      display: flex;
      align-items: center;
      margin-right: 15px;
    }

    .jobDate {
      display: flex;
      align-items: center;
    }
  }

  .jobCheck {
    color: rgba(166, 166, 166, 1);
    font-size: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    image {
      width: 10px;
      height: 10px;
    }
  }

}
</style>
