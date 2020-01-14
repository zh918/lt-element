<template>
  <div class="cell-container-full" v-if="cols && cols=='full'">
    <div class="cell-value-full" >
      <div :class="'cell-label-full-'+labelWidth">{{label}}</div>
      <div class="cell-value">
        <slot>{{value}}</slot>
      </div>
    </div>
  </div>
  <div class="cell-container" v-else>
    <div class="no-full">
      <div :class="'cell-label-'+labelWidth">{{label}}</div>
      <div class="cell-value">
        <slot>{{value}}</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ElCell',
  componentName: 'ElCell',
  props: {
    label: String,
    value: String,
    labelWidth: {
      type: String,
      default: '3'
    },
    cols: String
  },
  data() {
    return {};
  },
  created() {
    this.$props.labelWidth ? this.$props.labelWidth : '1';
  },
  methods: {}
};
</script>