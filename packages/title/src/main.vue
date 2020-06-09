<template>
  <div class="el-title-container">
    <div :class="'title-size-'+size+' title-align-'+align+ ' title-weight-'+weight"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'ElTitle',
    componentName: 'ElTitle',
    props: {
      size: {
        type: String,
        default: '2' // 1/2/3/4/5
      },
      align: {
        type: String,
        default: 'left' // left/center/right
      },
      weight: {
        type: String,
        default: 'regular' // blod/medium/regular
      }
    }
  };
</script>