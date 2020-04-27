<template>
  <div class="el-title-container">
    <div :class="'title-size-'+size+' title-align-'+align"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'ElTitle',
    componentName: 'ElTitle',
    props: {
      style: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'h4' // h2/h3/h4
      },
      align: {
        type: String,
        default: 'left' // left/center/right
      }
    }
  };
</script>