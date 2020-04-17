<template>
  <div class="el-cell-box-container" :class="{'full':full,'el-cell-box-margin':margin}">
    <div class="box-title" :class="'box-title-'+size"><span v-if="icon" class="title-icon">{{icon}}</span>{{title}}</div>
    <div class="box-content">
      <slot></slot>
    </div>
    <div class="box-error" v-if="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script>

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
      default: 'mini'
    },
    rules: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      errorMsg: null
    };
  },
  created() {
    this._initData();
  },
  methods: {
    _initData() {
      let ruleObj = this.rules.find(r=>r.isError);

      if (ruleObj) this.errorMsg = ruleObj.message;
      else this.errorMsg = null;
    }
  }
};

</script>