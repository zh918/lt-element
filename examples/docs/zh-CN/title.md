## Title 板块标题
用于板块最上面

:::demo 适用于详情页
```html
<template>
  <div>
    <el-cell-container  :auto="false" :cols="2">
      <el-title >基本信息</el-title>
      <el-title align="center">基本信息</el-title>
      <el-title align="right">基本信息</el-title>
    </el-cell-container>

    <div>
      <el-button size="mini">返回</el-button>
    </div>
  </div>
</template>


```
:::

 
 
### title Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| size     | 字体大小    | number | 1/2/3/4/5 | 4 |
| align     | 对齐方式        | string | left/center/right | left |
| weight | 加粗 | string | blod/medium/regular | medium |
