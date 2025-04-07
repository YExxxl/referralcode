<template>
	<view class="container">
		<view class="content1">
			<!-- 搜索框 -->
			<view class="searchTab">
				<SearchTab :backgroundColor="'rgba(0, 0, 0, 0.05)'" :borderRadius="'10px'"
					:searchIcon="'/static/zhaopin/搜索图标（在校园招聘）.png'" />
			</view>
		</view>

		<view class="content2">
			<view class="jobCompanyType">
				<SelectDown :value="monIndex" downInner :options="options" @change="changeValue" placeholder="企业性质"></SelectDown>
			</view>
			<view class="jobCategory">行业类型</view>
			<view class="jobCity">所在城市</view>
		</view>

		<view class="zhaopinList">
			<view v-for="job in jobs" :key="job.id" class="jobList">
				<ZhaopinList :jobs="[job]"></ZhaopinList>
			</view>
		</view>

	</view>
</template>

<script lang="ts">
import { ref } from 'vue';
import SearchTab from "@/components/SearchTab/SearchTab.vue";
import ZhaopinList from "@/components/ZhaopinList/ZhaopinList.vue";
import SelectDown from "@/components/SelectDown/SelectDown.vue";

let monIndex = ref([1]);

const changeValue = (item: any, value: any) => {
	console.log("父组件接收到选中的值", item, value);
	monIndex = value;
};


export default {
	components: {
		SearchTab,
		ZhaopinList,
		SelectDown
	},
	data() {
		return {
			monIndex: 0,
			options: [
				{ value: 1, text: "民营" },
				{ value: 2, text: "国企" },
				{ value: 3, text: "外企" },
				{ value: 4, text: "事业单位" },
				{ value: 5, text: "中外合资" },
			],
		};
	},
	methods: {
		changeValue(e) {
			console.log("e:", e);
		},
	},
	setup() {
		const jobs = ref([
			{
				id: 1,
				company: "科华集团",
				funtion: "2025届校园招聘",
				zhaopinType: "春招提前批",
				companyType: "民营",
				city: "嘉兴|上海|香港|青岛|武汉|...",
				category: "汽车|机械|创造",
				companyLogo: '/static/zhaopin/logo.png',
				expiry: "2024-05-31",
				neituima: "Ado92X",
				selected: false
			},
			{
				id: 2,
				company: "科华集团",
				funtion: "2025届校园招聘",
				zhaopinType: "春招提前批",
				companyType: "民营",
				city: "嘉兴|上海|香港|青岛|武汉|...",
				category: "汽车|机械|创造",
				companyLogo: '/static/zhaopin/logo.png',
				expiry: "2024-05-31",
				neituima: "Ado92X",
				selected: false
			},
			{
				id: 3,
				company: "科华集团",
				funtion: "2025届校园招聘",
				zhaopinType: "春招提前批",
				companyType: "民营",
				city: "嘉兴|上海|香港|青岛|武汉|...",
				category: "汽车|机械|创造",
				companyLogo: '/static/zhaopin/logo.png',
				expiry: "2024-05-31",
				neituima: "Ado92X",
				selected: false
			},
			{
				id: 4,
				company: "科华集团",
				funtion: "2025届校园招聘",
				zhaopinType: "春招提前批",
				companyType: "民营",
				city: "嘉兴|上海|香港|青岛|武汉|...",
				category: "汽车|机械|创造",
				companyLogo: '/static/zhaopin/logo.png',
				expiry: "2024-05-31",
				neituima: "Ado92X",
				selected: false
			},
			{
				id: 5,
				company: "科华集团",
				funtion: "2025届校园招聘",
				zhaopinType: "春招提前批",
				companyType: "民营",
				city: "嘉兴|上海|香港|青岛|武汉|...",
				category: "汽车|机械|创造",
				companyLogo: '/static/zhaopin/logo.png',
				expiry: "2024-05-31",
				neituima: "Ado92X",
				selected: false
			},
		]);

		return {
			jobs,
		};
	}
}
</script>

<style lang="scss" scoped>
/* 保持之前的样式不变 */
.container {
	background-color: rgba(245, 245, 245, 1);
}

.content1 {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	background-color: rgba(255, 255, 255, 1);


	.searchTab {
		margin: 5px;
		flex: 1;
	}
}

.content2 {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	font-size: 12px;
	margin: 10px 0;
	color: rgba(117, 117, 117, 1);
}

.zhaopinList {
	display: flex;
	flex-direction: column;
	margin: 0 10px;

	.jobList {
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
		border-radius: 15px;
		margin: 5px 0;
	}
}
</style>