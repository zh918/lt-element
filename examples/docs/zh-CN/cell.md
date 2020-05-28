## Cell 单列布局
用于高效快捷搭建页面基础结构

### 基础用法
 
### auto自适应布局——表单

:::demo 适用于单页、dialog、及自定义
```html
<template>
  <div style="width:100%;height:100%;">
    <el-cell-container ref="frm_validate" :model="frm" :rules="rules"  :auto="false" :cols="2">
      <el-title>基本信息</el-title>

      <!-- <el-cell icon="*" title="姓名" prop="name">
        <el-input v-model='frm.name' placeholder='请输入姓名' size='small'></el-input>
      </el-cell>
      <el-cell icon="*" title="年龄" prop="age">
        <el-input v-model='frm.age' placeholder='请输入年龄'></el-input>
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
        <el-input v-model='frm.address' placeholder='请输入年龄'></el-input>
      </el-cell>
      
      <el-cell icon="*" title="担保人姓名" prop="otherObject.name">
        <el-input v-model='frm.otherObject.name' placeholder='请输入担保人姓名' size='small'></el-input>
      </el-cell> -->
      <el-cell icon="*" title="担保人电话" prop="otherObject.phone" :full="true">
        <el-input v-model='frm.otherObject.phone' placeholder='请输入担保人电话' size='small'></el-input>
      </el-cell>
      <el-cell icon="*" title="担保金额" prop="otherObject.money">
        <el-input-number v-model="frm.otherObject.money" type="money" placeholder='请输入担保金额' :tip="true" unit="元"></el-input-number>
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
          name: '张三丰',
          age: null,
          typeId: null,
          joinDate: null,
          address: null,
          otherObject: {
            name: '张三丰1',
            phone: null,
            money: null
          }
        },
        rules: {
          name: [
            { type:'string', required: true, message: '姓名不能为空'},
          ],
          typeId: [
            { type:'number', required: true, message: '证件类型不能为空'},
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
            ],
            money: [
              { type:'string', required: true, message: '担保金额不能为空'},
              {
                validator: (rule, value) => {
                  return new Promise((resolve, reject) => {
                    if (1 <= value && value <= 1000) {
                      resolve();
                    } else {
                      reject("担保金额范围1——1000");
                    }
                  });
                }
              }
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

 
 
### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon     | *号，前置符号           | string | — | — |
| title     | 标题           | string | — | — |
| full | 是否整列 | boolean | true/false | false |
| size | title的宽度配置 | string | large / medium / small / mini | small |
| prop | 【组合】model中需要校验的属性key | string | - | - |
| margin  | 【组合】表单录入时设置为true，详情展示时设置为false去除下间距           | boolean | true/false | true |
  