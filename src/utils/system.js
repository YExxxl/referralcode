const SystemInfo = uni.getSystemInfoSync();
export const getStatusBarHeight = () => SystemInfo.statusBarHeight || 0;

export const getTitleBarHeight = () => {
    if(uni.getMenuButtonBoundingClientRect()){
        const {top, height} = uni.getMenuButtonBoundingClientRect();
        const titleBarHeight = height + (top - SystemInfo.statusBarHeight)*2;
        return titleBarHeight;
    }else{
        return 44;
    }
}