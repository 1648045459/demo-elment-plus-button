
<template>
  <div class="contain">
    <el-button type="primary"> login </el-button>
  </div>
</template>

<script lang="ts" setup>
</script>
<style scoped>
.vercode-info {
  width: 100%;
  color: #67c23a;
  text-align: center;
}
.password-input :deep(.el-input--suffix .el-input__inner) {
  padding-right: 0px;
}
.password-input :deep(.el-input__suffix) {
  display: none;
}
</style>
