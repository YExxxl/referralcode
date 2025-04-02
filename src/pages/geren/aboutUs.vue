<template>
    <view class="container">
        <view class="content1">
            深圳市垂直招聘科技有限公司是一家深耕于人力资源领域的互联网科技企业，旗下拥有『校园大使汇』、『实习大全』、『内推码』等一系列新生代求职品牌，全面覆盖“校园大使——实习——校招”三大关键求职环节。公司产品影响力辐射全国33个省级行政区、269个城市，覆盖海内外千余所高校，并在海外多所知名高校享有盛誉。
        </view>
        <view class="content2"><span class="content3">联系方式：</span>18718513415</view>
        <view class="content2"><span class="content3">电子邮箱：</span>bd@xydsh.cn</view>
        <view class="content2"><span class="content3">官网：</span>www.xydsh.cn</view>

        <view class="content4">
            <image src="/src/static/geren/校园大使汇公众号二维码.png" mode="aspectFit" />
            <text>公众号：内推码</text>
        </view>


    </view>
</template>

<script lang="ts">
export default {
    props: {
        jobs: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 15px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(25, 25, 25, 1);
    font-weight: 400;

    .content1 {
        text-indent: 2em;
        margin-bottom: 10px;
    }

    .content3 {
        font-weight: 500;
    }

    .content4 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
    }

}
</style>