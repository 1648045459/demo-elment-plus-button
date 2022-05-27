<template>
  <div id="app-1" :class="!isMobile ? 'border-yes' : 'border-no'">
    <keep-alive>
      <router-view v-if="route.meta.keepAlive"> </router-view>
    </keep-alive>
    <router-view v-if="!route.meta.keepAlive"> </router-view>
  </div>
</template>
<script lang="ts" setup>
import { browserRedirect } from '@/utils/index';
import { computed } from 'vue';
// 基础配置
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
const router = useRouter();
const route = useRoute();
const store = useStore();

const isMobile = computed(() => {
  return browserRedirect();
});

const listenerLoginWalletMassage = (e) => {
  if (e && e.data.from) {
    for (let name in e.data) {
      console.log(name, e.data[name]);
      sessionStorage.setItem(name, e.data[name]);
    }
  }
};
const init = () => {
  if (window.opener) {
    console.log('app = ', route.query.appidSaltRandom);

    window.addEventListener('message', listenerLoginWalletMassage, false);
  }
};
init();
</script>
<style lang="scss">
#app-1 {
  max-width: 400px;
  min-width: 270px;
  margin: auto;

  height: 100%;
  overflow-x: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.border-yes {
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
}
.border-no {
  border-left: 0;
  border-right: 0;
}
</style>
