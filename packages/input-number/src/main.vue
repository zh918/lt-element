<template>
  <div class="el-input-number el-input--small">
     <input
      class="el-input__inner"
      type="text"
      ref="inputNumber"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
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
      }
    },
    data() {
      return {
        currentValue: ''
      };
    },
    mounted() {
      let input = this.$refs.inputNumber;
      input.value = this.value;
    },
    methods: {
      handleInput(val) {
        let input = this.$refs.inputNumber;

        if (!val) {
          this.currentValue = '';
        } else {
          this.currentValue = input.value;
        }

        this.$emit('input', this.currentValue);
      },
      handleFocus() {

      },
      handleBlur() {

      },
      handleChange() {
        console.log('change');
      }
    }
  };
</script>