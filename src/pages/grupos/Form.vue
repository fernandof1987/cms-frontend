<template>
  <div>
      <Form
        :action="action"
        :primaryKeyValue="primaryKeyValue"
        :form="form"
        :submit="submitFunction"
        v-if="form"
      >
      </Form>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref  } from 'vue'
import { addGroup, createForm, editForm, updateGroup, deleteGroup } from '../../repositories/grupo.js'

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

        const submitFunction = ref('')


        onMounted( async () => {
            if(props.action == 'create'){
                form.value = await createForm()
                submitFunction.value = addGroup
            }else if(props.action == 'edit'){
                //console.log(props.primaryKeyValue)
                form.value = await editForm(props.primaryKeyValue)
                submitFunction.value = updateGroup
            }else if(props.action == 'delete'){
                //console.log(props.primaryKeyValue)
                form.value = await editForm(props.primaryKeyValue)
                submitFunction.value = deleteGroup
            }else{
                form.value = await editForm(props.primaryKeyValue)
                submitFunction.value = () => console.log('Submit')
            }
        })

        return {
          form,
          submitFunction
        }
    }
})
</script>
