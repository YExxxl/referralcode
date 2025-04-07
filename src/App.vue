<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
	console.log("App Launch");
});
onShow(() => {
	console.log("App Show");
});
onHide(() => {
	console.log("App Hide");
});
</script>



<style>
/* checknox复选框自定义样式 */
/* 设置圆角 */
checkbox.round .wx-checkbox-input,
checkbox.round .uni-checkbox-input {
	border-radius: 100upx;
}

/* 设置背景蓝色 */
checkbox.blue[checked] .wx-checkbox-input,
checkbox.blue.checked .uni-checkbox-input {
	background-color: rgba(56, 139, 255, 1) !important;
	border-color: rgba(56, 139, 255, 1) !important;
	color: #ffffff !important;
}

/* 设置背景全蓝色 */
checkbox.AllBlue[checked] .wx-checkbox-input,
checkbox.AllBlue.checked .uni-checkbox-input {
	background-color: rgba(53, 146, 252, 1) !important;
	border-color: rgba(25, 25, 25, 1) !important;
	color: rgba(53, 146, 252, 1) !important;
}

/* 设置边框蓝色 */
checkbox.borderblue .wx-checkbox-input,
checkbox.borderblue .uni-checkbox-input {
	background-color: #ffffff !important;
	border: 2px solid rgba(56, 139, 255, 1) !important;
}

/* 设置边框黑色 */
checkbox.borderBlack .wx-checkbox-input,
checkbox.borderBlack .uni-checkbox-input {
	background-color: #ffffff !important;
	border: 2px solid rgba(25, 25, 25, 1) !important;
}

/* checknox-group复选框自定义样式 */
/* 设置圆角 */
checkbox-group.round .wx-checkbox-input,
checkbox-group.round .uni-checkbox-input {
	border-radius: 100upx;
}

/* 设置边框黑色 */
checkbox-group.borderBlack .wx-checkbox-input,
checkbox-group.borderBlack .uni-checkbox-input {
	background-color: #ffffff !important;
	border: 2px solid rgba(25, 25, 25, 1) !important;
}

/* 设置背景全蓝色 */
checkbox-group.AllBlue[checked] .wx-checkbox-input,
checkbox-group.AllBlue.checked .uni-checkbox-input {
	background-color: rgba(53, 146, 252, 1) !important;
	border-color: rgba(25, 25, 25, 1) !important;
	color: rgba(53, 146, 252, 1) !important;
}


</style>
