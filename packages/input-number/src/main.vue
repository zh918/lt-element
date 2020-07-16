<template>
  <div class="el-input-number el-input--small" :class="{'el-input is-disabled': disabled}">
     <input
      v-if="disabled"
      class="el-input__inner"
      type="text"
      ref="inputNumber"
      :placeholder="placeholder"
      disabled="disabled"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <input
      v-else
      class="el-input__inner"
      type="text"
      ref="inputNumber"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <div class="input-format-money-container" v-if="tip && value">{{currentFormatValue}}{{unit}}</div>
  </div>
</template>

<script>
  export default {
    name: 'ElInputNumber',
    componentName: 'ElInputNumber',
    props: {
      type: {
        type: String,
        default: 'int' // int float money
      },
      value: [String, Number],
      size: {
        type: String,
        default: 'small'
      },
      unit: {
        type: String,
        default: '元'
      },
      tip: {
        type: Boolean,
        default: false
      },
      dot: {
        type: Number,
        default: 2
      },
      big: {
        type: Boolean,
        default: false
      },
      placeholder: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentValue: '',
        currentFormatValue: ''
      };
    },
    mounted() {
      let input = this.$refs.inputNumber;
      input.value = this.value;
      this.currentValue = this.value;
      this._formatValue();
    },
    watch: {
      value(val) {
        let input = this.$refs.inputNumber;
        // console.log('--->', val);
        if (val === '' || val === null) {
          this.currentValue = '';
          input.value = '';
        } else {
          this.currentValue = val;
          this._formatValue();
          input.value = this._tranValue(this.currentValue);
        }
      }
    },
    methods: {
      handleInput(val) {
        let input = this.$refs.inputNumber;
        if (val.data === null) {
          // del 键
          this.currentValue = input.value;
          this._formatValue();
          this.$emit('input', this._tranValue(this.currentValue));
          return;
        }
        let code = val.data.charCodeAt();
        if ((this.type === 'float' || this.type === 'money') && (code === 46 || (code <= 57 && code >= 48))) {
          if (this.currentValue && this.currentValue.toString().indexOf('.') !== -1 && code === 46) {
            input.value = this._tranValue(this.currentValue);
            return;
          }
          this.currentValue = input.value;
          this._formatValue();
          this.$emit('input', this._tranValue(this.currentValue));
        } else if (this.type === 'int' && (code <= 57 && code >= 48)) {
          this.currentValue = input.value;
          this._formatValue();
          this.$emit('input', this._tranValue(this.currentValue));
        } else {
          input.value = this._tranValue(this.currentValue);
          return;
        }
      },
      handleFocus() {

      },
      handleBlur() {

      },
      handleChange(event) {
        // this.$emit('change', event.target.value);
      },
      _tranValue(val) {
        if (val === null || val === undefined || val === '') {
          return null;
        } else {
          return Number(val);
        }
      },
      _formatValue() {
        let num = Number(this.currentValue);
        let temp = parseFloat(num).toFixed(this.dot);

        if (this.type === 'float') {
          this.currentFormatValue = temp;
        } else if (this.type === 'money') {
          if (this.big) {
            this.currentFormatValue = '大写金额，有待实现';
          } else {
            const reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
            this.currentFormatValue = temp.replace(reg, '$1,');
          }
        } else {
          this.currentFormatValue = this.currentValue;
        }
      }
    }
  };
</script>