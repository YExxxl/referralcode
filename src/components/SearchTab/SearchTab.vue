<template>
  <view class="search-container">
    <image src="/src/static/index/搜索图标（在首页的）.png" mode="aspectFit" class="image1" />
    <image src="/src/static/index/直线1.png" mode="aspectFit" class="image2" />
    <input class="search-input" type="text" placeholder="搜索公司"  />
  </view>
</template>

<script lang="ts"> 

</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  background: #ffffff;
  align-items: center;
  margin: 0 10px;
  border-radius: 10px;

  .image1 {
    width: 28px;
    height: 27px;
    margin-left: 12px;
  }

  .image2 {
    width: 5px;
    height: 15px;
  }

  .search-input {
    padding: 10px 10px;
    border-radius: 10px;
    background-color:  rgb(255, 255, 255);
  }

}
</style>
