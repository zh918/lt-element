<template>
  <div class="el-cell-container"> 
    <div :class="{'el-cell-auto-container':auto,'el-cell-1-cols-container':cols==1,'el-cell-2-cols-container':cols==2,'el-cell-3-cols-container':cols==3,'el-cell-4-cols-container':cols==4,'el-cell-1-cols-container':cols==-1&&auto==false}" >
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
      default: -1
    }
  },
  created() {

  },
  methods: {
  }
};
</script>

<!-- <template>
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
</script> -->