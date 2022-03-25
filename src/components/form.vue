<template>
  <div class="no-box-shadow" style="margin: -16px">

        <q-dialog v-model="tableDialogAtivo" :maximized="maximizedToggle">
            <q-card :style=" maximizedToggle ? 'max-width: 99vw;' : 'max-width: 90vw;' " bordered>
                
                <q-bar class="bg-primary text-white">

                    <!--q-icon name="laptop_chromebook" /--> &nbsp;

                    <!--div>Descricao.</div-->
                    <!--{{ tableDialogName}}-->

                    <q-space />

                    <q-btn dense round flat :icon=" maximizedToggle ? 'minimize' : 'crop_square' " @click="maximizedToggle = !maximizedToggle" :disable="false">
                        <q-tooltip v-if="maximizedToggle" class="">Restaurar</q-tooltip>
                        <q-tooltip v-else class="">Maximizar</q-tooltip>
                    </q-btn>

                    <q-btn icon="close" flat round dense v-close-popup>
                        <q-tooltip class="">Fechar</q-tooltip>
                    </q-btn>

                </q-bar>

                <q-card-section class="">
                    <!--DynamicComponent :pageName="`pages/${tableDialogName}/Grid.vue`"></DynamicComponent-->
                    <DynamicComponent  folder="pages" :file="tableDialogName + '/Grid.vue'" :finishFunction="getDialogResult" :key="tableDialogName" :componentsProps="{action: action, selected: selected}"></DynamicComponent>
                </q-card-section>

                    <!--q-btn flat label="Ok" color="secondary" v-close-popup @click="getDialogResult" /-->
                    <!--q-btn flat label="OK" color="primary" v-close-popup /-->

                    <q-bar >
                        <q-space />
                        <q-btn
                            flat label="Confirma"
                            icon="check"
                            color="primary"
                            v-close-popup
                            @click="getDialogResult"
                        />
                    </q-bar>

            </q-card>
        </q-dialog>

        <!--q-btn label="import" color="negative" @click="importTabelaConsulta('grupos')" /-->

            <q-card-section>

                <div class="q-gutter-md row items-start">
                    <div class="text-h6"><q-icon :name="formHeader.icon"/> Formulário de {{ formHeader.label }} </div>
                    <q-space />
                    <q-input v-model="formFilterText" outlined rounded dense type="text" label="filtrar campos" style="max-width: 180px" class="" v-if="filterFields">
                        <template v-slot:append>
                            <q-icon name="search"/>
                            <q-icon v-if="formFilterText !== ''" name="close" @click="formFilterText = ''" class="cursor-pointer" />
                            
                        </template>
                    </q-input>
                </div>
                
                <!--div class="q-gutter-y-md" style="max-width: 400px">
                    <q-tabs
                        v-model="tab"
                        inline-label
                        class=""
                        dense
                    >
                        <q-tab name="article" label="ABA 1" icon="article" />
                        <q-tab name="alarms" label="ABA 2" icon="rocket_launch" />
                        <q-space />
                        <q-btn-dropdown auto-close stretch flat icon="more" label="More...">
                        <q-list>
                            <q-item clickable @click="tab = 'movies'">
                            <q-item-section>Movies</q-item-section>
                            </q-item>

                            <q-item clickable @click="tab = 'photos'">
                            <q-item-section>Photos</q-item-section>
                            </q-item>
                        </q-list>
                        </q-btn-dropdown>
                    </q-tabs>
                </div-->
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div :class=" displayInline ? 'q-gutter-md row items-start' : 'q-gutter-md' " >
                    <div v-for="(input, k) in vwForm" :key="input.name">

                        <!--q-radio
                            v-if="input.type == 'radio' "
                            v-model="formModel[input.name]"
                            :val="input.options[0].value"
                            :label="input.label"
                        /-->
                        
                        <q-select
                            v-if="input.type == 'select' "
                            v-model="formModel[input.name]"
                            :options="input.options"
                            rounded
                            outlined
                            dense
                            bottom-slots
                        >
                            <template v-slot:hint>

                                <span :class="validationErrorFields.filter( el => el.field == input.name && formModel[input.name] == '' ).map( el => el.message )[0] ? 'text-negative' : '' ">
                                    {{ input.label + (input.required ? ' *' : '')  }}
                                </span>
                                <br v-if="validationErrorFields.filter( el => el.field == input.name ).map( el => el.message )[0]" />
                                <span class="text-negative">
                                    {{ validationErrorFields.filter( el => el.field == input.name && formModel[input.name] == '').map( el => el.message )[0] }}
                                </span>
                                
                            </template>

                        </q-select>


                        <q-input
                            v-else
                            size="12"
                            v-model="formModel[input.name]"
                            rounded
                            outlined
                            :label="'' /*input.label + (input.required ? ' *' : '') */"
                            :type="input.type"
                            :readonly="input.readonly || action == 'show' || action == 'delete'"
                            dense
                            bottom-slots
                            :autocomplete="'new-password' /*remove autocomplete do browser, acontece muito com usuario e senha e atrapalha*/"
                        >
                            <template v-slot:prepend>
                                <!--q-badge color="grey" text-color="" floating>{{ input.sequence }}</q-badge-->
                                <q-icon :name="input.icon || 'description' " @click="copyInput(input.label, formModel[input.name])"/>
                            </template>

                            <template v-slot:append>
                                <q-icon v-if="formModel[input.name] !== '' && !input.readonly && ( action == 'create' || action == 'edit' ) " name="close" @click="formModel[input.name] = ''" class="cursor-pointer" />
                                 <!--
                                    Dialog Busca 'search' type table abaixo!
                                -->
                                <q-icon
                                    v-if="input.type == 'table'"
                                    name="search"
                                    color=""
                                    @click="
                                        tableDialogAtivo = true,
                                        tableDialogName = input.tableName,
                                        columnDialogName = input.name
                                        //openDialogSearch(input.tableName)
                                    "
                                class="cursor-pointer"  />
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
                    <!--
                    <q-btn icon="file_copy" rounded outline align="right" class="" color="primary" label="Copiar área Tranferência" />
                    <q-btn icon="download" rounded outline align="right" class="" color="primary" label="Baixar" />
                    -->
                    <q-btn icon="clear" rounded outline align="right" class="" color="warning" label="Reset" @click="createFormModel"/>
                    <q-btn icon="check" rounded outline align="right" class="" color="positive" label="Confirmar" @click="confirmForm"/>
                </div>
            </q-card-section>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, defineAsyncComponent  } from 'vue'
