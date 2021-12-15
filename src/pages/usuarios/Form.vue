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
import { addUser, createForm, editForm, updateUser, deleteUser } from '../../repositories/usuario.js'

import Form from 'components/Form.vue'

export default defineComponent({
    name: 'CadastroUsuario',
    components: {Form},
    props: {
      action: { type: String, default: 'create' },
      primaryKeyValue: { type: String, default: null }
    },
    setup(props) {
        
        const form = ref('')

        const submitFunction = ref('')
        //submitFunction = addUser

        onMounted( async () => {
            if(props.action == 'create'){
                form.value = await createForm()
                submitFunction.value = addUser
            }else if(props.action == 'edit'){
                //console.log(props.primaryKeyValue)
                form.value = await editForm(props.primaryKeyValue)
                submitFunction.value = updateUser
            }else if(props.action == 'delete'){
                //console.log(props.primaryKeyValue)
                form.value = await editForm(props.primaryKeyValue)
                submitFunction.value = deleteUser
            }else{
                form.value = await editForm(props.primaryKeyValue)
                submitFunction.value = async () => console.log('Submit')
            }
            //console.log(form.value)
        })
        return {
          form,
          submitFunction
          //submitFunction
        }
    }
})
</script>
