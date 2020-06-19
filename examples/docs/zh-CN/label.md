## Label 字段显示
用于el-cell中显示字段值，该组件具有数字处理能力

:::demo 适用于单页、dialog、及自定义
```html
<template>
  <div>
    <el-cell-container  :auto="true" :cols="2">
      <el-title align="center">基本信息</el-title>

      <el-cell title="姓名">
        <el-label :value="frm1.name"></el-label>
      </el-cell>
      <el-cell title="年龄">
        <el-label :value="frm1.age"></el-label>
      </el-cell>
      <el-cell title="证件类型">
        <el-label :value="frm1.typeId"></el-label>
      </el-cell>
      <el-cell title="入伙时间">
        <el-label :value="frm1.joinDate"></el-label>
      </el-cell>
      <el-cell title="总价1">
        <el-label :value="frm1.total" icon="￥" unit="元" dot="3"></el-label>
      </el-cell>
      <el-cell title="总价2">
        <el-label :value="frm1.total" icon="$" unit="万元" type="money"></el-label>
      </el-cell>
      <el-cell title="详细地址" :full="true">
        <el-label :value="frm1.address"></el-label>
      </el-cell>
      <el-cell title="担保人">
        <el-label :value="frm1.otherObject.name"></el-label>
      </el-cell>
      <el-cell title="担保人电话">
        <el-label :value="frm1.otherObject.phone"></el-label>
      </el-cell>
    </el-cell-container>

    <div>
      <el-button size="mini">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        frm1: {
          name: null,
          age: null,
          typeId: null,
          joinDate: null,
          address: null,
          total: null,
          otherObject: {
            name: null,
            phone: null
          }
        }
      };
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        let _this = this;
        setTimeout(()=>{
          let result = {
            name: '张三丰',
            age: 118,
            typeId: 1,
            joinDate: '1902-05-01',
            address: '中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边',
            total: 15000088.62,
            otherObject: {
              name: '张无忌',
              phone: '18888888888'
            }
          };

          _this.frm1 = result;
        },1000 * 3)
      }
    }
  }
</script>
```
:::

 
 
### lable Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon     | 前置符号，比如￥,$           | string | — |  |
| value     | 需要呈现的原始值           | string/number | — | — |
| unit | 尾部单位，比如 元，万元，个 | string |  |  |
| type | value的处理方式,money方式时，会带出千分符 | string | string/number/money | string |
| dot | 保留小数位数 | number | 0-4 | 2 |
 