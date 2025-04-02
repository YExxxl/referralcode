<template>
  <view class="features">
      <view class="feature feature-blue">
        <view class="featureText">
          <text class="feature-title">校园大使汇</text>
          <text class="feature-desc">投递校园大使职位</text>
        </view>
        <image src="/src/static/index/校园大使汇.png" mode="aspectFit" class="image1" />
      </view>
      <view class="feature feature-orange">
        <view class="featureText">
          <text class="feature-title">实习大全</text>
          <text class="feature-desc">更多机会，更优选择</text>
        </view>
        <image src="/src/static/index/实习大全.png" mode="aspectFit" class="image2" />
      </view>
    </view>
</template>

<script>

</script>

<style lang="scss" scoped>
.features {
  display: flex;
  justify-content:space-between;;
  margin: 10px;
}

.feature {
  padding: 10px;
  border-radius: 10px;
  color: white;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 44%;
  height: 55px;

  .featureText {
    display: flex;
    flex-direction: column;
    width:100%;
  }

  .feature-title {
    font-size: 16px;
    font-weight: bold;    
  }

  .feature-desc {    
    font-size: 10px;
    margin-top: 10px;
  }
}

.feature:last-child {
  margin-right: 0;
}

.feature-blue {
  background: linear-gradient(to bottom, rgba(72, 103, 230, 1) 20%, rgba(129, 189, 246, 1));
  margin-right: 2%;

  .image1 {    
    width: 41px;
    height: 41px;
  } 
}

.feature-orange {
  background: linear-gradient(to bottom, rgba(248, 134, 68, 1) 20%, rgba(254, 194, 104, 1));

  .image2 {    
    width: 41px;
    height: 41px; 
  } 
}
</style>
