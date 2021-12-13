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
import { addGroup, createForm, editForm } from '../../repositories/grupo.js'

import Form from 'components/Form.vue'

export default defineComponent({
    name: 'CadastroGrupo',
    components: {Form},
    props: {
      action: { type: String, default: 'create' }, //['create', 'edit', 'show', 'delete']
      primaryKeyValue: { type: String, default: null }
    },
    setup(props) {
        
        const form = ref('')

        onMounted( async () => {
            if(props.action == 'create'){
                form.value = await createForm()
            }else if(props.action == 'edit'){
                form.value = await editForm(props.primaryKeyValue)
            }

            console.log(form.value)
          
        })

        return {
          form,
          addGroup
        }
    }
})
</script>
