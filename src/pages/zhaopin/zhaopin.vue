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
				<SelectDown :value="monIndex" downInner :options="options" @change="changeValue" placeholder="企业性质">
				</SelectDown>
			</view>
			<view class="jobCategory">
				<view class="filter" :class="{ active: selectedIndustryIndex !== -1 }">
					<picker :range="customData" mode="selector" @change="customDataChange" @cancel="cancelSelect"
						:value="selectedIndustryIndex">{{ selectedIndustryText }}
					</picker>
					<image src="/src/static/zhaopin/灰色箭头.png" mode="scaleToFill" />
				</view>
			</view>
			<view class="jobCity">
				<navigator url="/pages/zhaopin/baseCity" open-type="navigate">
					<text>所在城市</text>
					<image src="/src/static/zhaopin/灰色箭头.png" mode="scaleToFill" />
				</navigator>
			</view>
		</view>

		<view class="zhaopinList">
			<view v-for="job in jobs" :key="job.id" class="jobList">
				<ZhaopinList :jobs="[job]"></ZhaopinList>
			</view>
		</view>

	</view>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
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
			monIndex: [0],
			options: [
				{ value: 0, text: "全部" },
				{ value: 1, text: "民营" },
				{ value: 2, text: "国企" },
				{ value: 3, text: "外企" },
				{ value: 4, text: "事业单位" },
				{ value: 5, text: "中外合资" },
			],
		};
	},
	methods: {
		changeValue(e: Event) {
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

		const selectedIndustryIndex = ref(-1); // 当前选中的行业索引
		const customData = ref(["互联网|游戏|软件", "建筑|地产|家居", "IT|通信|电子", "汽车|机械|制造网", "金融|保险|银行", "金融|保险|银行", "快速消费品"]);

		// 筛选行业变化
		const customDataChange = (e: { detail: { value: number } }) => {
			selectedIndustryIndex.value = e.detail.value;
			// 这里可以添加筛选逻辑
			console.log("选择了:", customData.value[e.detail.value]);
		};

		// 取消筛选
		const cancelSelect = () => {
			selectedIndustryIndex.value = -1;
			// 这里可以重置筛选状态
			console.log("取消筛选");
		};

		// 计算属性，用于显示选中的行业类型文本
		const selectedIndustryText = computed(() => {
			return selectedIndustryIndex.value !== -1 ? customData.value[selectedIndustryIndex.value] : '行业类型';
		});

		return {
			jobs,
			selectedIndustryIndex,
			customData,
			customDataChange,
			cancelSelect,
			selectedIndustryText,
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
	margin:  0;
	color: rgba(117, 117, 117, 1);

	.jobCompanyType {
		flex: 1;
		margin: 0;
	}

	.jobCategory {
		flex: 1;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.filter {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px 0;
			color: rgba(117, 117, 117, 1);
			border-radius: 20px;

			image {
				width: 10px;
				height: 5px;
			}

			/* 确认筛选后的样式 */
			&.active {
				color: rgba(60, 141, 255, 1);

				image {
					src: '/src/static/zhaopin/蓝色箭头.png'; // 更改图片路径
				}
			}

		}
	}

	.jobCity {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		navigator {
			padding: 10px 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		image {
			width: 10px;
			height: 5px;
		}

		/* 确认筛选后的样式 */
		&.active {
			color: rgba(60, 141, 255, 1);

			image {
				src: '/src/static/zhaopin/蓝色箭头.png'; // 更改图片路径
			}
		}
	}
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