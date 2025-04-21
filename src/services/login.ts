import { http } from "@/utils/http";

interface LoginParams {
  code: string;
  encryptedData: string;
  iv: string;
  avatar?: string;
  nickName?: string;
}

interface LoginResponse {
  token: string;
  userId: string;
  // 其他返回字段
}

export const postLoginWxMinAPI = async (data: LoginParams): Promise<LoginResponse> => {
  try {
    const requestData = {
      loginCode: { code: data.code },
      phoneCode: {
        encryptedData: data.encryptedData,
        iv: data.iv
      },
      avatar: data.avatar ? { url: data.avatar } : undefined,
      nickName: data.nickName ? { name: data.nickName } : undefined
    };

    const token = wx.getStorageSync('token') || '';

    // 明确指定返回类型
    return await http.post<LoginResponse>(
      "/user/phoneLogin",
      requestData,
      {
        headers: {
          "token": token
        }
      }
    );
  } catch (error) {
    console.error("请求失败:", error);
    throw error;
  }
};




// // 登录响应数据类型
// interface LoginResponse {
//   code: number;
//   message: string;
//   data: {
//     token: string;
//     userInfo: {
//       avatar: string;
//       nickname: string;
//     };
//   };
// }

// // 登录参数类型
// interface PhoneLoginParams {
//   loginCode: string;  // 微信登录code
//   phoneCode: string;  // 相当于微信的encryptedData
//   avatar?: string;
//   nickName?: string;
// }

// // 手机号快捷登录API
// export const postPhoneLoginAPI = async (params: PhoneLoginParams): Promise<LoginResponse> => {
//   const response = await uni.request({
//     url: "http://119.29.119.100:8083/user/phoneLogin",
//     method: "POST",
//     header: {
//       "Content-Type": "application/json",
//       "Accept": "*/*"
//     },
//     data: params
//   });

//   if (response.statusCode !== 200) {
//     throw new Error(`请求失败: ${response.statusCode}`);
//   }

//   return response.data as LoginResponse;
// };
