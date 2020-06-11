## Data Container 数据容器
用于高效快捷搭建页面基础结构

### 基础用法


:::demo 用于查询条件+列表+分页+其它操作按钮

```html
<template> 
    <el-data-container :searchContainer="searchContainer" @search="handleSearch" :operatorContainer="operatorContainer" :tableContainer="tableContainer" :paginationContainer="paginationContainer">
      <template slot="operate" slot-scope="row">
        <div>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              下拉查看1<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              下拉查看2
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
    </el-data-container> 
</template>

<script>
  export default {
    data() {
      return {
        searchContainer: {
          isResetAutoSearch: false,
          displayType: 'placeholder',
          itemSpan: 6,
          list: [
            { key: 'name1', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name2', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name3', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name4', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name5', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},

            { key: 'name6', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name7', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name8', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name9', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name10', type: 'input', class: '', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name11', type: 'input', class: '', placeholder: '姓名11', value: '1', fetch: '', cb: ''},


            { key: 'sex', type: 'select', class: '', placeholder: '请选择', value: '', fetch: '', cb: '', options: [
              { value: '选项1', label: '黄金糕1' },
              { value: '选项21', label: '黄金糕2' }
            ]},
            { key: 'date', type: 'date', class: '', placeholder: '开始日期', value: '', fetch: '', cb: ''}
          ]
        },
        operatorContainer: [
          { type: 'primary', text: '新增', cb: this.handleAdd},
          { type: 'primary', text: '删除', cb: this.handleDel}
        ],
        tableContainer: {
          selection:true,
          selectionChange: ()=>{},
          operate: {
            label: "操作",
            fixed: "right",
            width: "200px",
            list: [
              // {
              //   type: 'primary',
              //   label: '删除',
              //   cb: this.handleDel
              // }
            ]
          },
          head: [
            {
              prop: "moduleCode",
              label: "系统编号",
              width: "120px"
            },
            {
              prop: "moduleName",
              label: "系统名称"
            }
          ],
          data: [
            {
              moduleCode: '123',
              moduleName: '333'
            },
            {
              moduleCode: '444',
              moduleName: '555'
            }
          ]
        },
        paginationContainer: {
          currentPage: 1,
          total: 1
        }
      }
    },
    methods: {
      handleSearch(parms) {
        console.log('---', parms);
      },
      handleAdd() {
        console.log('新增')
      },
      handleDel(row) {
        console.log('删除', row)
      }
    }
  }
</script>
```
:::
 



### 基础用法2


:::demo 用于查询条件+列表+分页+其它操作按钮

```html
<template> 
    <el-data-container :searchContainer="searchContainer1" @search="handleSearch" :operatorContainer="operatorContainer1" :tableContainer="tableContainer1" :paginationContainer="paginationContainer1">
      <template slot="operate" slot-scope="row">
        <div>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              下拉查看1<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              下拉查看2
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
    </el-data-container> 
</template>

<script>
  export default {
    data() {
      return {
        searchContainer1: {
          isResetAutoSearch: false,
          displayType: 'title',
          itemSpan: 8,
          list: [
            { key: 'name1', type: 'input', class: '', title: '姓名', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name2', type: 'number', class: '', title: '年龄', placeholder: '年龄', value: '1', fetch: '', cb: ''},
            { key: 'name3', type: 'input', class: '', title: '其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name4', type: 'input', class: '', title: '其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name5', type: 'input', class: '', title: '其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},

            { key: 'name6', type: 'input', class: '', title: '其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name7', type: 'input', class: '', title: '其它其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name8', type: 'input', class: '', title: '其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name9', type: 'input', class: '', title: '下单开始时间', placeholder: '姓名', value: '1', fetch: '', cb: ''},

            
          ]
        },
        operatorContainer1: [
          { type: 'primary', text: '新增', cb: this.handleAdd},
          { type: 'primary', text: '删除', cb: this.handleDel}
        ],
        tableContainer1: {
          selection:true,
          selectionChange: ()=>{},
          operate: {
            label: "操作",
            fixed: "right",
            width: "200px",
            list: [
              // {
              //   type: 'primary',
              //   label: '删除',
              //   cb: this.handleDel
              // }
            ]
          },
          head: [
            {
              prop: "moduleCode",
              label: "系统编号",
              width: "120px"
            },
            {
              prop: "moduleName",
              label: "系统名称"
            }
          ],
          data: [
            {
              moduleCode: '123',
              moduleName: '333'
            },
            {
              moduleCode: '444',
              moduleName: '555'
            }
          ]
        },
        paginationContainer1: {
          currentPage: 1,
          total: 1
        }
      }
    },
    methods: {
      handleSearch(parms) {
        console.log('---', parms);
      },
      handleAdd() {
        console.log('新增')
      },
      handleDel(row) {
        console.log('删除', row)
      }
    }
  }
</script>
```
:::
