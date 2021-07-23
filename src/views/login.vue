<template>
  <div class="login-body">
      <div class="header">
        <div class="content">
          <img src="../assets/img/LoLlogo.png" style="width:144px"/>
          <div>广告招租</div>
        </div>
          
      </div>
      <div class="main">
        <div class="content">
          <div class="leftView">
            <div class="name">
              企业云平台
            </div>
            <div class="info">
              以企业为中心，实现企业的数字化管理，提高企业协作效率。
            </div>
            <img src="../assets/img/loginBg.png">
          </div>
          <div class="rightView">
            <div class="login">
              <div class="head">企业云平台登录</div>
              <div class="headInfo">小马国炬企业云平台</div>
               <el-form :model="ruleForm" :rules="rules" ref="formData" label-width="0" class="demo-ruleForm">
                  <el-form-item label="" prop="phone" >
                    <el-input  v-model="ruleForm.phone" placeholder="输入手机号">
                      <template #prefix>
                        <img class="icon" src="../assets/img/手机.png">
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="" prop="password" v-if="isPassword">
                    <el-input  v-model="ruleForm.password" placeholder="输入密码" >
                      <template #prefix>
                        <img class="icon" src="../assets/img/密 码.png">
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="" prop="verificationCode" >
                    <div class="verification">
                      <el-input  v-model="ruleForm.verificationCode" placeholder="输入验证码">
                        <template #prefix>
                          <img class="icon" src="../assets/img/验证码.png">
                        </template>
                      </el-input>
                      <div v-if="isPassword" class="verificationImg verificationImgCode">
                        4396
                      </div>
                      <el-button v-else class="verificationImg verificationTime" @click="timedCount" :disabled="flag">
                        {{flag?time + 's后可重发':'获取验证码'}}
                      </el-button>

                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                  </el-form-item>
                </el-form>

                <div class="loginType" v-if="isPassword" @click="changeLoginType">
                  <img src="../assets/img/bluePhone.png">
                  手机号登录
                </div>
                <div class="loginType" v-else @click="changeLoginType">
                  <img src="../assets/img/用户.png">
                  账号密码登录
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { defineComponent ,reactive, toRefs,ref} from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      flag:false,
      time:60,
      isPassword:true,
      ruleForm:{
        phone:'',
        password:"",
        verificationCode:''
      },
      rules:{
        phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        verificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
      }
    })

    // 提交
    const formData = ref(null)
    const submitForm=()=>{
      formData.value.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
    }
    // 获取验证码
    const timedCount=()=>{
      state.flag = true;
      state.time = state.time - 1;
      if(state.time <60 && state.time >0) {
          setTimeout(timedCount, 1000)
      } else {
        state.flag = false;
        state.time = 60
      }
    }

    const changeLoginType=()=>{
      state.isPassword = !state.isPassword
      formData.value.resetFields();
    }
    return{
      ...toRefs(state),
      formData,
      submitForm,
      timedCount,
      changeLoginType
    }
  },
})
</script>


<style lang="scss" scoped>
@import "@/assets/styles/index.scss";
.login-body{
  height: 100vh;
}
.header{
  border-bottom: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.04), 0px 0px 2px 0px rgba(0,0,0,0.06), 0px 4px 8px 0px rgba(0,0,0,0.04);
  .content{
    width: 62.5vw;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 18.75vw;
    div{
      width: 100px;
      height: 22px;
      opacity: 1;
      font-size: 20px;
      font-family: HarmonyOS Sans SC, HarmonyOS Sans SC-Medium;
      font-weight: 500;
      color: #95999d;
      line-height: 22px;
    }
  }
  
}
.main{
  width: 100vw;
  height: calc(100% - 70px);
  background-color: #F8FAFC;
  .content{
    width: 62.5vw;
    display: flex;
    // align-items: center;
    // justify-content: space-between;
    padding-left: 18.75vw;
    .name{
      width: 200px;
      height: 47px;
      opacity: 1;
      font-size: 40px;
      font-family: HarmonyOS Sans SC, HarmonyOS Sans SC-Bold;
      font-weight: 700;
      text-align: LEFT;
      color: #313335;
      margin: 11vh 0 0 2.5vw;
    }
    .info{
      margin: 1vh 0 2.5vh 2.5vw;
      width: 486px;
      height: 21px;
      opacity: 1;
      font-size: 18px;
      font-family: HarmonyOS Sans SC, HarmonyOS Sans SC-Regular;
      font-weight: 400;
      text-align: LEFT;
      color: #62666a;
    }
    img{
      width: 34vw;
    }
    .rightView{
      width: 100%;
      .login{
        width: 19.8vw;
        // height: 44vh;
        height: auto;
        background: #fff;
        margin-top: 16vh;
        border-radius: 12px;
        padding: 5.1vh 2.1vw;
        box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.04), 0px 4px 8px 0px rgba(0,0,0,0.04), 0px 16px 24px 0px rgba(0,0,0,0.04), 0px 24px 32px 0px rgba(0,0,0,0.04);
        .head{
          height: 30px;
          opacity: 1;
          font-size: 26px;
          font-family: HarmonyOS Sans SC, HarmonyOS Sans SC-Medium;
          font-weight: 500;
          color: #2b2d2e;
        }
        .headInfo{
          font-size: 16px;
          font-family: HarmonyOS Sans SC, HarmonyOS Sans SC-Regular;
          font-weight: 400;
          color: #95999d;
          margin: 1.1vh 0 4.4vh 0;
        }
        :deep(.el-input__inner){
          height: 44px;
          background: #f7f7f8;
          border-radius: 6px;
        }
        .el-form-item{
          margin-bottom: 2.96vh;
        }
        .icon{
          width: 20px;
          vertical-align: middle;
        }
        .el-button--primary{
          width: 100%;
        }
        .verification{
          display: flex;
          justify-content: space-between;
          .verificationImg{
            height: 44px;
            margin-left: 12px;
            border-radius: 6px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            cursor: pointer;
          }
          .verificationTime{
            width: 131px;
            background-color: $primary-color;
          }
          .verificationImgCode{
            width: 100px;
            border: 1px solid #ededed;
            background-color: #fff;
            color: #62666a;
            font-size: 20px;
          }
        }
        .loginType{
          display: flex;
          justify-content: center;
          font-size: 16px;
          font-family: HarmonyOS Sans SC, HarmonyOS Sans SC-Regular;
          font-weight: 400;
          color: $primary-color;
          img{
            width: 20px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>