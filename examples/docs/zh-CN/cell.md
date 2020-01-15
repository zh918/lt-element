## Cell 单列布局
用于高效快捷搭建页面基础结构

### 基础用法
 

:::demo 用于描述信息

```html
<template> 
    <el-cell label='姓名：' :value='value'>
      <!-- <template>
          <el-input class='cell-input' v-model='value' placeholder='请输入内容' size='small'></el-input>
      </template> -->
    </el-cell>
     <el-cell label='姓名：' :value='value'>
      <!-- <template>
          <el-input class='cell-input' v-model='value' placeholder='请输入内容' size='small'></el-input>
      </template> -->
    </el-cell>
</template>

<script>
  export default {
    data() {
      return {
        value:'张三'
      }
    },
    methods: {
      
    }
  }
</script>

```
:::
 
 
### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label     | 声明标题           | string | — | — |
| value     | 声明内容           | string | — | — |
| label-width | 声明标题的宽度 | string | 1/2/3/4 | 1 |
| cols      | 是否独占一行 | string | full | - |