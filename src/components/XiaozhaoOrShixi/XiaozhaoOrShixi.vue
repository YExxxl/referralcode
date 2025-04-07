<template>
  <view class="container">
    <view class="navButtons">
      <view class="navButton" :class="{ active: activeTab === text1 }" @click="switchTab(text1)">{{ text1 }}</view>
      <view class="navButton" :class="{ active: activeTab === text2 }" @click="switchTab(text2)">{{ text2 }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { ref, defineProps } from 'vue';

export default {
  setup() {
    const { text1, text2 } = defineProps({
      text1: {
        type: String,
        required: true,
      },
      text2: {
        type: String,
        required: true,
      },
    });

    const activeTab = ref(text1);

    const switchTab = (tab: string) => {
      activeTab.value = tab;
    };

    return {
      activeTab,
      switchTab,
      text1, // 确保返回 text1
      text2, // 确保返回 text2
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
