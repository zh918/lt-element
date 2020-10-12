## InputNumber 数字相关文本框

仅允许输入标准的数字值，其它规则请在rules中进行自行校验

### 基础用法 int、float、money 不做任何限制----无表单验证

:::demo 要使用它，只需要在`el-input-number`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。
```html
<template>
  <div>
    <el-cell-container>
      <el-title>基本信息1</el-title>
      <el-cell title="整数">
        <el-input-number v-model="frm.intNumber"></el-input-number>
      </el-cell>
      <el-cell title="浮点">
        <el-input-number v-model="frm.intFloat" type="float" :tip="true" :dot="3"></el-input-number>
      </el-cell>
      <!-- <el-cell title="金额">
        <el-input-number v-model="frm.intMoney" type="money" :tip="true" :dot="3" unit="万元"></el-input-number>
      </el-cell> -->
      <el-cell title="大写金额">
        {{frm.intMoney}}
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
    created() {
      this.initData();
    },
    methods: {
      initData() {
        setTimeout(()=>{
          this.frm.intFloat = 88.88;
          this.frm.intMoney = 8888888.88;
        }, 1000 * 3)
      },
      handleSubmit() {
        let str = JSON.stringify(this.frm);
        alert(str);
      }
    }
  };
</script>
```
:::


### 基础用法 int、float、money 不做任何限制----表单验证1

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
          intNumber: 100,
          intFloat: 100.88,
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


### 基础用法 int、float、money 不做任何限制----表单验证2

:::demo 要使用它，只需要在`el-input-number`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。
```html
<template>
  <div>
    <el-cell-container ref="frm_validate2" :model="frm2" :rules="rules2">
      <el-title>基本信息</el-title>
      <el-cell icon="*" title="整数" prop="intNumber" v-if="flag.isShow">
        <el-input-number v-model="frm2.intNumber" type="money" :tip="true" unit="%"  :minusAble="true"></el-input-number>
      </el-cell>
      <el-cell icon="*" title="非必填浮点" prop="intFloat">
        <el-input-number v-model="frm2.intFloat" type="float" :tip="true" :dot="3" :disabled="true"></el-input-number>
      </el-cell>
    </el-cell-container>
  </div>
  <el-button @click="flag.isShow = !flag.isShow">切换显示状态</el-button>
  <el-button @click="handleValidateSubmit">获取文本框的值</el-button>
</template>
<script>
  export default {
    data() {
      return {
        flag: {
          isShow: true
        },
        frm2: {
          intNumber: null,
          intFloat: null,
        },
        rules2: {
          intNumber: [
            { type:'number', required: true, message: 'intNumber不能为空'},
          ],
          intFloat: [
            { type:'number', required: true, message: 'intFloat不能为空'},
          ]
        }
      };
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        // setTimeout(()=>{
        //   // this.frm2.intNumber = 11.33;
        //   this.frm2.intFloat = 234;
        // }, 1000 * 3)
      },
      handleValidateSubmit() {
        this.$refs["frm_validate2"].validate(flag=>{
          console.log(flag);
          // alert(flag);
        });
      }
    }
  };
</script>
```
:::

> 注意：input-number 不接受字符串值，只能接受值类型； input-number返回出来的值也是值类型，如果没有值，则返回null



### InputNumber Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| value / v-model    | 绑定值         | number | — |  |
| type      | 运行键入的类型 | int/float/money | — |  |
| tip      | 是否需要提示键入的内容 | boolean | true/false | false |
| unit      | tip打开时，需要显示的单位 | string | -|元|
| dot     | 当type为float或money时，可以指定小数点位数 | number | 1-9| 2|
| big     | 当type为money并且tip为true时，如果需要显示大写金额，则需要设置该值|boolean|true/false|false|
| disabled      | 是否禁用 | true/false | — | false |
| minusAble      | 是否允许输入符号 | true/false | — | false |
