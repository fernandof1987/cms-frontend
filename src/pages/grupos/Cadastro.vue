<template>
  <div>
      <Form
        action="create"
        :form="form"
        :submit="addGroup"
        v-if="form"
      >
      </Form>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref  } from 'vue'
import { addGroup, getForm } from '../../repositories/grupo.js'

import Form from 'components/Form.vue'

export default defineComponent({
    name: 'CadastroGrupo',
    components: {Form},
    setup() {
        
        const form = ref('')

        onMounted( async () => {
          form.value = await getForm()
        })

        return {
          form,
          addGroup
        }
    }
})
</script>
