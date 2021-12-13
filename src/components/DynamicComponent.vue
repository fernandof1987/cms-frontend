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
         default: '../pages/usuarios/Grid.vue'
     }
 },
 
 computed: {
  comp () {
      console.log(this.pageName)
      console.log(`../pages/${this.pageName}/Grid.vue`)
      return defineAsyncComponent(() => import(`../pages/${this.pageName}/Grid.vue`))
  }
}

}
</script>