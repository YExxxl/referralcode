<template>
    <view class="container">
        <view class="content1">
            <span>本法律声明由深圳市垂直招聘科技有限公司（以下简称“垂直校招”或“网站”）制定，在
                您使用垂直校招提供的服务之前，请您认真阅读垂直校招《法律声明》：</span>
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
    font-weight: 500;
    text-indent: 2em;
}
</style>