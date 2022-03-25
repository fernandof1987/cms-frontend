import { defineComponent, onMounted, ref } from 'vue'
import Form from 'components/Form.vue'

export default function FormModel({componentName, repository}) {
    let component = defineComponent({
        name: componentName,
        components: {Form},
        props: {
          action: { type: String, default: 'create' }, //['create', 'edit', 'show', 'delete']
          primaryKeyValue: { type: String, default: null }
        },
        emits: ['update:table'],
        setup(props, { emit }) {
            
            const form = ref('')
    
            const submitFunction = ref('')
    
            onMounted( async () => {
                if(props.action == 'create'){
                    form.value = await repository.createForm()
                    submitFunction.value = repository.add
                }else if(props.action == 'edit'){
                    form.value = await repository.editForm(props.primaryKeyValue)
                    submitFunction.value = repository.update
                }else if(props.action == 'delete'){
                    form.value = await repository.editForm(props.primaryKeyValue)
                    submitFunction.value = repository.remove
                }else{
                    form.value = await repository.editForm(props.primaryKeyValue)
                    submitFunction.value = () => console.log('Submit')
                }
            })

            function sendResfreshGrid(event){
                //alert('testeRefresh')
                //console.log(event)
                //console.log('parent', event.target.parentNode)
                //console.log('parent', this.$parent)
                emit('update:table', true)
            }
    
    
            return {
              form,
              submitFunction,
              sendResfreshGrid
            }
        }
    })
    return component
} 