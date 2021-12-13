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
import { addUser, createForm } from '../../repositories/usuario.js'

import Form from 'components/Form.vue'

export default defineComponent({
    name: 'CadastroUsuario',
    components: {Form},
    setup() {
        
        const form = ref('')

        onMounted( async () => {
          form.value = await createForm()
        })

        return {
          form,
          addUser
        }
    }
})
</script>
