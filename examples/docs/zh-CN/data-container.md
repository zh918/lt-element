## Data Container 数据容器
用于高效快捷搭建页面基础结构

### 基础用法
 

:::demo 用于查询条件+列表+分页+其它操作按钮

```html
<template> 
    <el-data-container :searchContainer="searchContainer" @search="handleSearch">
      
    </el-data-container> 
</template>

<script>
  export default {
    data() {
      return {
        searchContainer: {
          isResetAutoSearch: false,
          list: [
            { type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: '', span: ''},
            { type: 'select', class: '', placeholder: '请选择', value: '', fetch: '', cb: '', span: '', options: [
              { value: '选项1', label: '黄金糕1' },
              { value: '选项21', label: '黄金糕2' }
            ]},
            { type: 'date', class: '', placeholder: '开始日期', value: '', fetch: '', cb: '', span: ''}
          ],
          btn: {
            span: 8,
            offset: 6
          }
        },
        operatorContainer: [],
        tableContainer: [],
        paginationContainer: []
      }
    },
    methods: {
      handleSearch(parms) {
        console.log('---', parms);
      }
    }
  }
</script>
```
:::
 
