<template>
	<view class="container">
		<view class="content1">
			<!-- 内推/招聘按钮 -->
			<view class="navButtons">
				<view class="navButton" :class="{ active: activeTab === '内推' }" @click="switchTab('内推')">内推</view>
				<view class="navButton" :class="{ active: activeTab === '招聘' }" @click="switchTab('招聘')">招聘</view>
			</view>
			<!-- 搜索框 -->
			<view class="searchTab">
				<SearchTab :backgroundColor="searchBackgroundColor" :borderRadius="'20px'" />
			</view>
		</view>

		<scroll-view class="content2" enableBackToTop="true" scroll-y>
			<checkbox-group @change="checkboxChange">
				<view v-if="pullText != ''" class="loading">{{ pullText }}</view>
				<view class="jobWrapper" v-for="job in jobs" :key="job.id">
					<label class="jobCheckbox">
						<checkbox :value="job.id" :checked="job.selected" style="transform:scale(0.5)"
							class="round AllBlue borderBlack" />
					</label>
					<NeituiList v-if="activeTab === '内推'" :jobs="[job]" class="jobContent" @click="linkWorkList(job)" />
					<ZhaopinList v-else :jobs="[job]" class="jobContent" @click="linkWorkList(job)" />
				</view>
				<view class="loading">{{ loadingText }}</view>
			</checkbox-group>
		</scroll-view>

		<!-- 按钮操作 -->
		<view class="content3">
			<label class="allSelectBtn">
				<view>
					<checkbox-group @change="checkboxAllChange" class="round borderBlack AllBlue"
						style="transform:scale(0.7)">
						<checkbox :value="all" :checked="isAllSelected" />
					</checkbox-group>
				</view>
				<view>全选</view>
			</label>
			<button class="CancelBtn" type="primary" @click="confirmSelection">取消收藏</button>
			<button class="CopyBtn" type="primary">复制{{ activeTab === '内推' ? '内推' : '招聘' }}信息</button>
		</view>
	</view>
</template>

<script>
import { ref } from 'vue';
import SearchTab from "@/components/SearchTab/SearchTab.vue";
import NeituiList from "@/components/NeituiList/NeituiList.vue";
import ZhaopinList from "@/components/ZhaopinList/ZhaopinList.vue";

export default {
	components: {
		SearchTab,
		NeituiList,
		ZhaopinList
	},
	setup() {
		const neituiJobs = ref([
			{
				id: 1,
				company: "京东",
				category: "互联网",
				neituima: "C30QP",
				link: "https://campus.jd.com/#/",
				role: "京东内推官",
				views: 5000,
				expiry: "2024-05-31",
				selected: false
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
				selected: false
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
				selected: false
			},
		]);

		const zhaopinJobs = ref([
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
		]);

		const activeTab = ref('内推');
		const jobs = ref(neituiJobs.value);
		const searchBackgroundColor = ref('#f5f5f5');
		const isAllSelected = ref(false);
		const pullText = ref('');
		const loadingText = ref('');

		const switchTab = (tab) => {
			activeTab.value = tab;
			jobs.value = tab === '内推' ? neituiJobs.value : zhaopinJobs.value;
			isAllSelected.value = false; // Reset all selection when switching tabs
		};

		const checkboxAllChange = (e) => {
			const checked = e.detail.value.length > 0;
			isAllSelected.value = checked;
			jobs.value.forEach(job => {
				job.selected = checked;
			});
		};

		const checkboxChange = (e) => {
			const selectedIds = e.detail.value;
			jobs.value.forEach(job => {
				job.selected = selectedIds.includes(job.id.toString());
			});
			isAllSelected.value = selectedIds.length === jobs.value.length;
		};

		const linkWorkList = (job) => {
			console.log('查看详情:', job);
			// 这里实现跳转逻辑
		};

		const confirmSelection = () => {
			// 根据当前tab更新对应的jobs数组
			if (activeTab.value === '内推') {
				neituiJobs.value = neituiJobs.value.filter(job => !job.selected);
				jobs.value = neituiJobs.value;
			} else {
				zhaopinJobs.value = zhaopinJobs.value.filter(job => !job.selected);
				jobs.value = zhaopinJobs.value;
			}

			// 可选：显示删除成功的提示
			uni.showToast({
				title: '取消成功',
				icon: 'success'
			});

			// 重置全选状态
			isAllSelected.value = false;
		};

		return {
			jobs,
			activeTab,
			searchBackgroundColor,
			isAllSelected,
			pullText,
			loadingText,
			switchTab,
			checkboxAllChange,
			checkboxChange,
			linkWorkList,
			confirmSelection
		};
	}
}
</script>

<style lang="scss" scoped>
/* 保持之前的样式不变 */
.container {
	background-color: rgba(245, 245, 245, 1);
	height: 100vh;
}

.content1 {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	background-color: rgba(255, 255, 255, 1);

	.navButtons {
		display: flex;
		justify-content: flex-start;
		margin: 2% 0 2% 10px;
		background: rgba(53, 146, 252, 0.9);
		width: fit-content;
		border-radius: 20px;
		padding: 3px;

		.navButton {
			min-width: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 5px 10px;
			color: white;
			border-radius: 20px;
		}

		.navButton.active {
			background: white;
			color: rgb(0, 0, 0);
		}
	}

	.searchTab {
		height: 36px;
		flex: 1;
	}
}

.content2 {
	position: relative;
	padding-bottom: 60px;

	.jobWrapper {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		margin: 10px;
		border-radius: 8px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

		.jobCheckbox {
			margin: 10px 0 0 10px;
		}

		.jobContent {
			flex: 1;

			:deep(.jobItem) {
				padding-top: 0;
			}
		}
	}
}

.content3 {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);

	.allSelectBtn {
		display: flex;
		align-items: center;
		font-size: 12px;
		margin: 0 10px;
	}

	.CancelBtn {
		font-size: 14px;
		border-radius: 17px;
		height: 35px;
		opacity: 1;
		background: rgba(255, 255, 255, 1);
		border: 1.5px solid rgba(53, 146, 252, 1);
		color: rgba(53, 146, 252, 1);
		margin: 0 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.CopyBtn {
		font-size: 14px;
		opacity: 1;
		border-radius: 17px;
		height: 35px;
		background: linear-gradient(to right, rgba(56, 139, 255, 1), rgba(56, 139, 255, 0.7));
		color: rgba(255, 255, 255, 1);
		margin: 0 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
}
</style>