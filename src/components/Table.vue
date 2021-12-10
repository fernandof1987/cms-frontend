<template>
    <component v-if="comp" :is="comp"></component>
</template>

<script>
//Vue 3 is having a special function to define these async functions
import {defineAsyncComponent} from "vue";

export default {
 name: "DynamicComponent",
 //I am passing the name of the Component as a prop
 props: {
     pageName:{
         type: String,
         required: true,
         default: '../pages/grupos/Index.vue'
     }
 },
 
 computed: {
  comp () {
      return defineAsyncComponent(() => import(`../pages/${this.pageName}/Index.vue`))
  }
}

}
</script>