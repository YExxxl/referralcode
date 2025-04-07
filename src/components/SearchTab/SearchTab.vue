<template>
  <view class="search-container" :style="{ background: backgroundColor, borderRadius: borderRadius }">
    <image :src="searchIcon" mode="aspectFit" class="image1" />
    <input class="search-input" type="text" placeholder="搜索公司" />
  </view>
</template>

<script lang="ts">
export default {
  props: {
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    borderRadius: {
      type: String,
      default: '10px'
    },
    searchIcon: {
      type: String,
      default: '/static/index/SearchTab1.png'
    }
  },
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 10px;
  height: 100%;

  .image1 {
    width: 28px;
    height: 27px;
    margin-left: 12px;
  }

  .search-input {
    padding: 10px 10px;
  }
}
</style>