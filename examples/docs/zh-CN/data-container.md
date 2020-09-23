## Data Container 数据容器
用于高效快捷搭建页面基础结构

### 基础用法


:::demo 用于查询条件+列表+分页+其它操作按钮111

```html
<template> 
    <el-data-container ref="data-container-test1" :searchContainer="searchContainer" @search="handleSearch" :operatorContainer="operatorContainer" :tableContainer="tableContainer" @selectionChange="handleSelectionChange">
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
          loading: false,
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
            { key: 'date', type: 'date', class: '', placeholder: '开始日期', value: '', fetch: '', cb: ''},
            { key: 'month', type: 'month', class: '', placeholder: '月份', value: '', fetch: '', cb: ''},
            { key: 'monthrange', type: 'monthrange', class: '', placeholder: '月份范围', value: '', fetch: '', cb: ''},
            { key: 'date', type: 'daterange', class: '', placeholder: ['日期1','时期2'], value: '', fetch: '', cb: ''},
            { key: 'cascaderData', type: 'cascader', class: '', placeholder: '级联', value: '', fetch: '', cb: '',options: this.handleInitCascaderOption }
          ]
        },
        operatorContainer: [
          { type: 'primary', text: '新增', cb: this.handleAdd},
          { type: 'primary', text: '删除', cb: this.handleDel, isShow:()=>this.handleShow()},
          { type: 'upload', text: '手动导入工资代扣数据', cb: this.handleImport, progress:0}
        ],
        tableContainer: {
          selection: {
            width: '50'
          },
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
              prop: "chk1",
              label: "",
              width: "50px"
            },
            {
              prop: "chk2",
              label: "",
              width: "50px"
            },
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
            
          ]
        },
        // paginationContainer: {
        //   pageNum: 1,
        //   total: 1
        // }
      }
    },
    created() {
      setTimeout(()=>{
        this.tableContainer.data = [{
              moduleCode: '123',
              moduleName: '333'
            },
            {
              moduleCode: '444',
              moduleName: '555',
              isCheck: true
            }
      ];
      }, 1000 * 2.5);
    },
    methods: {
      handleSelectionChange(rows) {

        console.log('选中', rows);
      },
      handleGetSelection() {
        console.log('外层获取选中', this.tableContainer.data);
      },
      handleSearch(parms) {
        console.log('---', parms);
        setTimeout(()=>{
          this.searchContainer.loading = false;
        }, 2000)
      },
      handleAdd() {
        console.log('新增', this.tableContainer.data.filter(d=>d.isCheck))
      },
      handleDel(row) {
        console.log('删除', row)
      },
      handleImport() {
        console.log('导入')
      },
      handleShow() {
        return false;
      },
      handleInitCascaderOption(node) {
        if (node.level != 0) return Promise.resolve();
        return new Promise(function(resolve, reject) {
          let options = [{
                value: 'zhinan',
                label: '指南',
                emitPath: false,
                children: [{
                  value: 'shejiyuanze',
                  label: '设计原则',
                  children: [{
                    value: 'yizhi',
                    label: '一致'
                  }, {
                    value: 'fankui',
                    label: '反馈'
                  }, {
                    value: 'xiaolv',
                    label: '效率'
                  }, {
                    value: 'kekong',
                    label: '可控'
                  }]
                }, {
                  value: 'daohang',
                  label: '导航',
                  children: [{
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                  }, {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                  }]
                }]
              }, {
                value: 'zujian',
                label: '组件',
                children: [{
                  value: 'basic',
                  label: 'Basic',
                  children: [{
                    value: 'layout',
                    label: 'Layout 布局'
                  }, {
                    value: 'color',
                    label: 'Color 色彩'
                  }, {
                    value: 'typography',
                    label: 'Typography 字体'
                  }, {
                    value: 'icon',
                    label: 'Icon 图标'
                  }, {
                    value: 'button',
                    label: 'Button 按钮'
                  }]
                }, {
                  value: 'form',
                  label: 'Form',
                  children: [{
                    value: 'radio',
                    label: 'Radio 单选框'
                  }, {
                    value: 'checkbox',
                    label: 'Checkbox 多选框'
                  }, {
                    value: 'input',
                    label: 'Input 输入框'
                  }, {
                    value: 'input-number',
                    label: 'InputNumber 输入框'
                  }, {
                    value: 'select',
                    label: 'Select 选择器'
                  }, {
                    value: 'cascader',
                    label: 'Cascader 级联选择器'
                  }, {
                    value: 'switch',
                    label: 'Switch 开关'
                  }, {
                    value: 'slider',
                    label: 'Slider 滑块'
                  }, {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器'
                  }, {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器'
                  }, {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器'
                  }, {
                    value: 'upload',
                    label: 'Upload 上传'
                  }, {
                    value: 'rate',
                    label: 'Rate 评分'
                  }, {
                    value: 'form',
                    label: 'Form 表单'
                  }]
                }, {
                  value: 'data',
                  label: 'Data',
                  children: [{
                    value: 'table',
                    label: 'Table 表格',
                    leaf: true
                  }, {
                    value: 'tag',
                    label: 'Tag 标签'
                  }, {
                    value: 'progress',
                    label: 'Progress 进度条'
                  }, {
                    value: 'tree',
                    label: 'Tree 树形控件'
                  }, {
                    value: 'pagination',
                    label: 'Pagination 分页'
                  }, {
                    value: 'badge',
                    label: 'Badge 标记'
                  }]
                }, {
                  value: 'data-container',
                  label: '数据容器',
                  children: [
                    {
                      value: 'page-list',
                      label: '列表页'
                    }
                  ]
                }, {
                  value: 'notice',
                  label: 'Notice',
                  children: [{
                    value: 'alert',
                    label: 'Alert 警告'
                  }, {
                    value: 'loading',
                    label: 'Loading 加载'
                  }, {
                    value: 'message',
                    label: 'Message 消息提示'
                  }, {
                    value: 'message-box',
                    label: 'MessageBox 弹框'
                  }, {
                    value: 'notification',
                    label: 'Notification 通知'
                  }]
                }, {
                  value: 'navigation',
                  label: 'Navigation',
                  children: [{
                    value: 'menu',
                    label: 'NavMenu 导航菜单'
                  }, {
                    value: 'tabs',
                    label: 'Tabs 标签页'
                  }, {
                    value: 'breadcrumb',
                    label: 'Breadcrumb 面包屑'
                  }, {
                    value: 'dropdown',
                    label: 'Dropdown 下拉菜单'
                  }, {
                    value: 'steps',
                    label: 'Steps 步骤条'
                  }]
                }, {
                  value: 'others',
                  label: 'Others',
                  children: [{
                    value: 'dialog',
                    label: 'Dialog 对话框'
                  }, {
                    value: 'tooltip',
                    label: 'Tooltip 文字提示'
                  }, {
                    value: 'popover',
                    label: 'Popover 弹出框'
                  }, {
                    value: 'card',
                    label: 'Card 卡片'
                  }, {
                    value: 'carousel',
                    label: 'Carousel 走马灯'
                  }, {
                    value: 'collapse',
                    label: 'Collapse 折叠面板'
                  }]
                }]
              }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                  value: 'axure',
                  label: 'Axure Components'
                }, {
                  value: 'sketch',
                  label: 'Sketch Templates'
                }, {
                  value: 'jiaohu',
                  label: '组件交互文档'
                }]
              }];
              resolve(options);

        });
      }
    }
  }
</script>
```
:::
 



