<template>
  <div class="el-cell-box-container" :class="classObj">
    <div class="box-title" :class="'box-title-'+size+' box-title-'+align"><span v-if="icon" class="title-icon">{{icon}}</span>{{title}}</div>
    <div class="box-content">
      <slot></slot>
    </div>
    <div class="box-error" v-if="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import { getPropByPath } from 'lt-element/src/utils/util';

export default {
  name: 'ElCell',
  componentName: 'ElCell',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    full: {
      type: Boolean,
      default: false
    },
    margin: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'small'
    },
    prop: {
      type: String || Object,
      default: null
    },
    align: {
      type: String,
      default: 'right' // right/center/left
    }
  },
  data() {
    return {
      errorMsg: null,
      initValue: null,
      validateDisabled: false
    };
  },
  created() {
    if (this.prop) {
      this.parentEl.$emit('cell.container.addField', this);
    }
  },
  mounted() {
    if (this.prop && this.parentEl.model) {
      let p = getPropByPath(this.parentEl.model, this.prop, true);
      this.initValue = p.v;
    }
  },
  computed: {
    parentEl() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      if (!parentName) return null;
      while (parentName !== 'ElCellContainer') {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    classObj() {
      let fullClass = `full-${this.parentEl.cols}`;
      let classObject = {
        'el-cell-box-margin': this.margin
      };
      classObject[fullClass] = this.full;
      return classObject;
    },
    currentValue() {
      if (this.parentEl && this.parentEl.model && this.prop) {
        // 方法一
        // if (this.$props.prop.indexOf('.') !== -1) {
        //   let propArray = this.$props.prop.split('.');
        //   let tempModel = this.parentEl.model[propArray[0]];
        //   let attrObj = {};
        //   let returnModel = {};

        //   for (let k in tempModel) {
        //     if (k === propArray[1]) {
        //       attrObj.k = tempModel[k];
        //     }
        //   }

        //   returnModel[propArray[0]] = attrObj;
        //   return {...returnModel};
        // } else {
        //   return this.parentEl.model[this.$props.prop];
        // }

        // 方法二
        let p = getPropByPath(this.parentEl.model, this.prop, true);
        return p.v;
      } else {
        return null;
      }
    }
  },
  watch: {
    currentValue: {
      handler(val) {
        if (!this.validateDisabled) {
          this.validate(()=>{});
        } else {
          this.validateDisabled = false;
        }
      },
      deep: true
    }
  },
  methods: {
    validate(cb) {
      let _this = this;
      let rules = {};
      let key = null;
      let parent = this.$parent;
      let isShow = parent.$children.some(p => p.prop === this.prop);
      if (!isShow) {
        cb(true);
        return true;
      }

      if (this.prop && this.prop.indexOf('.') !== -1) {
        let model = {};
        let tempModel = {};
        let tempRules = {};
        let propArray = this.prop.split('.');
        // console.log('属性：', propArray);
        propArray.forEach(k=>{
          if (!key) {
            tempModel = this.parentEl.model[k];
            tempRules = this.parentEl.rules[k];
            // console.log('---->', tempModel, tempRules);
          } else {
            tempModel = tempModel[k];
            tempRules = tempRules[k];
          }
          key = k;
        });
        model[key] = tempModel;
        rules[key] = tempRules;
        // console.log('====>', model, rules);
        _validate(rules, model);
      } else {
        key = this.prop;
        rules = this.parentEl.rules[this.prop];

        let descriptor = {};
        descriptor[this.prop] = rules;

        if (!rules || rules.length === 0) {
          cb(true);
          return true;
        }

        const model = {};
        const parentElModel = this.parentEl.model;
        model[this.prop] = parentElModel[this.prop];
        _validate(descriptor, model);
      }

      function _validate(descriptor, model) {
        // console.log(descriptor, model);
        const validator = new AsyncValidator(descriptor);
        validator.validate(model, {suppressWarning: true, first: true}, function(errors, invalidFields) {
          if (errors) {
            _this.errorMsg = errors[0].message;
            cb(false);
          } else {
            _this.errorMsg = '';
            cb(true);
          }
        });
      }
    },
    resetField() {
      this.validateDisabled = true;
      this._clear();
      this.$nextTick(()=>{
        this.errorMsg = '';
      });
    },
    _clear() {
      let model = this.parentEl.model;
      let props = getPropByPath(model, this.prop, true);
      props.o[props.k] = this.initValue;
    }
  },
  beforeDestroy() {
    this.parentEl.$off('cell.container.removeField', this);
  }
};

</script>