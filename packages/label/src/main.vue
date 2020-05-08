<template>
  <div>
    <slot><span v-if="icon && description">{{icon}}</span><span>{{description}}</span><span v-if="unit && description">{{unit}}</span></slot>
  </div>
</template>

<script>
  export default {
    name: 'ElLabel',
    componentName: 'ElLabel',
    props: {
      icon: {
        type: String,
        default: ''
      },
      value: '',
      unit: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'string' // string|number|money
      },
      dot: {
        type: Number | String,
        default: 2
      }
    },
    computed: {
      description() {
        if (this.value === null || this.value === undefined || this.value === '') {
          return '';
        } else if (this.type === 'string') {
          return this.value;
        } else {
          return this.transformData();
        }
      }
    },
    methods: {
      transformData() {
        try {
          if (this.type === 'money') {
            // 转换为带千分符字符
            let num = parseFloat(this.value).toFixed(parseInt(this.dot, 0));
            num = num.toString();
            let reg = /\d{1,3}(?=(\d{3})+$)/g;
            let num1 = num.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {return s1.replace(reg, '$&,') + s2;});
            return num1;
          } else if (this.type === 'number') {
            return parseFloat(this.value).toFixed(parseInt(this.dot, 0));
          }
        } catch (error) {
          console.log(`label格式转换发生错误 type:${this.type}, value:${this.value}`);
          return this.value;
        }
      }
    }
  };
</script>