### 基础用法2 1111111


:::demo 用于查询条件+列表+分页+其它操作按钮

```html
<template> 
    <el-data-container :searchContainer="searchContainer1" @search="handleSearch" :operatorContainer="operatorContainer1" :tableContainer="tableContainer1" :paginationContainer="paginationContainer1" @hover="handleCellMouseEnter" @leave="handleCellMouseLeave">
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
            { key: 'name1', type: 'input', class: '', title: '姓名姓名姓名姓名姓名', placeholder: '姓名', value: '1', fetch: '', cb: '', size: 'xlarge'},
            // { key: 'name2', type: 'number', class: '', title: '年龄', placeholder: '年龄', value: '1', fetch: '', cb: ''},
            { key: 'name3', type: 'input', class: '', title: '其它1', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name4', type: 'input', class: '', title: '其它2', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name5', type: 'input', class: '', title: '其它3', placeholder: '姓名', value: '1', fetch: '', cb: '', size: 'xlarge'},

            { key: 'name6', type: 'input', class: '', title: '其它4', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name7', type: 'input', class: '', title: '其它其它5', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name8', type: 'input', class: '', title: '其它6', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name9', type: 'input', class: '', title: '下单开始时间7', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'month', type: 'month', class: '', placeholder: '月份', value: '', fetch: '', cb: ''},
            { key: 'monthrange', type: 'monthrange', class: '', placeholder: '月份范围', value: '', fetch: '', cb: ''},
            
          ]
        },
        operatorContainer1: [
          { type: 'primary', text: '新增', cb: this.handleAdd},
          { type: 'primary', text: '删除', cb: this.handleDel}
        ],
        tableContainer1: {
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
          pageNum: 1,
          total: 1
        }
      }
    },
    methods: {
      handleCellMouseEnter(events) {
        console.log("mhover1", events);
      },
      handleCellMouseLeave(events) {
        console.log("mleave1", events);
      },
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


### 基础用法3


:::demo 用于查询条件+列表+分页+其它操作按钮

```html
<template> 
    <el-data-container :searchContainer="searchContainer2" @search="handleSearch" :operatorContainer="operatorContainer2" :tableContainer="tableContainer2" :paginationContainer="paginationContainer2">
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
        searchContainer2: {
          isResetAutoSearch: false,
          displayType: 'title',
          itemSpan: 8,
          list: [
            { key: 'name1', type: 'input', class: '', title: '姓名', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name2', type: 'number', class: '', title: '年龄', placeholder: '年龄', value: '1', fetch: '', cb: ''},
            { key: 'name3', type: 'input', class: '', title: '其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name4', type: 'input', class: '', title: '其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name5', type: 'input', span: 12, class: '', title: '其它其它其它其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},

            { key: 'name6', type: 'input', class: '', title: '其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'name7', type: 'input', class: '', title: '其它其它', placeholder: '姓名', value: '1', fetch: '', cb: ''},
            { key: 'date', type: 'cascader', class: '', title: '级联11', value: '', fetch: '', cb: ''}

            
          ]
        },
        operatorContainer2: [
          { text: '新增', children: [
            { text: '新增1', cb: this.handleAdd },
            { text: '新增2', cb: this.handleAdd }
          ]},
          { text: '删除', cb: this.handleDel}
        ],
        tableContainer2: {
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
        paginationContainer2: {
          pageNum: 1,
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


### 列表数据页关键属性说明
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| searchContainer     | 查询条件对象，必填，内部结构要完整        | object | - | - |
| search     | 检索function        | function | - | - |
| operatorContainer     | 表格顶部操作按钮组对象 （可选）       | object | - | - |
| tableContainer     | 表格对象（必填）        | object | - | - |
| paginationContainer     | 分页对象（可选）        | object | - | - |


### searchContainer 页面查询条件对象
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| isResetAutoSearch     | 重置时是否触发检索        | boolean | true/false | left |
| displayType | 展现形式，title会把标题显示出来 | string | placeholder/title | placeholder |
| itemSpan | list下元素统一span; 选择权：itemSpan<list[n].span | number | 4/6/8 | 4 |
| list | 条件集合对象 | array | - | - |
|   [n].key | api对应字段 | string | - | - |
|   [n].type | 呈现类型 | string | input/number/select/date/autocomplete/cascader | - |
|   [n].title | 条件标题 | string | - |  |
|   [n].value | 条件值 | string/number | - | - |
|   [n].fetch | 用于autocomplete加载数据 | function | - | - |
|   [n].cb | 用于autocomplete操作回调 | function | - | - |
|   [n].span | 当前条件容器宽度（选择权：itemSpan<list[n].span） | number | 1-24 | - |
|   [n].size | displayType为title时，size为控制title宽度 | string | super/xlarge/large/medium/small | medium |


### operatorContainer 操作组
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|   text | 按钮文本 | string | - | - |
|   cb | 操作回调函数(可选) | function | - | - |
|   children | 下拉按钮时，下拉项数组[{text:'',cb:()=>{}}] | array | - | - |
|   isShow | 接收返回boolean类型函数，用于控制按钮呈现，非必填 | function | - | - |




### tableContainer 表格属性
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|   .operate | 加粗 | string | blod/medium/regular | medium |
|   .head | 加粗 | string | blod/medium/regular | medium |
|   .data | 加粗 | string | blod/medium/regular | medium |




### tableContainer.operate 
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|   .label | 列标题 | string | blod/medium/regular | medium |
|   .fixed | 浮动固定位置 | string | blod/medium/regular | medium |
|   .width | 宽度 | string | blod/medium/regular | medium |
|   .list | 操作 | string | blod/medium/regular | medium |
```html
注意：如果操作栏需要自定义，请放在模板中处理 <template slot="operate" slot-scope="row"></template>;
如果需要配置操作栏宽度，请初始化tableContainer.operate对象，并结合模板来达到目的
```


### tableContainer.head 列头
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|   .prop | 字段名称 | string | - | - |
|   .label | 列名 | string | - | - |
|   .width | 列宽（可选） | string | - | 180px |


### tableContainer.data 数据
```html
tableContainer.head列头中prop字段所组成的对象
```

### tableContainer.paginationContainer 翻页
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| .pageNum | 页码 | number | - | - |
| .total | 总条数 | number | - | - |
