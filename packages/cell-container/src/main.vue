<template>
  <div class="el-cell-container">
    <div :class="{'el-cell-auto-container':auto, 'el-cell-auto-max-width-1': auto && cols == 1, 'el-cell-auto-max-width-2': auto && cols == 2, 'el-cell-auto-max-width-3': auto && cols == 3, 'el-cell-auto-max-width-4': auto && cols == 4, 'el-cell-2-cols-container':cols==2 && auto==false, 'el-cell-3-cols-container':cols==3 && auto==false, 'el-cell-4-cols-container':cols==4 && auto==false,'el-cell-1-cols-container': (cols == -1 || cols == 1) && auto==false }" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElCellContainer',
  componentName: 'ElCellContainer',
  props: {
    auto: {
      type: Boolean,
      default: true
    },
    cols: {
      type: Number,
      default: 1 // -1
    },
    model: Object,
    rules: Object
  },
  data() {
    return {
      fields: []
    };
  },
  created() {
    this._initEvent();
  },
  methods: {
    _initEvent() {
      this.$on('cell.container.addField', (field)=> {
        if (field) {
          this.fields.push(field);
        }
      });

      this.$on('cell.container.removeField', (field)=> {
        if (field.prop) {
          this.fields.splice(this.fields.indexOf(field), 1);
        }
      });
    },
    validate(cb) {
      let _this = this;
      return new window.Promise(function(resolve, reject) {
        if (!_this.model) {
          return;
        }

        let validatePass = true;
        let passCount = _this.fields.length;

        if (_this.fields.length === 0 && cb) {
          cb(true);
          return;
        }

        _this.fields.forEach(field=>{
          field.validate(pass=>{
            passCount--;
            if (!pass) validatePass = false;
          });
        });

        let intervalId = null;
        intervalId = setInterval(()=>{
          if (passCount === 0) {
            clearInterval(intervalId);
            cb(validatePass);
          }
        }, 150);
      });
    },
    resetFields() {
      let _this = this;
      if (!_this.model) {
        return;
      }
      _this.fields.forEach(field => {
        field.resetField();
      });
    }
  }
};
</script>