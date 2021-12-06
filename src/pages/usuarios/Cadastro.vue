<template>
  <div>
      <Form
        action="create"
        :form="form"
        :submit="addUser"
        v-if="form"
      >
      </Form>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref  } from 'vue'
import { addUser, getForm } from '../../repositories/usuario.js'

import Form from 'components/Form.vue'

export default defineComponent({
    name: 'CadastroUsuario',
    components: {Form},
    setup() {
        
        const form = ref('')

        onMounted( async () => {
          form.value = await getForm()
        })

        return {
          form,
          addUser
        }
    }
})
</script>
