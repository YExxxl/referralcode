<template>
	<view class="container">
		<view class="content">
			<u-picker :show="show" ref="uPicker" :columns="newList" @confirm="confirm" @change="changeHandler"
				@cancel="cancel" itemHeight="80">请选择城市</u-picker>
		</view>
	</view>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import jsonData from '@/utils/cityData.json';

interface CityData {
	name: string;
	children: Array<{ name: string }>;
}

export default {
	setup() {
		const addressData = ref<CityData[]>(jsonData);
		const cityName = ref('请选择城市');
		const provinceName = ref('请选择省份');
		const newList = ref<string[][]>([]);
		const show = ref(true);
		const isRotated = ref(false);

		onMounted(() => {
			const provinceData = addressData.value.map(e => e.name);
			const cityData = addressData.value.map(e => e.children.map(c => c.name));
			newList.value = [provinceData, cityData[0]];
		});

		const confirm = (e: { value: string[] }) => {
			provinceName.value = e.value[0];
			cityName.value = e.value[1];
			show.value = false;
		};

		// 修正参数结构
		const changeHandler = (e: { columnIndex: number; index: number; picker: any }) => {
			const { columnIndex, index, picker } = e;
			if (columnIndex === 0) {
				const cities = addressData.value[index].children.map(c => c.name);
				picker.setColumnValues(1, cities);
			}
		};

		const cancel = () => {
			show.value = false;
			isRotated.value = false;
		};

		return {
			addressData,
			cityName,
			provinceName,
			newList,
			show,
			isRotated,
			confirm,
			changeHandler,
			cancel
		};
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 15px;
	font-size: 16px;
	line-height: 23.17px;
	color: rgba(25, 25, 25, 1);

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
	}
}
</style>