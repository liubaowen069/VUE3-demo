<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs ,onUnmounted} from "vue";
import { useRouter } from "vue-router";
import {localGet,localRemove}from './utils/index'

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({});
    const router = useRouter();

    const unwatch = router.beforeEach((to, from, next) => {
      if (to.path == "/") {
        // 如果路径是 /login 则正常执行
        localRemove('token')
        next();
      } else {
        if (!localGet('token')) {
          // 如果没有，则跳至登录页面
          next({ path: '/' })
        } else {
          // 否则继续执行
          next()
        }
      }
    });
    onUnmounted(() => {
      unwatch()
    })

    return {
      ...toRefs(state),
      router,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";
</style>
