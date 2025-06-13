<template>
	<view class="container">
		<view class="content1">
			<!-- 搜索框 -->
			<view class="searchTab">
				<SearchTab :backgroundColor="'rgba(0, 0, 0, 0.05)'" :borderRadius="'20px'"
					:searchIcon="'/static/zhaopin/搜索图标（在校园招聘）.png'" />
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import SearchTab from "@/components/SearchTab/SearchTab.vue";

export default {
	components: {
		SearchTab
	}
}; 

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

</style>