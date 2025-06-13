<template>
    <view class="container">
        <view class="fixed-background"></view>
        <view class="navbar">
            <view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
            <view class="titleBar" :style="{ height: getTitleBarHeight() + 'px' }">
                <view class="backButton" @click="backToLast"><uni-icons type="back" color="" size="24" /></view>
                <view class="title">发布内推</view>
            </view>
        </view>

        <view class="fill" :style="{ height: (getStatusBarHeight() + getTitleBarHeight()) + 'px' }"></view>

        <view class="advertisement">内推码，求职快人一步！</view>

        <view class="content">
            <view class="form">
                <view class="jobTag">
                    <text>行业<text class="textRed">*</text></text>
                    <picker :range="customData" mode="selector" @change="customDataChange" @cancel="cancelSelect"
                        :value="selectedIndustryIndex">
                        <view class="pickerContent" :class="{ active: isIndustrySelected }">
                            <view>{{ selectedIndustryIndex !== null ? customData[selectedIndustryIndex] : '请选择行业' }}
                            </view>
                            <image src="/src/static/index/查看详情.png" mode="aspectFit"></image>
                        </view>
                    </picker>
                </view>
                <view class="jobTitle">
                    <text>公司<text class="textRed">*</text></text>
                    <input type="text" placeholder="请填写公司名称" v-model="formData.companyName"
                        placeholder-style="color:#939393">
                </view>
                <view class="jobNeituima">
                    <text>内推码<text class="textRed">*</text></text>
                    <input type="text" placeholder="请输入内推码" v-model="formData.referralCode"
                        placeholder-style="color:#939393">
                </view>
                <view class="jobLink">
                    <text>内推链接<text class="textRed">*</text></text>
                    <input type="text" placeholder="请输入内推链接" v-model="formData.referralLink"
                        placeholder-style="color:#939393">
                </view>
                <view class="jobType">
                    <text>内推类型<text class="textRed">*</text></text>
                    <view class="navButtons">
                        <view class="navButton" :class="{ active: formData.type === '校招' }"
                            @click="formData.type = '校招'">校招</view>
                        <view class="navButton" :class="{ active: formData.type === '实习' }"
                            @click="formData.type = '实习'">实习</view>
                    </view>
                </view>
                <view class="jobImage">
                    <text>内推图片</text>
                    <view class="image-uploader">
                        <image v-if="formData.imageUrl" :src="formData.imageUrl" mode="aspectFill"
                            @click="previewImage" />
                        <view v-else class="upload-btn" @click="chooseImage">
                            <image src="/src/static/index/相机（内推图片上传）.png"></image>
                        </view>
                        <view v-if="formData.imageUrl" class="delete-btn" @click="deleteImage">
                            <uni-icons type="trash" size="16" color="#999"></uni-icons>
                        </view>
                    </view>
                </view>
                <view class="jobTips">
                    <text>备注</text>
                    <input type="text" placeholder="请输入备注" v-model="formData.remarks" placeholder-style="color:#939393">
                </view>
            </view>

            <view class="jobAgreement">
                <view class="customCheckbox" :class="{ checked: formData.agreePrivacy }"
                    @click="formData.agreePrivacy = !formData.agreePrivacy">
                    <view class="checkboxIcon">
                        <uni-icons type="checkmarkempty" color="#fff" size="16" />
                    </view>
                </view>
                <view class="checkboxLabel">
                    <navigator url="/pages/geren/privacyAgreement" open-type="navigate" hover-class="navigator-hover">
                        隐私协议
                    </navigator>
                </view>
            </view>

            <view class="action-buttons">
                <view class="delete" @click="resetForm">删除</view>
                <view class="publish" @click="publishInternship" :class="{ disabled: isSubmitting }">
                    {{ isSubmitting ? '提交中...' : '提交修改' }}
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { getStatusBarHeight, getTitleBarHeight } from '@/utils/system.js';
import uniIcons from '../../components/uni-icons/uni-icons.vue';

interface PickerCustomEvent extends CustomEvent {
    detail: {
        value: number;
    };
}

interface FormData {
    companyName: string;
    referralCode: string;
    referralLink: string;
    type: '校招' | '实习';
    remarks: string;
    agreePrivacy: boolean;
    imageUrl: string;
}

