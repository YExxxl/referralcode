<template>
    <view class="container">
        <view class="content1">
            <image src="/src/static/geren/校园大使汇客服二维码.png" mode="aspectFit" />
            <text class="content2">扫码添加官方客服企业微信联系置顶</text>
            <text class="content3">（添加时请备注：姓名+内推置顶）</text>
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
    }

    .content3 {
        color: rgba(42, 130, 228, 1);
    }

}
</style>