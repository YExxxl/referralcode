<template>
  <!-- <view class="uni-select-dc" :style="{ 'z-index': zindex }"> -->
  <view class="uni-select-dc" :style="{ 'z-index': zindex }">
    <view class="uni-select-dc-select" :class="{ active: active }" @click.stop="handleSelect">

      <!-- 禁用mask -->
      <view class="uni-disabled" v-if="disabled"></view>

      <!-- 清空 -->
      <!-- <view class="close-icon close-postion" v-if="realValue.length && !active && !disabled && showClearIcon">
        <text @click.stop="handleRemove(null)"></text>
      </view> -->

      <!-- 显示框 -->
      <view class="uni-select-multiple" v-show="realValue.length">
        <view class="uni-select-multiple-item" v-if="multiple" v-for="(item, index) in changevalue" :key="index">
          {{ item.text }}
          <view class="close-icon" v-if="showValueClear">
            <text @click.stop="handleRemove(index)">
            </text>
          </view>
        </view>

        <!-- 单选时展示内容 -->
        <view v-else class="single-text">
          {{ changevalue.length ? changevalue[0].text : "" }}
        </view>
      </view>

      <!-- 为空时的显示文案 -->
      <view v-if="realValue.length == 0 && showplaceholder" class="uni-select-dc-placeholder">{{
        placeholder
        }}</view>

      <!-- 右边的下拉箭头 -->
      <view :class="{ disabled: disabled, 'uni-select-dc-icon': !downInner, 'uni-select-dc-inner': downInner }"
        class="arrow-container">
        <image :src="arrowIcon" style="width: 10px; height: 5px;" @click.stop="handleSelect"></image>
      </view>
    </view>

    <!-- 下拉选项 -->
    <scroll-view class="uni-select-dc-options" :scroll-y="true" v-show="active">
      <template>
        <view class="uni-select-dc-item" :class="{ active: realValue.includes((item as any)[svalue]) }"
          v-for="(item, index) in options" :key="index" @click.stop="handleChange(index, item)">
          {{ (item as any)[slabel] }}
        </view>
      </template>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";

const arrowIconSrc1 = ref<string>("/static/zhaopin/灰色箭头.png"); // 定义图片路径
const arrowIconSrc2 = ref<string>("/static/zhaopin/蓝色箭头.png"); // 定义图片路径
const arrowIcon = ref<string>(arrowIconSrc1.value); // 使用本地状态来控制箭头图片

