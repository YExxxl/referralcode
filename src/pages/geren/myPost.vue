<template>
    <view class="container">
        <view class="content">
            我的发布
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

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
    }
}
</style>