<template>
    <view class="container">
        <view class="content1">
            <span>尊敬的用户：</span>
        </view>
        <view class="content2">
            欢迎您注册成为垂直校招用户，在您使用垂直校招提供的服务之前，请您认真阅读《垂
            直校招用户服务协议》（以下简称“协议”），更好地了解我们所提供的服务以及您享有的权
            利和承担的义务。 您一旦开始使用
            <span class="content3">垂直校招</span>
            服务，即表示您已经确认并接受了本服务协议中的全部条款。
        </view>
        <view class="content2">
            本协议由深圳市垂直招聘科技有限公司（以下简称“垂直校招”或“网站”）与您签订，
            请您在注册、使用垂直校招之前，认真阅读以下条款。
            <span class="content3"> 本协议、网站规则可由本网站随时更新，</span>
            您在使用垂直校招时应当及时关注，用户同意本网站不承担通知义务。本网站的通知、
            公告、声明或其它类似内容是本协议及网站规则的一部分。
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

    .content2 {
        text-indent: 2em;
        margin-bottom: 10px;
    }

    .content3 {
        font-weight: 500;
    }

}
</style>