<template>
    <view class="container">
        <form @submit.prevent="handleSubmit">
            <!-- 手机号输入 -->
            <view class="formItem">
                <view class="phoneInputWrapper">
                    <picker class="countryCodePicker" mode="selector" :range="countryCodeOptions" range-key="label"
                        @change="handleCountryCodeChange">
                        <view class="picker">
                            {{ selectedCountryCode.label }}
                        </view>
                    </picker>
                    <input v-model.trim="formState.phone" type="tel" placeholder="请输入手机号" class="input phoneInput"
                        @blur="() => validatePhone()" />
                </view>
                <text v-if="errors.phone" class="error">{{ errors.phone }}</text>
            </view>

            <!-- 验证码输入 -->
            <view class="formItem">
                <view class="codeInputWrapper">
                    <input v-model.trim="formState.code" type="number" placeholder="请输入验证码" class="input codeInput"
                        @blur="() => validateCode()" />
                    <button class="codeBtn" :disabled="!canGetCode || !isPhoneValid" @click.prevent="getSmsCode">
                        {{ codeBtnText }}
                    </button>
                </view>
                <text v-if="errors.code" class="error">{{ errors.code }}</text>
            </view>

            <!-- 提交按钮 -->
            <button class="submitBtn" :disabled="isSubmitting || !isFormValid">
                <u-loading-icon v-if="isSubmitting" size="16" color="#fff" />
                <text v-else>登录</text>
            </button>
        </form>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onUnmounted } from 'vue'

interface CountryCode {
    value: string
    label: string
}

interface FormState {
    phone: string
    code: string
}

interface FormErrors {
    phone: string
    code: string
}

// 响应式状态
const formState = reactive<FormState>({
    phone: '',
    code: ''
})

const errors = reactive<FormErrors>({
    phone: '',
    code: ''
})

const countryCodeOptions: CountryCode[] = [
    { value: '+86', label: '+86' },
    { value: '+1', label: '+1' },
    { value: '+852', label: '+852' }
]

const selectedCountryCode = ref<CountryCode>(countryCodeOptions[0])
const isSubmitting = ref(false)
const countdown = ref(0)
const countdownTimer = ref<number | null>(null)

// 计算属性
const isPhoneValid = computed(() => validatePhone(true))
const isCodeValid = computed(() => validateCode(true))
const isFormValid = computed(() => isPhoneValid.value && isCodeValid.value)
const canGetCode = computed(() => countdown.value <= 0)
const codeBtnText = computed(() => countdown.value > 0 ? `${countdown.value}s后重新获取` : '获取验证码')

// 方法
const handleCountryCodeChange = (e: { detail: { value: number } }) => {
    selectedCountryCode.value = countryCodeOptions[e.detail.value]
}

const validatePhone = (silent = false): boolean => {
    const phone = formState.phone
    const countryCode = selectedCountryCode.value.value

    if (!phone) {
        if (!silent) errors.phone = '请输入手机号'
        return false
    }

    let isValid = false
    let errorMessage = ''

    switch (countryCode) {
        case '+86':
            isValid = /^1[3-9]\d{9}$/.test(phone)
            errorMessage = '请输入11位中国大陆手机号'
            break
        case '+1':
            isValid = /^\d{10}$/.test(phone)
            errorMessage = '请输入10位美国手机号'
            break
        case '+852':
            isValid = /^\d{8}$/.test(phone)
            errorMessage = '请输入8位香港手机号'
            break
        default:
            isValid = phone.length >= 8
            errorMessage = '请输入有效的手机号'
    }

    if (!isValid && !silent) {
        errors.phone = errorMessage
    } else if (!silent) {
        errors.phone = ''
    }

    return isValid
}

const validateCode = (silent = false): boolean => {
    const code = formState.code

    if (!code) {
        if (!silent) errors.code = '请输入验证码'
        return false
    }

    const isValid = /^\d{6}$/.test(code)

    if (!isValid && !silent) {
        errors.code = '请输入6位数字验证码'
    } else if (!silent) {
        errors.code = ''
    }

    return isValid
}

