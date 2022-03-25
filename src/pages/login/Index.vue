<template>
    <q-page class="flex flex-center">
        <div style="width: 350px; padding: 30px" :class="''/*bg-grey*/">
            <Form
                action="create"
                :filterFields="false"
                :displayInline="false"
                :form="form"
                :submit="submit"
            >
            </Form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

import { LocalStorage, useQuasar } from 'quasar'

import Form from 'components/Form.vue'

import { login } from '../../repositories/login.js'

import { useRouter, useRoute } from 'vue-router'

import { api } from 'boot/axios'

export default defineComponent({
  name: 'Login',
  components: {Form},
  setup() {
    
        const router = useRouter()

        const $q = useQuasar()

        const form = {
            name: 'login',
            label: 'Login',
            icon: 'people',
            fields: [
                { name: 'username', label: 'Usuário', required: true, type: 'text', icon: 'person', sequence: 0 },
                { name: 'password', label: 'Senha', required: true, type: 'password', icon: 'lock', sequence: 1 },
            ]
        }

        async function loginAndRegisterLocalStorage(formModel){
            
            let { username, password } = formModel
            let rs = await login(username, password)

            //console.log('loginAndRegisterLocalStorage')
            //console.log(rs)

            if(rs.success){
                LocalStorage.set('login', rs.results[0])
                api.defaults.headers.common['token'] = rs.results[0].token
                router.push('/')
            }else{
                $q.notify({message: "usuário: "+ username +" não pode ser autenticado", color: 'negative', icon: 'info'})
            }

        }

      onMounted(() => {
          //console.log('onMounted')
          //loginAndRegisterLocalStorage()
          //login()
      })

      //const submit = () => alert('Submit!')
      const submit = loginAndRegisterLocalStorage

      return{
          form,
          submit
      }
  }
})
</script>
