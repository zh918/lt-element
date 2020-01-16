<template>
  <div class="cell-container-full" v-if="cols && cols=='full'">
    <div class="cell-value-full">
      <div :class="'cell-label-full-'+labelWidth">{{label}}</div>
      <div :class="'cell-value full-value-width-'+fullValueWidth">
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
      type: [String, Number],
      default: '1'
    },
    fullValueWidth: {
      type: [String, Number],
      default: '1'
    },
    cols: [String, Number]
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>