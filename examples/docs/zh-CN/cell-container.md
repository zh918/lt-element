## Cell Container 布局列数容器
用于高效快捷搭建详情页面基础结构

### auto自适应布局——表单

:::demo 适用于单页、dialog、及自定义
```html
<template>
  <div style="width:100%;height:100%;">
    <el-cell-container ref="frm_validate" :model="frm" :rules="rules">
      <el-title>基本信息</el-title>

      <el-cell icon="*" title="姓名" prop="name">
        <el-input v-model='frm.name' placeholder='请输入姓名' size='small'></el-input>
      </el-cell>
      <el-cell icon="*" title="年龄" prop="age">
        <el-input v-model='frm.age' placeholder='请输入年龄' size='small'></el-input>
      </el-cell>
      <el-cell icon="*" title="证件类型" prop="typeId">
        <el-select v-model="frm.typeId" placeholder="请选择证件类型"  size='small'>
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-cell>
      
      <el-cell icon="*" title="加入日期" prop="joinDate">
        <el-date-picker
          size='small'
          v-model="frm.joinDate"
          type="date"
          placeholder="选择加入日期">
        </el-date-picker>
      </el-cell>
      <el-cell icon="*" title="地址" prop="address" :full="true">
        <el-input v-model='frm.address' placeholder='请输入年龄' size='small'></el-input>
      </el-cell>
      
      <el-cell icon="*" title="担保人姓名" prop="otherObject.name">
        <el-input v-model='frm.otherObject.name' placeholder='请输入担保人姓名' size='small'></el-input>
      </el-cell>
      <el-cell icon="*" title="担保人电话" prop="otherObject.phone">
        <el-input v-model='frm.otherObject.phone' placeholder='请输入担保人电话' size='small'></el-input>
      </el-cell>
    </el-cell-container>

    <div>
      <el-button size="mini" @click="handleReset">重置</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeList: [
          {label: '身份证', value: 0},
          {label: '护照', value: 1}
        ],
        frm: {
          name: null,
          age: null,
          typeId: null,
          joinDate: null,
          address: null,
          otherObject: {
            name: null,
            phone: null
          }
        },
        rules: {
          name: [
            { type:'string', required: true, message: '姓名不能为空'},
          ],
          age: [
            { type:'string', required: true, message: '年龄不能为空'},
            {
              validator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (value < 18) {
                    reject("不能小于18岁"); 
                  } else if (value > 90) {
                    reject("年龄太大，不适合");
                  } else {
                    resolve();
                  }
                });
              }
            }
          ],
          joinDate: [
            { type:'date', required: true, message: '加入日期不能为空'},
          ],
          address: [
            { type:'string', required: true, message: '地址不能为空'}
          ],
          otherObject: {
            name: [
              { type:'string', required: true, message: '担保人姓名不能为空'},
            ],
            phone: [
              { type:'string', required: true, message: '担保人电话不能为空'},
              { type:'string', len: 11, message: '担保人电话只能是11位'},
            ]
          }
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs["frm_validate"].validate(flag=>{
          console.log(flag);
          alert(flag);
        });
      },
      handleReset() {
        this.$refs["frm_validate"].resetFields();
      }
    }
  }
</script>
```
:::

### auto自适应布局——详情展示

