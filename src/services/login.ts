import { http } from '@/utils/http'

type LoginParams = {
    code: string,
    encryptedData: string,
    iv: string,
}

// 微信小程序登录
export const postLoginWxMinAPI = (data : LoginParams) => {
    return http({
        method: 'POST',
        url: '/login/wxMin',
        data,
    })
}