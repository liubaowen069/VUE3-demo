<template>
  <div>
    <p>hellow world + {{ name }} 年龄：{{ age }}</p>
    <ul>
      <li v-for="item in list" :key="item.name">
        <div :style="{ color: item.color }">{{ item.name }}</div>
      </li>
    </ul>
    <p v-if="bookName">书名：《《 {{ bookName }} 》》</p>
    <Son :message="message" @goHome="goHome" />
    <el-button type="primary" @click="changeName">改名</el-button>
    <el-button type="info" @click="getM">切换</el-button>
    <el-input v-model="add"></el-input>
    <el-input v-model="reduce"></el-input>
    <el-input v-model="firstName" class="a"></el-input>
    <el-input v-model="lastName" class="a"></el-input>
    <el-input v-model="val1" class="a"></el-input>
    <el-input v-model="val2.name" class="a"></el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from "vue";
import Son from "./son.vue";

export default defineComponent({
  components: {
    Son,
  },

  setup() {
    const state = reactive({
      name: "caixuk",
      age: 18,
      list: [
        { name: "张三", color: "red" },
        { name: "李四", color: "blue" },
        { name: "王五", color: "yellow" },
      ],
      message: "天不生我李淳罡",
      bookName: false,
      val: "",
      num: 100,
      firstName: "A",
      lastName: "B",
      val1: "666",
      val2: {
          name:'1'
      },
    });

    const add = computed(() => {
      return state.num + state.age;
    });
    const reduce = computed({
      get() {
        return state.firstName + "-" + state.lastName;
      },

      set(value: string) {
        const names = value.split("-");
        state.firstName = names[0];
        state.lastName = names[1];
      },
    });
    watch(
      state,
      () => {
          console.log(state.val1);
          
        state.val1 = state.firstName + "-" + state.lastName;
      },
      {
        immediate: true, // 是否初始化立即执行一次, 默认是false
        deep: true, // 是否是深度监视, 默认是false
      }
    );

    watch(state.val2,(value)=>{
        console.log(value);
    })
    const changeName = () => {
      state.name = "张三";
      state.age++;
      enum Color {
        red = 3,
        blue,
        green,
      }
      let style = Color.green;
    };

    const getM = (data: any) => {
      state.message = state.message.concat(",剑道万古长如夜");
    };
    const goHome = (data: boolean) => {
      let arr: Number[] = [1, 100, 200];
      let arr1: Array<Number> = [1, 2, 3];
      let arr2: Array<String> = ["1", "2"];
      state.bookName = data;
    };

    return {
      ...toRefs(state),
      changeName,
      getM,
      goHome,
      add,
      reduce,
    };
  },
});
</script>

<style scoped lang="scss">
.a {
  display: inline-block;
  width: 200px;
  height: 50px;
}
</style>
