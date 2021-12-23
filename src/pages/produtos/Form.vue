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
import { add, createForm, editForm, update, remove } from '../../repositories/produto.js'

import Form from 'components/Form.vue'

export default defineComponent({
    name: 'CadastroProdutos',
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
                submitFunction.value = add
            }else if(props.action == 'edit'){
                //console.log(props.primaryKeyValue)
                form.value = await editForm(props.primaryKeyValue)
                submitFunction.value = update
            }else if(props.action == 'delete'){
                //console.log(props.primaryKeyValue)
                form.value = await editForm(props.primaryKeyValue)
                submitFunction.value = remove
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
