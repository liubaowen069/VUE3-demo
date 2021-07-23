<template >
  <el-aside :class="[isCollapse?'el-menu-vertical-demo':'aside']">
    <div class="head">
      <!-- <img src="../assets/img/logo.png" /> -->
      <img src="https://game.gtimg.cn/images/lol/v3/logo-public.png" />
    </div>
    <el-menu
      background-color="#468afb"
      text-color="#fff"
      active-text-color="#fff"
      :router="true"
      :default-active="currentPath"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-house" />
          <span>首页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userInfo">用户信息</el-menu-item>
          <el-menu-item index="/account">账号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
        <template #title>
          <i class="el-icon-data-line" />
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userInfo">用户信息</el-menu-item>
          <el-menu-item index="/account">账号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script >
import { defineComponent, reactive, toRefs, } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      currentPath: "/home",
      isCollapse:false
    });

    const toTick =()=>{
        state.isCollapse = !state.isCollapse
    }

    return {
      ...toRefs(state),
      toTick
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/index.scss";
.aside {
  width: 220px !important;
  background-color: $menu-color;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  transition: width .5s;
  -moz-transition: width .5s; /* Firefox 4 */
  -webkit-transition: width .5s; /* Safari 和 Chrome */
  -o-transition: width .5s; /* Opera */
  img{
    width: 131px;
    transition: width .5s;
  }
}
.el-menu-vertical-demo{
    width: 64px !important;
    background-color: $menu-color;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    transition: width .5s;
    -moz-transition: width .5s; /* Firefox 4 */
    -webkit-transition: width .5s; /* Safari 和 Chrome */
    -o-transition: width .5s; /* Opera */
    img{
      width: 60px;
      transition: width .5s;
    }
  }
.aside::-webkit-scrollbar {
  display: none;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}

.el-menu {
  border-right: none !important;
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: -1px !important;
}
:deep(.el-submenu__title i) {
  color: #fff;
}
.el-menu-item.is-active {
  background-color: #105fe4 !important;
}
:deep(.el-menu-item-group__title) {
  padding: 0 !important;
}
</style>
