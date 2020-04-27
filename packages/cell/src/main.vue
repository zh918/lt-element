<template>
  <div class="el-cell-box-container" :class="{'full':full,'el-cell-box-margin':margin}">
    <div class="box-title" :class="'box-title-'+size+' box-title-'+align"><span v-if="icon" class="title-icon">{{icon}}</span>{{title}}</div>
    <div class="box-content">
      <slot></slot>
    </div>
    <div class="box-error" v-if="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';

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
      default: 'left' // right/center/left
    }
  },
  data() {
    return {
      errorMsg: null
    };
  },
  created() {
    if (this.prop) {
      this.parentEl.$emit('cell.container.addField', this);
    }
  },
  computed: {
    parentEl() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'ElCellContainer') {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    }
  },
  methods: {
    validate(cb) {
      let _this = this;
      let rules = {};
      let key = null;

      if (this.prop.indexOf('.') !== -1) {
        let model = {};
        let tempModel = {};
        let tempRules = {};
        let propArray = this.prop.split('.');
        console.log('属性：', propArray);
        propArray.forEach(k=>{
          if (!key) {
            tempModel = this.parentEl.model[k];
            tempRules = this.parentEl.rules[k];
            console.log('---->', tempModel, tempRules);
          } else {
            tempModel = tempModel[k];
            tempRules = tempRules[k];
          }
          key = k;
        });
        model[key] = tempModel;
        rules[key] = tempRules;
        console.log('====>', model, rules);
        _validate(rules, model);
      } else {
        key = this.prop;
        rules = this.parentEl.rules[this.prop];

        let descriptor = {};
        descriptor[this.prop] = rules;

        if (!rules || rules.length === 0) {
          cb();
          return true;
        }

        const model = {};
        const parentElModel = this.parentEl.model;
        model[this.prop] = parentElModel[this.prop];

        _validate(descriptor, model);
      }

      function _validate(descriptor, model) {
        console.log(descriptor, model);
        const validator = new AsyncValidator(descriptor);
        validator.validate(model, {suppressWarning: true, first: true}, function(errors, invalidFields) {
          if (errors) {
            console.log(JSON.stringify(errors));
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
      this.errorMsg = '';
    }
  },
  beforeDestroy() {
    this.parentEl.$off('cell.container.removeField', this);
  }
};

</script>