export default defineComponent({
    components: {
        uniIcons
    },

    setup() {
        const backToLast = () => {
            uni.navigateBack({
                delta: 1
            });
        };

        const customData = ref(["游戏设计", "机械设计", "工业设计", "互联网", "影视行业", "人工智能", "大数据"]);
        const selectedIndustryIndex = ref<number | null>(null);
        const isSubmitting = ref(false);
        const isIndustrySelected = ref(false);

        const formData = reactive<FormData>({
            companyName: '',
            referralCode: '',
            referralLink: '',
            type: '校招',
            remarks: '',
            agreePrivacy: false,
            imageUrl: ''
        });

        const customDataChange = (e: PickerCustomEvent) => {
            selectedIndustryIndex.value = e.detail.value;
            isIndustrySelected.value = true;
        };

        const cancelSelect = () => {
            selectedIndustryIndex.value = null;
            isIndustrySelected.value = false;
            console.log("您已取消选择");
        };

        const resetForm = () => {
            selectedIndustryIndex.value = null;
            isIndustrySelected.value = false;
            Object.assign(formData, {
                companyName: '',
                referralCode: '',
                referralLink: '',
                type: '校招',
                remarks: '',
                agreePrivacy: false,
                imageUrl: ''
            });
        };

        const chooseImage = async () => {
            try {
                const res = await uni.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['album', 'camera']
                });

                if (res.tempFilePaths.length > 0) {
                    formData.imageUrl = res.tempFilePaths[0];
                }
            } catch (error) {
                console.error('选择图片失败:', error);
            }
        };

        const deleteImage = () => {
            formData.imageUrl = '';
        };

        const previewImage = () => {
            uni.previewImage({
                urls: [formData.imageUrl]
            });
        };

        const validateForm = (): boolean => {
            if (!formData.companyName.trim()) {
                uni.showToast({ title: '请填写公司名称', icon: 'none' });
                return false;
            }

            if (!formData.referralCode.trim() && !formData.referralLink.trim()) {
                uni.showToast({ title: '请填写内推码或内推链接', icon: 'none' });
                return false;
            }

            if (!formData.agreePrivacy) {
                uni.showToast({ title: '请先同意隐私协议', icon: 'none' });
                return false;
            }

            return true;
        };

        const publishInternship = async () => {
            if (isSubmitting.value) return;

            if (!validateForm()) return;

            isSubmitting.value = true;

            try {
                // 这里添加实际发布逻辑
                console.log('发布内推数据:', {
                    industry: selectedIndustryIndex.value !== null ? customData.value[selectedIndustryIndex.value] : null,
                    ...formData
                });

                // 模拟网络请求
                await new Promise(resolve => setTimeout(resolve, 1000));

                uni.showToast({
                    title: '发布成功',
                    icon: 'success'
                });

                setTimeout(() => {
                    uni.navigateBack();
                }, 1500);
            } catch (error) {
                console.error('发布失败:', error);
                uni.showToast({
                    title: '发布失败，请重试',
                    icon: 'none'
                });
            } finally {
                isSubmitting.value = false;
            }
        };

        return {
            backToLast,
            getStatusBarHeight,
            getTitleBarHeight,
            customData,
            selectedIndustryIndex,
            isIndustrySelected,
            formData,
            isSubmitting,
            customDataChange,
            cancelSelect,
            resetForm,
            chooseImage,
            deleteImage,
            previewImage,
            publishInternship,
        };
    },
});

</script>

<style lang="scss" scoped>
.container {
    position: relative;
    font-family: Arial, sans-serif;
}

.fixed-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, #2575fc 20%, #ffffff 50%);
    z-index: -1;
}

.navbar {
    background-color: #2574fc;
    position: fixed;
    width: 100%;
    z-index: 100;

    .titleBar {
        color: #ffffff;
        font-size: 18px;
        display: flex;
        align-items: center;

        .backButton {
            color: #ffffff;
            margin-left: 10px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 10px;
            z-index: 100;
        }

        .title {
            color: #ffffff;
            font-size: 18px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex: 1;
            margin-left: -50px;
        }
    }
}

.advertisement {
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin: 20px;
    font-family: 'SmileySans_Oblique';
}

.content {
    margin: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .form {
        margin: 10px;
        display: flex;
        flex-direction: column;
        height: 100%;

        .jobTag,
        .jobTitle,
        .jobNeituima,
        .jobLink,
        .jobType,
        .jobImage,
        .jobTips {
            border-bottom: rgba(166, 166, 166, 1) solid 1px;
            padding: 15px 0;
            display: flex;
            justify-content: flex;

            text {
                width: 90px;
            }
        }

        .textRed {
            color: rgba(255, 47, 0, 1);
        }

    }
}

.jobTag {

    .pickerContent {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 150px;
        color: #939393;

        image {
            width: 20px;
            height: 20px;
        }
    }

    .pickerContent.active {
        color: black;
        /* 选中后的颜色为黑色 */
    }

}

.jobType {
    display: flex;
    align-items: center;

    .navButtons {
        display: flex;
        justify-content: flex-start;
        background: rgb(255, 255, 255);
        width: fit-content;
        border-radius: 20px;
        padding: 3px;
        background-color: rgba(53, 146, 252, 1);
        font-size: 14px;

        .navButton {
            padding: 5px 10px;
            color: white;
            border-radius: 20px;
            cursor: pointer;
        }

        .navButton.active {
            background: white;
            color: rgb(0, 0, 0);
        }
    }
}

.jobImage {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    text {
        margin-bottom: 10px;
    }

    .image-uploader {
        position: relative;
        width: 65px;
        height: 65px;
        border: 1px dashed #ddd;
        border-radius: 4px;

        image {
            width: 100%;
            height: 100%;
            border-radius: 4px;
        }

        .upload-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30%;
            width: 40%;
            height: 40%;
            background-color: #f5f5f5;
        }

        .delete-btn {
            position: absolute;
            top: -8px;
            right: -8px;
            width: 20px;
            height: 20px;
            background-color: #ff4d4f;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

.jobAgreement {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .customCheckbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
        cursor: pointer;

        .checkboxIcon {
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-right: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s;
        }

        &.checked .checkboxIcon {
            background-color: #2574fc;
            border-color: #2574fc;
        }
    }

    .checkboxLabel {
        color: #5694ff;
    }
}

.action-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    .delete {
        padding: 10px 20px;
        border-radius: 17px;
        border: rgb(252, 41, 41) solid 1px;
        color: rgb(252, 41, 41);
        cursor: pointer;
    }

    .publish {
        padding: 10px 20px;
        border-radius: 17px;
        background-color: #2574fc;
        color: white;
        cursor: pointer;

        &.disabled {
            background-color: #a0c0ff;
            cursor: not-allowed;
        }
    }
}
</style>