<template>
    <view class="container">
        <view class="content1">
            欢迎您使用垂直招聘产品和服务！“垂直招聘”平台是由深圳市垂直招聘科技有限公司提供（以下简称“我们”）。我们深知个人信息对您的重要性，我们尊重并保护所有使用我们平台服务的用户的个人信息，并会尽全力保护您的个人信息安全可靠。
        </view>
        <view class="content2">
            我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。我们非常重视您的隐私保护和个人信息保护，特制定本《垂直招聘隐私政策》帮助您了解以下内容，
            <span class="content3">
                请在使用我们的产品（或服务）前，仔细阅读并了解本《垂直招聘隐私政策》（下称“隐私政策”）。
            </span>
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
    text-indent: 2em;

    .content3 {
        font-weight: 550;
    }

}
</style>