import { copyToClipboard, useQuasar, AppFullscreen  } from 'quasar'
import DynamicComponent from './DynamicComponent.vue'
import { useStore } from 'vuex'

//import { addUser, getForm } from '../../repositories/usuario.js'
export default defineComponent({
  name: 'Cadastro',
  components: {
        //tabelaConsulta: defineAsyncComponent(() => import('../pages/grupos/Grid.vue')),
        DynamicComponent
    },
  props: {
    action: { type: String, default: '' }, // create || edit || show || delete
    primaryKeyValue: { type: String },
    form: { type: Object, required: true },
    filterFields: { type: Boolean, default: true },
    displayInline: { type: Boolean, default: true },
    formValues: [], //only edit
    submit: { type: Function  }
  },
  emits: ["update:table"],
  setup(props, { emit }) {
        const $q = useQuasar()
        const $store = useStore()
        
        //const id = Date.now() //id unico


        const tab = ref(null)
        let formHeader = ref({})
        const form = ref([])
        const formFilterText = ref('')
        const formModel = ref({}) 
        const vwForm = computed( () => form.value.filter( el => el.label.toLowerCase().indexOf(formFilterText.value.toLowerCase()) > -1 ) )
        const validationErrorFields = ref([])
        //const tabelaConsulta = ref({})
        const tableDialogAtivo = ref(false)
        const tableDialogName = ref(null)
        const columnDialogName = ref(null)
        const maximizedToggle = ref(false)

        //const selected = ref([])
        
        const selected = computed({
            get: () => {                
                if($store.state.caixaSelecao.singleRowSelected.length > 0){
                    let rs = $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == tableDialogName.value )
                    if(rs.lenght > 0 && rs[0]['row']){
                        return $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == tableDialogName.value )[0]['row']
                    }else{
                        return []
                    }
                }else{
                    return []
                }
            },
            set: val => {
                $store.commit('caixaSelecao/setSingleRowSelected', val)
                //$store.commit('caixaSelecao/setSingleRowSelected', {table: tableDialogName.value, primaryKeyName: 'id',  row: val[0]})
            }
        })
        
        function getDialogResult(){
            //console.log('selected')
            //console.log(selected.value)
            let inputName = columnDialogName.value
            let rs = $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == tableDialogName.value )[0]['row']
            formModel.value[inputName] = rs[0].id
        }

        function importTabelaConsulta(name){
            //tabelaConsulta.value = () => import(name + '/Index.vue')
            //tabelaConsulta.value = defineAsyncComponent( () => import('../pages/grupos/Index.vue') )
            //tabelaConsulta.value = defineAsyncComponent(() => import('../pages/grupos/Index.vue'))
        }
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
            
            //console.log('action')
            console.log('action: ', props.action)
            //alert(props.action)

            let objModel = {}
            for(let i = 0, len = form.value.length; i < len; i++){
                let item = form.value[i]
                if(props.action == 'create'){
                    if(item.default){
                        objModel[item.name] = item.default
                    }else{
                        objModel[item.name] = ''
                    }
                }else/* if(props.action == 'edit' || props.action == 'show' || props.action == 'delete')*/{
                    if(item.type == 'date' && item.value){
                        objModel[item.name] = item.value.substring(0, 10)
                    }else if(item.type == 'select'){
                        objModel[item.name] = item.options.filter( el => el.value == item.value )[0]
                    }else{
                        objModel[item.name] = item.value
                    }
                    
                }
          
                
            }
            formModel.value = objModel
            
            /*
            let fieldNames = form.value.map( el => el.name )
            let objModel = {}
            fieldNames.forEach( el => (objModel[el] = '') )
            formModel.value = objModel
            */
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
                let rs = null
                if(props.action == 'create'){
                    rs = await props.submit(formModel.value)
                }else if(props.action == 'edit'){
                    rs = await props.submit(props.primaryKeyValue, formModel.value)
                }else if(props.action == 'delete'){
                    rs = await props.submit(props.primaryKeyValue)
                }

                if(!rs) return

                if(rs.length > 0 || rs.status == 'success'){
                    let msg = `Formulário enviado com sucesso!`
                    $q.notify({message: msg, color: 'primary', icon: 'mail'})

                    emit("update:table", true);
                    createFormModel()//limpa formulario
                    
                    //tableDialogAtivo.value = false

                }else{
                    let msg = `Algo deu errado`
                    $q.notify({message: msg, color: 'negative', icon: 'info'})
                }
                //createFormModel()//limpa formulario
                validationErrorFields.value = []//limpa erros de validação
                //tableDialogAtivo.value = false
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
            validationErrorFields,
            importTabelaConsulta,
            //tabelaConsulta,
            tableDialogAtivo,
            tableDialogName,
            columnDialogName,
            selected,
            tab,
            getDialogResult,
            maximizedToggle
        }
  }
})
</script>