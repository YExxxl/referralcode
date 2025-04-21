<template>
  <view class="container">
    <view class="fixed-background"></view>
    <!-- 自定义导航栏 -->
    <view class="navbar">
      <!-- 标题 -->
      <view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
      <text class="navTitle" :style="{ height: getTitleBarHeight() + 'px' }">内推广场</text>

    </view>

    <view class="fill" :style="{ height: (getStatusBarHeight() + getTitleBarHeight()) + 'px' }"></view>

    <!-- 左侧切换按钮 -->
    <view class="navButtons">
      <view class="navButton" :class="{ active: activeTab === '校招' }" @click="switchTab('校招')">校招</view>
      <view class="navButton" :class="{ active: activeTab === '实习' }" @click="switchTab('实习')">实习</view>
    </view>

    <!-- 搜索框 -->
    <SearchTab></SearchTab>

    <!-- 校园大使汇/实习大全 -->
    <OtherApp></OtherApp>

    <!-- 热门/最新标签栏 -->
    <view class="tabBar">
      <view class="tabs">
        <view class="tab" :class="{ active: activeList === '热门' }" @click="switchList('热门')">热门</view>
        <view class="tab" :class="{ active: activeList === '最新' }" @click="switchList('最新')">最新</view>
      </view>

      <view class="filter" :class="{ active: selectedIndustryIndex !== -1 }">
        <picker :range="customData" mode="selector" @change="customDataChange" @cancel="cancelSelect"
          :value="selectedIndustryIndex">筛选</picker>
        <image src="/src/static/index/筛选（黑色）.png" mode="aspectFit" />
      </view>
    </view>

    <!-- 职位列表 -->
    <view class="neituiList">
      <view v-for="job in jobs" :key="job.id" class="jobList">
        <NeituiList :jobs="[job]"></NeituiList>
      </view>
    </view>

    <!-- 发布职位悬浮按钮 -->
    <view class="fabuButton">
      <navigator url="/pages/index/fabu" open-type="navigate">
        <image src="/src/static/index/编辑（发布）.png" mode="aspectFit" />
        <text>发布</text>
      </navigator>
    </view>

  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getStatusBarHeight, getTitleBarHeight } from '@/utils/system.js';

import SearchTab from "@/components/SearchTab/SearchTab.vue";
import OtherApp from "@/components/OtherApp/OtherApp.vue";
import NeituiList from "@/components/NeituiList/NeituiList.vue";

export default {
  components: {
    SearchTab,
    OtherApp,
    NeituiList,
  },
  setup() {
    // 状态管理
    const navBgColor = ref("rgba(0, 122, 255, 1)");
    const activeTab = ref("校招");
    const activeList = ref("热门");

    const selectedIndustryIndex = ref(-1); // 当前选中的行业索引
    const customData = ref(["游戏设计", "机械设计", "工业设计", "互联网", "影视行业", "人工智能", "大数据"]);

    // 筛选行业变化
    const customDataChange = (e: { detail: { value: number } }) => {
      selectedIndustryIndex.value = e.detail.value;
      // 这里可以添加筛选逻辑
      console.log("选择了:", customData.value[e.detail.value]);
    };

    // 取消筛选
    const cancelSelect = () => {
      selectedIndustryIndex.value = -1;
      // 这里可以重置筛选状态
      console.log("取消筛选");
    };

    const jobs = ref([
      {
        id: 1,
        company: "京东",
        category: "互联网",
        neituima: "C30QP",
        link: "https://campus.jd.com/#/",
        role: "京东内推官",
        views: 5000,
        expiry: "2024-05-31",
      },
      {
        id: 2,
        company: "京东",
        category: "互联网",
        neituima: "C30QP",
        link: "https://campus.jd.com/#/",
        role: "京东内推官",
        views: 5000,
        expiry: "2024-05-31",
      },
      {
        id: 3,
        company: "京东",
        category: "互联网",
        neituima: "C30QP",
        link: "https://campus.jd.com/#/",
        role: "京东内推官",
        views: 5000,
        expiry: "2024-05-31",
      },
      {
        id: 1,
        company: "京东",
        category: "互联网",
        neituima: "C30QP",
        link: "https://campus.jd.com/#/",
        role: "京东内推官",
        views: 5000,
        expiry: "2024-05-31",
      },
      {
        id: 2,
        company: "京东",
        category: "互联网",
        neituima: "C30QP",
        link: "https://campus.jd.com/#/",
        role: "京东内推官",
        views: 5000,
        expiry: "2024-05-31",
      },
      {
        id: 3,
        company: "京东",
        category: "互联网",
        neituima: "C30QP",
        link: "https://campus.jd.com/#/",
        role: "京东内推官",
        views: 5000,
        expiry: "2024-05-31",
      },
      // 更多职位...
    ]);

    // 方法
    const switchTab = (tab: string) => {
      activeTab.value = tab;
    };

    const switchList = (list: string) => {
      activeList.value = list;
    };

    return {
      getStatusBarHeight,
      getTitleBarHeight,
      selectedIndustryIndex,
      customData,
      customDataChange,
      cancelSelect,
      navBgColor,
      activeTab,
      activeList,
      jobs,
      switchTab,
      switchList,
    };
  },
};


</script>

<style lang="scss">
/* 通用样式 */
.container {
  position: relative;
  font-family: Arial, sans-serif;
}

/* 渐变背景 */
.fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(53, 146, 252, 1) 20%, #efefef 300px);
  z-index: -1; // 确保背景在其他内容之下
}


/* 导航栏 */
.navbar {
  z-index: 1000;
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: rgba(53, 146, 252, 1);

  .navTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
  }
}

/* 校招/实习切换按钮 */
.navButtons {
  display: flex;
  justify-content: flex-start;
  margin: 0 10px 2% 10px;
  background: rgba(255, 255, 255, 0.3);
  width: fit-content;
  border-radius: 20px;
  padding: 3px;

  .navButton {
    padding: 5px 10px;
    color: white;
    border-radius: 20px;
  }

  .navButton.active {
    background: white;
    color: rgb(0, 0, 0);
  }
}

/* 热门/最新/筛选标签 */
.tabBar {
  display: flex;
  justify-content: space-between;
  margin: 10px 15px;
  font-weight: bold;
  font-size: 12px;

  .tabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 10px;
  }

  .tab {
    padding: 5px 15px;
    color: rgba(0, 0, 0, 0.8);
    border-radius: 20px;
    background-color: #ffffff;
    margin-right: 12px;
  }

  .tab.active {
    color: rgb(255, 255, 255);
    background-color: rgba(0, 122, 255, 1);
  }

  .filter {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 15px;
    color: rgba(23, 23, 25, 1);
    border-radius: 20px;
    background-color: #ffffff;

    image {
      width: 12px;
      height: 12px;
    }

    /* 确认筛选后的样式 */
    &.active {
      background-color: rgba(53, 146, 252, 1);
      color: white;

      image {
        filter: brightness(0) invert(1); // 将图标变为白色
      }
    }

  }
}

.jobList {
  margin: 10px;
  overflow: hidden;
  
  &:last-child {
    margin-bottom: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    
  }
}

.fabuButton {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 10px;
  z-index: 999;
  border-radius: 25px;

  navigator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 2px;
    background-color: rgba(53, 146, 252, 1);
    border-radius: 25px;
    width: 50px;
    height: 50px;

    image {
      width: 20px;
      height: 20px;
    }
  }

}

.fabuButton:hover {
  background-color: rgba(53, 146, 252, 0.8);
}
</style>
