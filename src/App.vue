<template>
  <router-view />
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import { LocalStorage, useQuasar } from 'quasar'

import { api } from 'boot/axios'
import { useRouter, useRoute } from 'vue-router'


export default defineComponent({
  name: 'App',
  setup() {
    
    const $q = useQuasar()

    const router = useRouter()


    let login = LocalStorage.getItem('login')
    //console.log('login')
    //console.log(login)

    if(login && login.token){
        api.defaults.headers.common['token'] = login.token
    }else{
        router.push('/login')
    }

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