## Cell 单列布局
用于高效快捷搭建页面基础结构

### 基础用法
 

:::demo 用于描述信息

```html 
<template> 
  <div style="overflow: hidden;">
    <el-cell icon="*" title="身份证号码" :rules="rules.idNo" size="medium">
      <el-input v-model='frm.idNo' placeholder='请输入内容' size='small'></el-input>
    </el-cell>
    <el-cell title="有效期结束日期日期日期" :rules="rules.des">
      <el-input v-model='frm.des' placeholder='请输入内容' size='small'></el-input>
    </el-cell>
    <el-cell title="其它" :full="true">
      <el-input v-model='frm.des' placeholder='请输入内容' size='small'></el-input>
    </el-cell>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        frm: {
          idNo: null,
          des: null,
          other: null
        },
        rules: {
          idNo: [
            { type:'required', required: true, message: '请输入活动名称', isError:true},
          ],
          des: [
            { type:'required', required: true, message: '请输入活动名称'},
          ]
        }
      };
    },
    methods: {}
  }
</script>

```
:::
 
 
### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon     | *号，前置符号           | string | — | — |
| title     | 标题           | string | — | — |
| rules | 校验规则数组 | array | [] |  |
| full | 是否整列 | boolean | true/false | false |
| size | title的宽度配置 | string | large / medium / small / mini | mini |
  