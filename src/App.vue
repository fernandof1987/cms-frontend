<template>
  <router-view />
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()

    
    onMounted( () => {
      $q.dark.set(true)
      document.body.style.setProperty('--q-negative', '#FF334C')     
       
      /*
      if($q.dark.isActive){
          document.body.style.setProperty('--q-negative', '#FF334C')
      }
      */
    })

  }
})
</script>

<style>
.body--light {
  background: #e1e1e1
}

.negative--dark {
  color: green
}
</style>