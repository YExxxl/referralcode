declare module '@/utils/http' {
    interface HttpRequestConfig {
        method: string;
        url: string;
        data: any;
    }

    export function http(config: HttpRequestConfig): any;
}
