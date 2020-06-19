## InputNumber 数字相关文本框

仅允许输入标准的数字值，其它规则请在rules中进行自行校验

### 基础用法 int、float、money 不做任何限制----无表单验证

:::demo 要使用它，只需要在`el-input-number`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。
```html
<template>
  <div>
    <el-cell-container>
      <el-title>基本信息</el-title>
      <el-cell title="整数">
        <el-input-number v-model="frm.intNumber" :tip="true" unit="%"></el-input-number>
      </el-cell>
      <el-cell title="浮点">
        <el-input-number v-model="frm.intFloat" type="float" :tip="true" :dot="3"></el-input-number>
      </el-cell>
      <el-cell title="金额">
        <el-input-number v-model="frm.intMoney" type="money" :tip="true" :dot="3" unit="万元"></el-input-number>
      </el-cell>
      <el-cell title="大写金额">
        <el-input-number v-model="frm.intMoney" type="money" :big="true" :tip="true" :dot="3" unit="万元"></el-input-number>
      </el-cell>
    </el-cell-container>
  </div>
  
  <el-button @click="handleSubmit">获取文本框的值</el-button>
</template>
<script>
  export default {
    data() {
      return {
        frm: {
          intNumber: null,
          intFloat: null,
          intMoney: null,
        }
      };
    },
    methods: {
      handleSubmit() {
        let str = JSON.stringify(this.frm);
        alert(str);
      }
    }
  };
</script>
```
:::


### 基础用法 int、float、money 不做任何限制----表单验证

:::demo 要使用它，只需要在`el-input-number`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。
```html
<template>
  <div>
    <el-cell-container ref="frm_validate" :model="frm1" :rules="rules">
      <el-title>基本信息</el-title>
      <el-cell icon="*" title="整数" prop="intNumber">
        <el-input-number v-model="frm1.intNumber" :tip="false" unit="%"></el-input-number>
      </el-cell>
      <el-cell title="非必填浮点" prop="intFloat">
        <el-input-number v-model="frm1.intFloat" type="float" :tip="true" :dot="3"></el-input-number>
      </el-cell>
    </el-cell-container>
  </div>
  
  <el-button @click="handleValidateSubmit">获取文本框的值</el-button>
</template>
<script>
  export default {
    data() {
      return {
        frm1: {
          intNumber: null,
          intFloat: null,
        },
        rules: {
          intNumber: [
            {
              validator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (value <= 100) {
                    reject("金额不能小于100，不能大于1000"); 
                  } else if (value >= 1000) {
                    reject("金额不能小于100，不能大于1000"); 
                  } else {
                    resolve();
                  }
                });
              }
            }
          ],
          intFloat: [
            {
              validator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (!value) {
                    resolve();
                  } else if (1 <= value && value <= 100) {
                    resolve();
                  } else {
                    reject("范围1-100"); 
                  }
                });
              }
            }
          ]
        }
      };
    },
    methods: {
      handleValidateSubmit() {
        this.$refs["frm_validate"].validate(flag=>{
          console.log(flag);
          alert(flag);
        });
      }
    }
  };
</script>
```
:::






### InputNumber Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| value / v-model    | 绑定值         | number | — |  |
| type      | 运行键入的类型 | int/float/money | — |  |
| tip      | 是否需要提示键入的内容 | boolean | true/false | false |
| unit      | tip打开时，需要显示的单位 | string | -|元|
| dot     | 当type为float或money时，可以指定小数点位数 | number | 1-9| 2|
| big     | 当type为money并且tip为true时，如果需要显示大写金额，则需要设置该值|boolean|true/false|false|