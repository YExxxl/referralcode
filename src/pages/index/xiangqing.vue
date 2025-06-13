<template>
	<view class="container">
		<view class="jobList">
			<view class="jobItem">
				<view class="jobHeader">
					<text class="jobCompany">
						<text class="jobTitle">振石控股集团有限公司</text>
						<text class="jobType">校招</text>
					</text>
				</view>

				<view class="jobInfo">
					<view class="jobTag">
						<text class="jobTag title">行业:</text>
						<text class="jobTag content">互联网</text>
					</view>
					<view class="jobNeituima">
						<text class="jobNeituima title">内推码:</text>
						<text class="jobNeituima content">E30QP</text>
					</view>
					<view class="jobLink">
						<view class="jobLinkItem">
							<text class="jobLink title">内推链接:</text>
							<text class="jobLink content">https://idealjobs.cn/</text>
						</view>
						<view class="jobCopy">
							<text>复制</text>
						</view>
					</view>
					<view class="jobTips">
						<text class="jobTips title">备注:</text>
						<text class="jobTips content">无</text>
					</view>
				</view>

				<view class="jobFooter">
					<view class="jobInt">
						<view class="jobViews">
							<image class="image2" src="/src/static/index/浏览2.png"></image>
							<text>5000</text>
						</view>
						<view class="jobDate">
							<image class="image2" src="/src/static/index/发布时间2.png"></image>
							<text>2024-05-31</text>
						</view>
					</view>
				</view>

			</view>
			<!-- <view class="jobImage">
				<image class="image3" src="/src/static/index/相机（内推图片上传）.png"></image>
			</view> -->
		</view>

		<!-- 选择按钮 -->
		<view class="content3">
			<view class="share">
				<image class="image1" src="/src/static/index/分享.png" mode="aspectFill"></image>
				<text>分享</text>
			</view>
			<view class="collect">
				<image class="image1" src="/src/static/index/收藏.png" mode="aspectFill"></image>
				<text>收藏</text>
			</view>
			<button class="CopyBtn" type="primary">复制内推信息</button>
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
		return {
			// 你可以在 setup 中使用 props.jobs
		};
	},
};
</script>

<style lang="scss" scoped>
.jobList {
	margin: 0;
	background-color: rgb(238, 238, 238);
	height: 100vh;
	padding: 10px;
}

.jobItem {
	background: rgb(255, 255, 255);
	padding: 15px;
	border-radius: 10px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	font-size: 14px;
}

.jobHeader {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;

	.jobCompany {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.jobTitle {
			font-weight: bold;
			margin-right: 10px;
		}

		.jobType {
			color: rgba(212, 106, 0, 1);
			background: rgba(255, 224, 194, 1);
			font-size: 10px;
			border-radius: 10px;
			padding: 1px 5px;
		}
	}
}

.jobInfo {
	font-size: 11px;
	margin-bottom: 10px;

	.jobTag {
		display: flex;
		align-items: center;
		margin-bottom: 5px;

		.title {
			width: 60px;
		}
	}

	.jobNeituima {
		display: flex;
		align-items: center;
		margin-bottom: 5px;

		.title {
			width: 60px;
		}
	}

	.jobLink {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
		justify-content: space-between;

		.jobLinkItem {
			display: flex;
			align-items: center;

			.title {
				width: 60px;
			}
		}

		.jobCopy {
			background-color: rgba(53, 146, 252, 1);
			color:#fff;
			border-radius: 15px;
			padding: 5px 10px;
			font-size: 12px;
			cursor: pointer;
			align-items: center;
		}
	}

	.jobTips {
		display: flex;
		align-items: center;
		margin-bottom: 5px;

		.title {
			width: 60px;
		}
	}
}

.jobFooter {
	display: flex;
	justify-content: space-between;
	font-size: 12px;
	color: rgba(150, 150, 150, 1);

	.jobInt {
		display: flex;
		align-items: center;

		.image2 {
			width: 16px;
			height: 16px;
		}

		.jobViews {
			display: flex;
			align-items: center;
			margin: 0 15px 5px 0;
		}

		.jobDate {
			display: flex;
			align-items: center;
			margin: 0 5px 5px 0;
		}
	}
}



.jobImage {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(229, 229, 229, 1);
	border-radius: 10px;
	margin-top: 10px;
}

.content3 {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);

	.share {
		display: flex;
		align-items: center;
		font-size: 13px;
		margin: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		image {
			width: 20px;
			height: 20px;
		}
	}

	.collect {
		font-size: 13px;
		opacity: 1;
		// color: rgba(53, 146, 252, 1);
		color: #000000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		image {
			width: 23px;
			height: 23px;
		}
	}

	.CopyBtn {
		font-size: 14px;
		opacity: 1;
		border-radius: 17px;
		height: 35px;
		background: linear-gradient(to right, rgba(56, 139, 255, 1), rgba(56, 139, 255, 0.7));
		color: rgba(255, 255, 255, 1);
		margin: 0 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
}
</style>