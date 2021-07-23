<template>
  <el-container>
    <Aside ref="leftMenu"></Aside>
    <div class="right-view">
      <Header @isExpand="isExpand"></Header>
      <el-main>
        <div class="container">
            <router-view></router-view>
        </div>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import { defineComponent, ref } from "vue";
import Aside from "./Aside.vue";
import Header from "./Header.vue";

export default defineComponent({
  components: {
    Aside,
    Header,
  },
  setup() {
    const leftMenu = ref(null);
    const isExpand = () => {
      leftMenu.value.toTick();
    };
    return {
      leftMenu,
      isExpand,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  background: #ffffff;
  // position: relative;
}
.right-view {
  width: 100%;
}
.el-main {
  display: flex;
  width: 100%;
  height: calc(100% - 62px);
  background-color: #f7f7f7;
  padding: 12px;
  .container{
    padding: 24px;
    width: 100%;
    background-color: #fff;
  }
}
</style>
