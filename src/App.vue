<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs ,onUnmounted} from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({});
    const router = useRouter();

    const unwatch = router.beforeEach((to, from, next) => {
      if (to.path == "/") {
        console.log(to);
        // 如果路径是 /login 则正常执行
        next();
      } else {
          next({ path: '/' })
        
        // 如果不是 /login，判断是否有 token
        // if (!localGet('token')) {
        //   // 如果没有，则跳至登录页面
        //   next({ path: '/login' })
        // } else {
        //   // 否则继续执行
        //   next()
        // }
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