const getSmsCode = async () => {
    if (!validatePhone()) return

    try {
        uni.showLoading({ title: '发送中...', mask: true })
        await mockApiRequest()
        startCountdown()
        uni.showToast({
            title: `验证码已发送至 ${selectedCountryCode.value.value}${formState.phone}`,
            icon: 'none'
        })
    } catch (error) {
        console.error('获取验证码失败:', error)
        uni.showToast({ title: '获取验证码失败', icon: 'none' })
    } finally {
        uni.hideLoading()
    }
}

const startCountdown = (seconds = 60) => {
    countdown.value = seconds
    countdownTimer.value = window.setInterval(() => {
        countdown.value--
        if (countdown.value <= 0 && countdownTimer.value !== null) {
            clearInterval(countdownTimer.value)
            countdownTimer.value = null
        }
    }, 1000)
}

const handleSubmit = async () => {
    if (!validatePhone()) {
        uni.showToast({ title: '请输入有效的手机号', icon: 'none' })
        return
    }

    if (!validateCode()) {
        uni.showToast({ title: '请输入6位验证码', icon: 'none' })
        return
    }

    isSubmitting.value = true

    try {
        await mockApiRequest(1500)
        uni.showToast({ title: '登录成功', icon: 'success' })
        uni.navigateBack()
    } catch (error) {
        console.error('登录失败:', error)
        uni.showToast({ title: '登录失败', icon: 'none' })
    } finally {
        isSubmitting.value = false
    }
}

const mockApiRequest = (delay = 1000) => new Promise(resolve => setTimeout(resolve, delay))

onUnmounted(() => {
    if (countdownTimer.value !== null) {
        clearInterval(countdownTimer.value)
    }
})
</script>

<style lang="scss" scoped>
.container {
    padding: 40rpx;
}

.formItem {
    margin-bottom: 40rpx;
    font-size: 12px;

    .error {
        display: block;
        margin-top: 8rpx;
        font-size: 24rpx;
        color: #f56c6c;
        padding-left: 20rpx;
    }
}

.phoneInputWrapper {
    display: flex;
    align-items: center;
    background: rgba(245, 245, 245, 1);
    border-radius: 23px;
    padding: 0 20rpx;
    height: 90rpx;

    .countryCodePicker {
        width: 120rpx;
        height: 100%;
        display: flex;
        align-items: center;

        .picker {
            padding-left: 20rpx;
            padding-right: 20rpx;
            border-right: 1px solid #a6a6a6;
            font-size: 28rpx;
            color: #333;
        }
    }

    .phoneInput {
        flex: 1;
        height: 100%;
        padding-left: 20rpx;
        background: transparent;
    }
}

.codeInputWrapper {
    display: flex;
    align-items: center;
    background: rgba(245, 245, 245, 1);
    border-radius: 23px;
    padding: 0 20rpx;
    height: 90rpx;

    .codeInput {
        flex: 1;
        height: 100%;
        background: transparent;
        padding-left: 20rpx;
    }

    .codeBtn {
        width: 200rpx;
        height: 70rpx;
        line-height: 70rpx;
        font-size: 28rpx;
        border-radius: 18px;

        // 默认状态（未验证手机号）
        background: rgba(245, 245, 245, 1);
        color: #fff;

        border: none !important; // 强制覆盖默认样式
        outline: none !important; // 去除焦点轮廓
        padding: 0 !important; // 去除内边距
        margin: 0 !important; // 去除外边距

        &::after {
            display: none !important; // 针对微信小程序的默认边框
        }

        // 手机号验证通过但未点击
        &:not([disabled]) {
            color: #388bff;
        }

        // 点击时的反馈
        &:active:not([disabled]) {
            background: rgba(245, 245, 245, 1);
            color: #1a73e8;
            /* 点击时的文字颜色 */
            transform: scale(0.98);
        }

        // 禁用状态（倒计时中）
        &[disabled] {
            color: #999;

            // 如果是倒计时状态
            &.counting {
                color: #999;
            }
        }
    }
}

.submitBtn {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    font-size: 32rpx;
    color: #fff;
    background: rgba(56, 139, 255, 1);
    border-radius: 23px;
    margin-top: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled] {
        background: rgba(56, 139, 255, 0.5);
    }
}
</style>