:::demo 适用于单页、dialog、及自定义
```html
<template>
  <div>
    <el-cell-container>
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

### 固定列数布局——表单

:::demo 适用于单页、dialog、及自定义
```html
<template>
  <div>
    <el-cell-container ref="frm2_validate" :model="frm2" :rules="rules2" :auto="false" :cols="1">
      <el-title align="right">基本信息</el-title>
      <el-cell icon="*" title="姓名" prop="name">
        <el-input v-model='frm2.name' placeholder='请输入姓名' size='small'></el-input>
      </el-cell>
      <el-cell icon="*" title="年龄" prop="age">
        <el-input v-model='frm2.age' type="number" placeholder='请输入年龄' size='small'></el-input>
      </el-cell>
      <el-cell icon="*" title="证件类型" prop="typeId">
        <el-select v-model="frm2.typeId" placeholder="请选择证件类型"  size='small'>
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-cell>
      <el-cell icon="*" title="加入日期" prop="joinDate">
        <el-date-picker
          size='small'
          v-model="frm2.joinDate"
          type="date"
          placeholder="选择加入日期">
        </el-date-picker>
      </el-cell>
      <el-cell icon="*" title="地址" prop="address" :full="true">
        <el-input v-model='frm2.address' placeholder='请输入年龄' size='small'></el-input>
      </el-cell>
  
      <el-cell icon="*" title="担保人姓名" prop="otherObject.name">
        <el-input v-model='frm2.otherObject.name' placeholder='请输入担保人姓名' size='small'></el-input>
      </el-cell>
      <el-cell icon="*" title="担保人电话" prop="otherObject.phone">
        <el-input v-model='frm2.otherObject.phone' placeholder='请输入担保人电话' size='small'></el-input>
      </el-cell>
    </el-cell-container>

    <div>
      <el-button size="mini" @click="handleReset">重置</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeList: [
          {label: '身份证', value: 0},
          {label: '护照', value: 1}
        ],
        frm2: {
          name: null,
          age: null,
          typeId: null,
          joinDate: null,
          address: null,
          otherObject: {
            name: null,
            phone: null
          }
        },
        rules2: {
          name: [
            { type:'string', required: true, message: '姓名不能为空'},
          ],
          age: [
            { type:'string', required: true, message: '年龄不能为空'},
            {   
              validator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (value < 18) {
                    reject("不能小于18岁");  // reject with error message
                  } else if (value > 90) {
                    reject("年龄太大，不适合");
                  } else {
                    resolve();
                  }
                });
              }
            }
          ],
          joinDate: [
            { type:'date', required: true, message: '加入日期不能为空'},
          ],
          address: [
            { type:'string', required: true, message: '地址不能为空'}
          ],
          otherObject: {
            name: [
              { type:'string', required: true, message: '担保人姓名不能为空'},
            ],
            phone: [
              { type:'string', required: true, message: '担保人电话不能为空'},
              { type:'string', len: 11, message: '担保人电话只能是11位'},
            ]
          }
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs["frm2_validate"].validate(flag=>{
          console.log(flag);
          alert(flag);
        });
      },
      handleReset() {
        this.$refs["frm2_validate"].resetFields();
      }
    }
  }
</script>
```
:::

### 固定列数布局——详情展示

:::demo 适用于单页、dialog、及自定义
```html
<template>
  <div>
    <el-cell-container  :auto="false" :cols="2">
      <el-title>基本信息</el-title>
      <el-cell title="姓名" :margin="false" align="right">
        <el-label :value="frm3.name"></el-label>
      </el-cell>
      <el-cell title="年龄" :margin="false" align="right">
        <el-label :value="frm3.age"></el-label>
      </el-cell>
      <el-cell title="证件类型" :margin="false" align="right">
        <el-label :value="frm3.typeId"></el-label>
      </el-cell>
      <el-cell title="入伙时间" :margin="false" align="right">
        <el-label :value="frm3.joinDate"></el-label>
      </el-cell>
      <el-cell title="总价1" :margin="false" align="right">
        <el-label :value="frm3.total" icon="￥" unit="元" dot="3"></el-label>
      </el-cell>
      <el-cell title="总价2" :margin="false" align="right">
        <el-label :value="frm3.total" icon="$" unit="万元" type="money"></el-label>
      </el-cell>
      <el-cell title="详细地址" :full="true" :margin="false" align="right">
        <el-label :value="frm3.address"></el-label>
      </el-cell>
      <el-cell title="担保人" :margin="false" align="right">
        <el-label :value="frm3.otherObject.name"></el-label>
      </el-cell>
      <el-cell title="担保人电话" :margin="false" align="right">
        <el-label :value="frm3.otherObject.phone"></el-label>
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
        frm3: {
          name: '张三丰',
          age: 118,
          typeId: 1,
          joinDate: '1902-05-01',
          address: '中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边中国武当山山顶第99棵松树旁边',
          total: 15000088.62,
          otherObject: {
            name: '张无忌',
            phone: 18888888888
          }
        }
      };
    }
  }
</script>
```
:::

  
### cell-container Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| auto      | 根据容器大小，自动分列     | boolean | true/false | true |
| cols      | auto为false时，指定固定列数     | number | 1,2,3,4 | 1 |
| model     | 【数据校验】处理表单时需要指定数据对象     | object | - | - |
| rules     | 【数据校验】表单校验规则对象     | object | - | - |

### cell Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon     | *号，前置符号           | string | — | — |
| title     | 标题           | string | — | — |
| full | 是否整列 | boolean | true/false | false |
| size | title的宽度配置 | string | large / medium / small / mini | small |
| align | title的对齐方式 | right/center/left | left |
| prop | 【组合】model中需要校验的属性key | string | - | - |
| margin  | 【组合】表单录入时设置为true，详情展示时设置为false去除下间距           | boolean | true/false | true |

### label Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon      | 前置符号，比如￥     | string | 任意字符串 | - |
| value      | 显示内容     | string/number | 任意字符串或数字 | - |
| unit      | 后置符号，比如 元     | string | 任意字符串 | - |
| type      | 内容展示类型     | string | string|number|money | string |
| dot      | type为number|money时，指定小数位数     | string/number | 1-9 | 2 |
