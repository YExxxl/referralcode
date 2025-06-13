<template>
    <view class="container">
        <!-- 职位列表 -->
        <view class="neituiList">
            <view v-for="job in jobs" :key="job.id" class="jobList">
                <NeituiList :jobs="[job]" :detailUrl="getDetailUrl(job.id)"></NeituiList>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import NeituiList from "@/components/NeituiList/NeituiList.vue";

export default {
    components: {
        NeituiList,
    },
    props: {
        jobs: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const jobs = ref([
            {
                id: 1,
                company: "京东",
                category: "互联网",
                neituima: "C30QP",
                link: "https://campus.jd.com/#/",
                role: "京东内推官",
                views: 5000,
                expiry: "2024-05-31",
            },
            {
                id: 2,
                company: "京东",
                category: "互联网",
                neituima: "C30QP",
                link: "https://campus.jd.com/#/",
                role: "京东内推官",
                views: 5000,
                expiry: "2024-05-31",
            },
            {
                id: 3,
                company: "京东",
                category: "互联网",
                neituima: "C30QP",
                link: "https://campus.jd.com/#/",
                role: "京东内推官",
                views: 5000,
                expiry: "2024-05-31",
            },
            // 更多职位...
        ]);

        // 定义一个方法来根据职位ID获取不同的详情页URL
        const getDetailUrl = (id: number) => {
            return `/pages/geren/myPostDetails?id=${id}`; // 例如：根据职位ID动态生成URL
        };

        return {
            jobs,
            NeituiList,
            getDetailUrl,
        };
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 10px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(25, 25, 25, 1);
    font-weight: 400;
    background-color: rgba(245, 245, 245, 1);
    height: 100vh;
}

.neituiList {
    .jobList {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        border-radius: 15px;
    }
}
</style>