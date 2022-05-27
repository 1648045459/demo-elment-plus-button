
<template>
  <div class="page-footer" :class="!isMobile ? 'border-yes' : 'border-no'">
    ©2022 Created by netwarps
  </div>
</template>
<script lang="ts" setup>
import { browserRedirect } from '@/utils/index';

import { computed } from 'vue';

const isMobile = computed(() => {
  return browserRedirect();
});
</script>

<style lang="scss" scoped>
.border-yes {
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
}
.border-no {
  border-left: 0;
  border-right: 0;
}
.page-footer {
  max-width: 400px;
  margin: auto;
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: #ffffff;
  border-top: 1px solid #dcdfe6;
}
</style>
