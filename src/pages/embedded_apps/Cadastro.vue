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
                            :label="''/*input.label + (input.required ? ' *' : '') */"
                            :type="input.type"
                            :readonly="input.readonly"
                            dense
                            bottom-slots
                        >
                            <template v-slot:prepend>
                                <q-badge color="white" text-color="black" floating>{{ k+1 }}</q-badge>
                                <q-icon :name="input.icon" @click="copyInput(input.label, formModel[input.name])"/>
                            </template>
                            <template v-slot:append>
                                <q-icon v-if="formModel[input.name] !== ''" name="close" @click="formModel[input.name] = ''" class="cursor-pointer" />
                            </template>
                                <template v-slot:hint>
                                {{ input.label + (input.required ? ' *' : '')  }}
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
import { getForm } from '../../repositories/form.js'
import { addUser } from '../../repositories/usuario.js'
export default defineComponent({
  name: 'Cadastro',
  setup() {
        const $q = useQuasar()
        const formHeader = ref({})
        const form = ref([])
        const formFilterText = ref('')
        const formModel = ref({}) 
        const vwForm = computed( () => form.value.filter( el => el.label.toLowerCase().indexOf(formFilterText.value.toLowerCase()) > -1 ) )

        onMounted( async() => {
            let rs = await getForm()
            formHeader.value = {name: rs.name, label: rs.label, icon: rs.icon}
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

            for (var prop in formModel.value) {
                if( formModel.value.hasOwnProperty( prop ) ) {
                    //console.log(prop)
                    console.log(prop + " = " + formModel.value[prop]);
                    //let input = form.filter( item => item[el] )[0]
                }
            }

        }

        function confirmForm(){
            validateForm()
            alert('confirmou')
            addUser(formModel.value)
        }

        async function copyInput(inputLabel, inputValue) {
            if(!inputValue) return
            copyToClipboard(inputValue)
                .then(() => {
                    let msg = `Conteúdo do campo "${inputLabel}" copiado para a área de transferência`
                    $q.notify({message: msg, color: 'primary', icon: 'file_copy', actions: [{ icon: 'close', color: 'white' }]})
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
            formHeader
        }
  }
})
</script>
