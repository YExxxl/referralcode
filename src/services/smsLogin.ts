// // src/api/smsLogin.ts
// // 短信验证码登录
// import { http } from "@/utils/http";


// // 类型定义
// interface SendSmsParams {
//   phoneNumber: string;
// }

// interface SmsLoginParams {
//   phoneNumber: string;
//   smsCode: string;
// }

// interface ApiResponse<T = any> {
//   code: number;
//   message: string;
//   data: T;
// }

// interface SmsResult {
//   success: boolean;
//   message?: string;
// }

// interface LoginResult {
//   token: string;
//   userId: string;
//   expiresIn: number;
// }

// // 配置
// const API_BASE_URL = "http://119.29.119.100:8083";
// const STATIC_TOKEN =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhZG1pbklkIjoxLCJhY2NvdW50IjoiMTIzIiwic3ViIjoiYWRtaW5Mb2dpbiIsImV4cCI6MTc2Njg5NjUzM30.qpZbhdGYtGBG-Dlm9hhph8wQQv4CaSWvHlkcg3SB930";

// const commonHeaders = {
//   Accept: "*/*",
//   "Accept-Encoding": "gzip, deflate, br",
//   "User-Agent": "PostmanRuntime-ApipostRuntime/1.1.0",
//   Connection: "keep-alive",
//   token: STATIC_TOKEN,
// };

// // 发送短信验证码
// export const sendSmsCode = async (phoneNumber: string): Promise<SmsResult> => {
//   try {
//     const response = await http.post<ApiResponse<SmsResult>>(
//       `${API_BASE_URL}/user/sendSms`,
//       null, // POST 请求体为空
//       {
//         params: { phoneNumber },
//         headers: commonHeaders,
//       }
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("[API] 发送短信失败:", error);
//     throw new Error(error.response?.data?.message || "短信发送失败");
//   }
// };

// // 短信登录
// export const smsLogin = async (
//   params: SmsLoginParams
// ): Promise<LoginResult> => {
//   try {
//     const response = await http.post<ApiResponse<LoginResult>>(
//       `${API_BASE_URL}/user/smsLogin`,
//       params,
//       {
//         headers: {
//           ...commonHeaders,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error("[API] 登录失败:", error);
//     throw new Error(error.response?.data?.message || "登录失败");
//   }
// };

