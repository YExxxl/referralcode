// types/user.ts
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface UserInfo {
  avatar?: string;
  nickname?: string;
  gender?: "男" | "女";
  location?: string;
}

// services/user.ts
export const updateUserInfoAPI = async (data: UserInfo): Promise<void> => {
  try {
    // 1. 获取token
    const token = uni.getStorageSync("token");
    if (!token) {
      throw new Error("未检测到登录状态，请先登录");
    }

    // 2. 发起请求
    const response = await uni.request({
      url: "http://119.29.119.100:8083/user/updateInfoById",
      method: "PUT",
      header: {
        "Content-Type": "application/json",
        token: token,
      },
      data,
    });

    // 3. 处理响应数据（类型安全方案）
    const handleResponse = (data: any): void => {
      if (typeof data === "string") {
        try {
          data = JSON.parse(data) as ApiResponse;
        } catch {
          throw new Error("响应数据解析失败");
        }
      }

      if (typeof data === "object" && data !== null) {
        const res = data as ApiResponse;
        if (res.code !== 200) {
          throw new Error(res.message || "更新用户信息失败");
        }
        return;
      }

      throw new Error("无效的响应格式");
    };

    handleResponse(response.data);
  } catch (error) {
    console.error("更新用户信息失败:", error);
    throw new Error(
      error instanceof Error ? error.message : "网络请求异常，请稍后重试"
    );
  }
};
