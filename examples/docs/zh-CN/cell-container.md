## Cell Container 布局列数容器
用于高效快捷搭建详情页面基础结构

### auto布局
:::demo 用于布局页面
```html 
<template> 
  <el-cell-container>
    <el-cell icon="*" title="身份证号码" :rules="rules.idNo">
      <el-input v-model='frm.idNo' placeholder='请输入内容' size='small'></el-input>
    </el-cell>
    <el-cell title="姓名" :rules="rules.des">
      <el-input v-model='frm.des' placeholder='请输入内容' size='small'></el-input>
    </el-cell>
    <el-cell title="其它信息" :full="true">
      <el-input v-model='frm.des' placeholder='请输入内容' size='small'></el-input>
    </el-cell>
  </el-cell-container>
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


### 指定列数布局1
:::demo 用于布局页面
```html 
<template> 
  <div>
    <el-cell-container :auto="false" :cols="2">
      <el-cell icon="*" title="身份证号码" :rules="rules.idNo">
        <el-input v-model='frm.idNo' placeholder='请输入内容' size='small'></el-input>
      </el-cell>
      <el-cell title="姓名" :rules="rules.des">
        <el-input v-model='frm.des' placeholder='请输入内容' size='small'></el-input>
      </el-cell>
      <el-cell title="其它信息" :full="true">
        <el-input v-model='frm.des' placeholder='请输入内容' size='small'></el-input>
      </el-cell>
    </el-cell-container>

    <el-cell-container :auto="false" :cols="2">
      <el-cell icon="*" title="身份证号码" :rules="rules.idNo">
        <el-input v-model='frm.idNo' placeholder='请输入内容' size='small'></el-input>
      </el-cell>
      <el-cell title="姓名" :rules="rules.des">
        <el-input v-model='frm.des' placeholder='请输入内容' size='small'></el-input>
      </el-cell>
      <el-cell title="其它信息" :full="true">
        <el-input v-model='frm.des' placeholder='请输入内容' size='small'></el-input>
      </el-cell>
    </el-cell-container>
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


### 指定列数布局 margin设置为false
:::demo 用于布局页面
```html 
<template> 
  <el-cell-container :auto="false" :cols="2">
    <el-cell title="有效期结束日期" :margin="false">
      {{a}}
    </el-cell>
    <el-cell title="姓名" :margin="false">
    </el-cell>
    <el-cell title="其它信息" :full="true" :margin="false">
      {{ccc}}
    </el-cell>
  </el-cell-container>
</template>

<script>
  export default {
    data() {
      return {
        a:2222,
        ccc: '当地时间14日，伊朗最大的口罩生产厂在厄尔布尔士省投产。从设计到开工共耗时24天。据伊朗媒体报道，这也是西亚地区最大的口罩生产厂，最高日产量可达400万只。为抗击疫情，目前此工厂生产的所有口罩都将提供给伊朗卫生部。',
        frm1: {
          idNo: '433234321234332213',
          des: '张三丰',
          other: '当地时间14日，伊朗最大的口罩生产厂在厄尔布尔士省投产。从设计到开工共耗时24天。据伊朗媒体报道，这也是西亚地区最大的口罩生产厂，最高日产量可达400万只。为抗击疫情，目前此工厂生产的所有口罩都将提供给伊朗卫生部。'
        },
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
| auto      | 根据容器大小，自动分列     | boolean | true/false | true |
| cols      | auto为false时，指定固定列数     | number | 1,2,3,4 | 1 |
| margin      | margin为false时，底部margin值设置为0；详情展示时需要设置为false，表单录入时默认即可     | boolean | true/false | true |
