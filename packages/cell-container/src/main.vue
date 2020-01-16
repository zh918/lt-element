<template>
  <div :class="'el-cell-container-'+cols">
    <slot></slot>
  </div>
</template> 
<script>
export default {
  name: 'ElCellContainer',
  componentName: 'ElCellContainer',
  props: {
    cols: {
      type: [String, Number],
      default: '1'
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>