const props = defineProps({
  // 是否显示全部清空按钮
  showClearIcon: {
    type: Boolean,
    default: false,
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 下拉箭头是否在框内
  downInner: {
    type: Boolean,
    default: true,
  },
  // 是否显示单个删除
  showValueClear: {
    type: Boolean,
    default: true,
  },
  zindex: {
    type: Number,
    default: 999,
  },
  // 禁用选择
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
  value: {
    type: Array,
    default() {
      return [];
    },
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
  showplaceholder: {
    type: Boolean,
    default: true,
  },
  // 默认取text
  slabel: {
    type: String,
    default: "text",
  },
  // 默认取value
  svalue: {
    type: String,
    default: "value",
  },
});
const emit = defineEmits(["change"]);
const active = ref<boolean>(false); // 组件是否激活，
let changevalue = reactive<Record<any, any>>([]);
let realValue = reactive<Record<string, any>>([]);
onMounted(() => {
  init();
});

// 初始化函数
const init = () => {
  if (props.value.length > 0) {
    props.options.forEach((item) => {
      props.value.forEach((i) => {
        if ((item as any)[props.svalue] === i) {
          changevalue.push(item);
        }
      })
    })
    realValue = props.value;
    console.log("props---", changevalue);

  } else {
    changevalue = [];
    realValue = [];
  }
};
// 点击展示选项
const handleSelect = () => {
  if (props.disabled) return;
  active.value = !active.value;
  // 切换箭头图片
  arrowIcon.value = active.value ? arrowIconSrc2.value : arrowIconSrc1.value;
};
// 移除数据
const handleRemove = (index: any) => {
  if (index === null) {
    realValue = [];
    changevalue = [];
  } else {
    realValue.splice(index, 1);
    changevalue.splice(index, 1);
  }
  emit("change", changevalue, realValue);
};
// 点击组件某一项
const handleChange = (index: number | null, item: any) => {
  console.log("选中了某一项", index, item);
  // 如果是单选框，选中一项后直接关闭
  if (!props.multiple) {
    console.log("关闭下拉框");
    changevalue.length = 0
    realValue.length = 0
    changevalue.push(item);
    realValue.push(item[props.svalue])
    active.value = !active.value;
  } else {
    // 多选操作
    const arrIndex = realValue.indexOf(item[props.svalue]);
    if (arrIndex > -1) {
      // 如果该选项已经选中，当点击后就不选中
      changevalue.splice(arrIndex, 1);
      realValue.splice(arrIndex, 1);
    } else {
      // 否则选中该选项
      changevalue.push(item);
      realValue.push(item[props.svalue]);
    }
  }
  // 触发回调函数
  emit("change", changevalue, realValue);
};
</script>

<style lang="scss" scoped>
.uni-select-dc {
  position: relative;

  .uni-select-mask {
    width: 100%;
    height: 100%;
  }

  /* 删除按钮样式*/
  .close-icon {
    height: 100%;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* z-index: 3; */
    cursor: pointer;
  }

  text {
    position: relative;
    background: #c0c4cc;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1px solid #bbb;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 20%;
      top: 50%;
      height: 1px;
      width: 60%;
      transform: rotate(45deg);
      background-color: #909399;
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}

/* select部分 */
.uni-select-dc-select {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  z-index: 3;
  height: 30px;
  padding: 0 20px 0 10px;
  // box-sizing: border-box;
  font-size: 12px;
  color: rgba(117, 117, 117, 1);
  min-width: 10px;

  // .uni-disabled {
  //   position: absolute;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   z-index: 19;
  //   cursor: no-drop;
  //   background: rgba(255, 255, 255, 0.5);
  // }

  .uni-select-dc-input {
    font-size: 12px;
    color: #999;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 30px;
    box-sizing: border-box;

    &.active {
      color: #333;
    }
  }

  .uni-select-dc-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    &.disabled {
      cursor: no-drop;
    }
  }

  .uni-select-dc-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.disabled {
      cursor: no-drop;

    }
  }

  /* 激活之后，图标旋转180度 */
  &.active .uni-select-dc-icon {
    text {
      transform: rotate(180deg);
    }
  }

  &.active .uni-select-dc-inner {
    text {
      position: absolute;
      top: 12px;
      transform: rotate(-225deg);
    }
  }
}

/* 选择后的样式 */
.uni-select-multiple {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  font-size: 12px;

  .uni-select-multiple-item {
    background: #f4f4f5;
    color: #909399;
    display: flex;
  }

  .single-text {
    color: rgba(60, 141, 255, 1);
    white-space: nowrap; // 防止文字换行
    overflow: hidden; // 文字超出容器时隐藏
  }
}

/* 下拉的options部分 */
.uni-select-dc-options {
  user-select: none;
  position: absolute;
  top: calc(100%);
  left: 0;
  margin: 0;
  width: 100vw;
  /*  height: 400rpx; */
  // max-height: 400rpx;
  // border-radius: 4px;
  border: 1px solid rgb(229, 229, 229);
  background: rgba(255, 255, 255, 1);
  padding: 5px 0;
  box-sizing: border-box;

  .uni-select-dc-item {
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 2.5;
    transition: 0.3s;
    font-size: 14px;

    &.active {
      color: #409eff;
      background-color: #f5f7fa;

      &:hover {
        color: #409eff;
        background-color: #f5f7fa;
      }
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

/* 所有情空的定位 */
.close-postion {
  position: absolute;
  right: 35px;
  top: 0;
  height: 100%;
  width: 15px;
}
</style>