<template>
    <div>子级:{{message}}</div>
    <el-button type="danger" @click="toFather">传递到父组件</el-button>
</template>

<script>
import { defineComponent,reactive } from 'vue'

export default defineComponent({
    name: 'son',
    props:['message'],
    emits:['toFather'],
    setup(props,{emit}) {
        const state = reactive({
            person:['123']
        })
        const toFather=()=>{
            emit('goHome',state.person)
        }

        return{
            state,
            toFather
        }
    },

})
</script>
