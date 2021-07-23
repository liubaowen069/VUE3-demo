<template>
  <el-header class="header">
    <i
      class="el-icon-s-fold isExpandIcon"
      @click="isExpand"
      v-if="menuFlag"
    />
    <i
      class="el-icon-s-unfold isExpandIcon"
      @click="isExpand"
      v-if="!menuFlag"
    />
    <labelSet></labelSet>

    <div class="headLogo">
      <span class="action" @click="signOut">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" class="headImg">
          <span class="userName">欢迎您，{{userName}}</span>
          <img src="../assets/img/loginOut.png">
          <span>退出登录</span>
      </span>
    </div>
  </el-header>
</template>

<script lang="ts">
import { defineComponent ,reactive,toRefs} from "vue";
import { useRouter } from 'vue-router'
export default defineComponent({
  emits:['isExpand'],
  setup(props,{emit}) {
      const state= reactive({
        menuFlag: true,
        userName:'刘宝文',
      })

      const isExpand =()=>{
        state.menuFlag = !state.menuFlag
        emit('isExpand')
      }

      const router = useRouter();
      const signOut=()=>{
        // router.push('/')
      }
      return{
          ...toRefs(state),
          isExpand,
          signOut
      }
  },
  
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/index.scss";
.header {
  width: 100%;
  height: 62px !important;
  opacity: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.isExpandIcon{
    font-size: 24px;
    margin-right: 25px;
    color: $menu-color;
}
.headLogo{
  flex: 1;
  .action{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }
  .headImg{
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }
  .userName{
    margin:0 20px 0 5px;
  }
}
</style>
