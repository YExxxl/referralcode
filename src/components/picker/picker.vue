<template>
  <!-- picker/picker.vue -->
  <view class="full-box" :class="{'cur': isOpen}">
    <view class="modal" @tap="tapModal"></view>
    <view class="picker">
      <view class="picker-header" :style="pickerHeaderStyle">
        <view @tap="cancle">
          <text :style="cancelStyle">{{ cancelText }}</text>
        </view>
        <text :style="titleStyle">{{ titleText }}</text>
        <view @tap="sure">
          <text :style="sureStyle">{{ sureText }}</text>
        </view>
      </view>
      <picker-view :value="value" class="picker-content" @pickstart="_bindpickstart"
                   @change="_bindChange" @pickend="_bindpickend" :indicator-style="indicatorStyle"
                   :mask-style="maskStyle">
        <picker-view-column v-for="(item, index) in columnsData" :key="index">
          <view v-for="(itemIn, inIndex) in item" :key="inIndex" class="picker-line">
            <text class="line1" :style="chooseItemTextStyle">{{ isUseKeywordOfShow ?
              itemIn[keyWordsOfShow] : itemIn }}</text>
          </view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script>
// picker/picker.vue
import { isPlainObject } from './tool';

export default {
  props: {
    scrollType: {
      type: String,
      default: 'normal'
    },
    listData: {
      type: Array,
      default: [],
      observer(newVal) {
        if (newVal.length === 0 || this._compareDate()) return
        this._setTempData()
        const tempArr = [...new Array(newVal.length).keys()].map(() => 0)
        this.data.lastValue = this.data.tempValue = tempArr
        this._setDefault()

        // let {defaultPickData} = this.properties;
        // if(newVal.length === 0) return;
        //
        // this._setDefault(newVal, defaultPickData)
      }
    },
    defaultPickData: {
      type: Array,
      default: [],
      observer(newVal) {
        if (newVal.length === 0 || this._compareDate()) return
        this._setTempData()
        this._setDefault()
      }
    },
    keyWordsOfShow: {
      type: String,
      default: 'name'
    },
    isShowPicker: {
      type: Boolean,
      default: false,
      observer(newVal) {
        if (newVal) {
          this._openPicker()
        } else {
          this._closePicker()
        }
      }
    },
    titleText: {
      type: String,
      default: '标题'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    sureText: {
      type: String,
      default: '确定'
    },
    pickerHeaderStyle: String,
    sureStyle: String,
    cancelStyle: String,
    titleStyle: String,
    maskStyle: String,
    indicatorStyle: String,
    chooseItemTextStyle: String
  },
  data() {
    return {
      columnsData: [],
      value: [],
      backData: [],
      height: 0,
      isOpen: false,
      isUseKeywordOfShow: false,
      scrollEnd: true,
      lastValue: [],
      tempValue: [],
      isFirstOpen: true,
      onlyKey: '',
      defaultPickDataTemp: '',
      listDataTemp: ''
    }
  },
  methods: {
    tapModal() {
      this.$emit('update:isShowPicker', false)
      this._closePicker()
    },
    cancle() {
      this.$emit('cancle')
      this._closePicker()
    },
    sure() {
      const { scrollEnd, tempValue } = this.data
      if (!scrollEnd) return
      const backData = this._getBackDataFromValue(tempValue)
      this.setData({
        backData
      })
      this.$emit('sure', {
        choosedData: backData,
        choosedIndexArr: tempValue
      })
      this._closePicker()
    },
    _bindChange(e) {
      const { scrollType } = this.scrollType
      const { lastValue } = this.data
      let val = e.detail.value
      switch (scrollType) {
        case 'normal':
          this.data.tempValue = [...val]
          break
        case 'link':
          var tempArray = []
          if (val.length > 1) {
            val.slice(0, val.length - 1).reduce((t, c, i) => {
              const v = t[c].children
              tempArray.push(this._getColumnData(v))
              return v
            }, this.listData)
          }
          var columnsData = [this.data.columnsData[0], ...tempArray]

          var compareIndex = this._getScrollCompareIndex(lastValue, val)
          if (compareIndex > -1) {
            let tempI = 1
            while (val[compareIndex + tempI] !== undefined) {
              val[compareIndex + tempI] = 0
              tempI++
            }
          }
          val = this._validate(val)
          this.data.lastValue = [...val]
          this.data.tempValue = [...val]
          this.setData({
            columnsData,
          })
      }
    },
    _validate(val) {
      const { columnsData } = this.data
      columnsData.forEach((v, i) => {
        if (columnsData[i].length - 1 < val[i]) {
          val[i] = columnsData[i].length - 1
        }
      })
      this.setData({
        value: val
      })
      return val
    },
    _bindpickend() {
      this.data.scrollEnd = true
    },
    _bindpickstart() {
      this.data.scrollEnd = false
    },
    _openPicker() {
      if (!this.data.isFirstOpen) {
        if (this.listData.length !== 0) {
          this._setDefault(this._computedBackData(this.data.backData))
        }
      }
      this.data.isFirstOpen = false
      this.setData({
        isOpen: true
      })
    },
    _closePicker() {
      this.setData({
        isOpen: false
      })
    },
    _getColumnData(arr) {
      return arr.map((v) => this._fomateObj(v))
    },
    _fomateObj(o) {
      const tempO = {}
      for (const k in o) {
        if (k !== 'children') {
          tempO[k] = o[k]
        }
      }
      return tempO
    },
    _getScrollCompareIndex(arr1, arr2) {
      let tempIndex = -1
      for (let i = 0, len = arr1.length; i < len; i++) {
        if (arr1[i] !== arr2[i]) {
          tempIndex = i
          break
        }
      }
      return tempIndex
    },
    _getIndexByIdOfObject(listData, idArr, key, arr) {
      if (!Array.isArray(listData)) return
      for (let i = 0, len = listData.length; i < len; i++) {
        if (listData[i][key] === idArr[arr.length][key]) {
          arr.push(i)
          return this._getIndexByIdOfObject(listData[i].children, idArr, key, arr)
        }
      }
    },
    _setDefault(inBackData) {
      const { scrollType } = this.scrollType
      let { listData, defaultPickData } = this
      const { lastValue } = this.data

      if (inBackData) {
        defaultPickData = inBackData
      }
      let backData = []
      switch (scrollType) {
        case 'normal':
          if (isPlainObject(listData[0][0])) {
            this.setData({
              isUseKeywordOfShow: true
            })
          }
          if (Array.isArray(defaultPickData) && defaultPickData.length > 0) {
            backData = listData.map((v, i) => v[defaultPickData[i]])
            this.data.tempValue = [...defaultPickData]
            this.data.lastValue = [...defaultPickData]
          } else {
            backData = listData.map((v) => v[0])
          }
          this.setData({
            columnsData: listData,
            backData: backData,
            value: defaultPickData
          })
          break
        case 'link':
          var columnsData = []
          if (Array.isArray(defaultPickData) && defaultPickData.length > 0 && defaultPickData.every((v, i) => isPlainObject(v))) {
            const key = this.data.onlyKey = Object.keys(defaultPickData[0])[0]
            const arr = []

            this._getIndexByIdOfObject(listData, defaultPickData, key, arr)

            defaultPickData = arr
            let tempI = 0
            do {
              lastValue.push(defaultPickData[tempI])
              columnsData.push(this._getColumnData(listData))
              listData = listData[defaultPickData[tempI]].children
              tempI++
            } while (listData)
            backData = columnsData.map((v, i) => v[defaultPickData[i]])
          } else {
            this.data.onlyKey = this.keyWordsOfShow || 'name'
            do {
              lastValue.push(0)
              columnsData.push(this._getColumnData(listData))
              listData = listData[0].children
            } while (listData)
            backData = columnsData.map((v) => v[0])
          }
          this.data.tempValue = [...defaultPickData]
          this.data.lastValue = [...defaultPickData]
          this.setData({
            isUseKeywordOfShow: true,
            columnsData,
            backData
          })
          setTimeout(() => {
            this.setData({
              value: defaultPickData
            })
          }, 0)
          break
      }
    },
    _computedBackData(backData) {
      const { scrollType, listData } = this
      const { onlyKey } = this.data
      if (scrollType === 'normal') {
        return backData.map((v, i) => listData[i].findIndex((vv, ii) => this._compareObj(v, vv)))
      } else {
        const t = backData.map((v, i) => {
          const o = {}
          o[onlyKey] = v[onlyKey]
          return o
        })

        return t
      }
    },
    _compareObj(o1, o2) {
      const { keyWordsOfShow } = this
      if (typeof o1 !== 'object') {
        return o1 === o2
      } else {
        return o1[keyWordsOfShow] === o2[keyWordsOfShow]
      }
    },
    _getBackDataFromValue(val) {
      let tempArr = []
      if (val.length > 0) {
        tempArr = this.data.columnsData.reduce((t, v, i) => {
          return t.concat(v[val[i]])
        }, [])
      } else {
        tempArr = this.data.columnsData.map((v, i) => v[0])
      }
      return tempArr
    },
    _compareDate() {
      const { defaultPickDataTemp, listDataTemp } = this.data
      const { defaultPickData, listData } = this

      return defaultPickDataTemp === defaultPickData && listDataTemp === listData
    },
    _setTempData() {
      const { defaultPickData, listData } = this
      this.data.defaultPickDataTemp = defaultPickData
      this.data.listDataTemp = listData
    }
  }
}
</script>

<style scoped>
/* picker/picker.wxss */
.full-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 9999;
  opacity: 0;
  background: rgba(0, 0, 0, .4);
  transition: all .4s ease-in-out 0;
  pointer-events: none;
}

.full-box.cur {
  opacity: 1;
  pointer-events: auto;
}

.modal {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: -50%;
  left: 0;
  background: transparent;
  transition: all .4s ease-in-out 0;
}

.picker {
  position: absolute;
  width: 100%;
  height: 235px;
  bottom: -235px;
  left: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: all .4s ease-in-out 0;
}

.cur .picker {
  bottom: 0;
}

.cur .modal {
  bottom: 50%;
}

.picker-line {
  display: flex;
  justify-content: center;
  align-items: center;
}

.picker-header {
  height: 20%;
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}

.picker-header view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.picker-header view text {
  font-size: 36rpx;
}

.picker-content {
  flex-grow: 1;
}

.line1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
