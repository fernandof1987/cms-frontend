<template>
    <q-page class="flex flex-center">
        <div style="width: 350px">
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
import { defineComponent, ref } from 'vue';

import Form from 'components/Form.vue'


export default defineComponent({
  name: 'Login',
  components: {Form},
  setup() {
      const form = {
          name: 'login',
          label: 'Login',
          icon: 'people',
          fields: [
            { name: 'usuario', label: 'Usuário', required: true, type: 'text', icon: 'person', sequence: 0 },
            { name: 'password', label: 'Senha', required: true, type: 'password', icon: 'lock', sequence: 1 },
          ]
      }

      const submit = () => alert('Submit!')
      return{
          form,
          submit
      }
  }
})
</script>
