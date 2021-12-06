<template>
  <div>
      <q-card class="">

            <q-card-section>
                <div class="q-gutter-md row items-start">
                    <div class="text-h6"><q-icon :name="formHeader.icon"/> Cadastro de {{ formHeader.label }} </div>
                    <q-space />
                    <q-input v-model="formFilterText" outlined rounded dense type="text" label="filtrar campos" style="max-width: 180px" class="">
                        <template v-slot:append>
                            <q-icon name="search"/>
                            <q-icon v-if="formFilterText !== ''" name="close" @click="formFilterText = ''" class="cursor-pointer" />
                        </template>
                    </q-input>
                </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="q-gutter-md row items-start" >
                    <div v-for="(input, k) in vwForm" :key="input.name">
                        <q-input
                            size="12"
                            v-model="formModel[input.name]"
                            rounded
                            outlined
                            :label="'' /*input.label + (input.required ? ' *' : '') */"
                            :type="input.type"
                            :readonly="input.readonly"
                            dense
                            bottom-slots
                            :autocomplete="'new-password' /*remove autocomplete do browser, acontece muito com usuario e senha e atrapalha*/"
                        >
                            <template v-slot:prepend>
                                <q-badge color="grey" text-color="" floating>{{ k+1 }}</q-badge>
                                <q-icon :name="input.icon || 'description' " @click="copyInput(input.label, formModel[input.name])"/>
                            </template>
                            <template v-slot:append>
                                <q-icon v-if="formModel[input.name] !== ''" name="close" @click="formModel[input.name] = ''" class="cursor-pointer" />
                            </template>
                                <template v-slot:hint>
                                    <span :class="validationErrorFields.filter( el => el.field == input.name && formModel[input.name] == '' ).map( el => el.message )[0] ? 'text-negative' : '' ">
                                        {{ input.label + (input.required ? ' *' : '')  }}
                                    </span>
                                    <br v-if="validationErrorFields.filter( el => el.field == input.name ).map( el => el.message )[0]" />
                                    <span class="text-negative">
                                        {{ validationErrorFields.filter( el => el.field == input.name && formModel[input.name] == '').map( el => el.message )[0] }}
                                    </span>
                                </template>
                        </q-input>
                    </div>
                </div>
            </q-card-section>

            <q-separator />

            <q-card-section> 
                <div class="q-gutter-md row items-start">
                    <div class="text-caption" v-if="vwForm.length < form.length">{{ `(${vwForm.length}) campo's com "${formFilterText}" no nome ` }} </div>
                    <q-space />
                    <q-btn icon="file_copy" rounded outline align="right" class="" color="primary" label="Copiar área Tranferência" />
                    <q-btn icon="download" rounded outline align="right" class="" color="primary" label="Baixar" />
                    <q-btn icon="clear" rounded outline align="right" class="" color="warning" label="Limpar Formulário" @click="createFormModel"/>
                    <q-btn icon="check" rounded outline align="right" class="" color="positive" label="Confirmar" @click="confirmForm"/>
                </div>
            </q-card-section>

      </q-card>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed  } from 'vue'
import { copyToClipboard, useQuasar  } from 'quasar'
//import { addUser, getForm } from '../../repositories/usuario.js'
export default defineComponent({
  name: 'Cadastro',
  props: {
    action: { type: String, default: 'create' }, // create || edit
    form: { type: Object, required: true },
    formValues: [], //only edit
    submit: { type: Function, required: true  }
  },
  setup(props) {
        const $q = useQuasar()
        let formHeader = ref({})
        const form = ref([])
        const formFilterText = ref('')
        const formModel = ref({}) 
        const vwForm = computed( () => form.value.filter( el => el.label.toLowerCase().indexOf(formFilterText.value.toLowerCase()) > -1 ) )
        const validationErrorFields = ref([])

        onMounted( async() => {
            //let rs = await getForm()
            //console.log('props', props)
            //console.log('props.__form', props.__form)
            let rs = props.form
            formHeader.value = {name: rs.name, label: rs.label, icon: rs.icon}
            //formHeader = {name: rs.name, label: rs.label, icon: rs.icon}
            form.value = rs.fields
            createFormModel()
        })

        function createFormModel(){
            let fieldNames = form.value.map( el => el.name )
            let objModel = {}
            fieldNames.forEach( el => (objModel[el] = '') )
            formModel.value = objModel
        }

        function validateForm(){
            let fields = []
            for (var prop in formModel.value) {
                if( formModel.value.hasOwnProperty( prop ) ) {
                    let inputValue = formModel.value[prop]                  
                    let attrName = prop
                    let inputStructure = form.value.filter( item => item.name == attrName )[0]
                    
                    if(inputStructure.required && inputValue == '' ){
                        fields.push(
                            {field: attrName, message: 'Este campo é obrigatório!'}
                        )
                    }
                    /*
                    else if(inputStructure.minLen >= inputValue.length && inputValue == ''){
                        fields.push(
                            {field: attrName, message: 'O campo deve ter mais de ' + inputValue.length + ' caracteres'}
                        )
                    }
                    */
                }
            }
            //console.log(fields)
            return fields
        }

        async function confirmForm(){
            let problemFields = validateForm()
            if(problemFields.length === 0){
                //alert('Formulario confirmado')
                //let rs = await addUser(formModel.value)
                let rs = await props.submit(formModel.value)
                if(rs.length > 0){
                    let msg = `Formulário enviado com sucesso!`
                    $q.notify({message: msg, color: 'primary', icon: 'mail'})
                }else{
                    let msg = `Algo deu errado`
                    $q.notify({message: msg, color: 'negative', icon: 'info'})
                }
                createFormModel()//limpa formulario
                validationErrorFields.value = []//limpa erros de validação
            }else{
                validationErrorFields.value = problemFields
                let msg = `
                    Formulátio não passou na validação:
                    ${ JSON.stringify( validationErrorFields.value, null, 2 ) }
                `
                $q.notify({message: msg, color: 'negative', icon: 'info'})
            }
        }

        async function copyInput(inputLabel, inputValue) {
            if(!inputValue) return
            copyToClipboard(inputValue)
                .then(() => {
                    let msg = `Conteúdo do campo "${inputLabel}" copiado para a área de transferência`
                    $q.notify({message: msg, color: 'primary', icon: 'file_copy'})
                })
                .catch(() => {
                    let msg = `Não foi possível copiar o conteúdo do campo "${inputLabel}" `
                    $q.notify(msg)
                })
        }
    
        return {
            form,
            vwForm,
            formFilterText,
            formModel,
            createFormModel,
            copyInput,
            confirmForm,
            formHeader,
            validationErrorFields
        }
  }
})
</script>
