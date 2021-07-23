<template>
    <div class="labelSet flexB borderBox">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
    </div>
</template>

<script >
import { defineComponent,reactive,toRefs,onMounted } from 'vue'
import { useRoute,onBeforeRouteUpdate } from "vue-router";

export default defineComponent({
    name: "labelSet",
    setup() {
        const route = useRoute();

        const state = reactive({
            tagsList: []
        })
        onBeforeRouteUpdate((to) => {
            setTags(to)
        })
        // 初始化
        onMounted(() => {
            setTags(route)
        })

        const setTags=(route)=>{
             const isExist = state.tagsList.some(item => {
                return item.path === route.fullPath
            })
            if(!isExist){
                if(state.tagsList.length >= 7){
                    state.tagsList.shift();
                }
                state.tagsList.push({
                    title: route.name,
                    path: route.fullPath,
                    // name: route.matched[1].components.default.name
                })
            }
        }
        const isActive=(path)=>{
            return path === route.fullPath;
        }
        const closeTags=(index)=>{
            const delItem = state.tagsList.splice(index, 1)[0];
            const item = state.tagsList[index] ? state.tagsList[index] : state.tagsList[index - 1];
            if (item) {
                delItem.path === route.fullPath && router.push(item.path);
            }
        }
        return{
            ...toRefs(state),
            route,
            isActive,
            closeTags,
        }
    },
})
</script>


<style scoped lang="scss">
    .labelSet{
        height: 100%;
    }
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }
    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
    .tags-li {
        float: left;
        padding: 5px 12px 5px 12px;
        margin: 3px 5px 2px 3px;
        border-radius: 2px;
        font-size: 14px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        // background: #349BFF;
        border: 1px solid #f0f2f5;
        border-right: 1px solid #f0f2f5;
        vertical-align: middle;
        color: #788498;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }
    .tags-li:not(.active):hover {
        background: #66B2FF;
        color: #fff !important;
    }
    .tags-li.active {
        font-weight: 400;
        color: #fff;
        border-radius:4px;
        background-color: #66B2FF;
    }
    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        // color: #788498;
    }
    .tags-li.active .tags-li-title {
        color: #fff;
    }
    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
</style>
