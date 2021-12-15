<template>
  <div class="no-box-shadow" style="margin: -16px">

        <q-dialog v-model="showDialogButton" :maximized="maximizedToggle">
            <q-card :style=" maximizedToggle ? 'max-width: 99vw;' : 'max-width: 90vw;' " bordered>

                <q-bar class="bg-primary text-white">

                    <q-icon name="laptop_chromebook" />

                    <div>Barra</div>

                    <q-space />

                    <q-btn dense round flat :icon=" maximizedToggle ? 'minimize' : 'crop_square' " @click="maximizedToggle = !maximizedToggle" :disable="false">
                        <q-tooltip v-if="maximizedToggle" class="">Restaurar</q-tooltip>
                        <q-tooltip v-else class="">Maximizar</q-tooltip>
                    </q-btn>

                    <q-btn icon="close" flat round dense v-close-popup>
                        <q-tooltip class="">Fechar</q-tooltip>
                    </q-btn>

                </q-bar>
                <!--q-card-section class="row items-center q-pb-none">
                    <div class="text-h6"></div>
                    <q-space />
                    
                    <q-btn dense flat :icon=" maximizedToggle ? 'minimize' : 'crop_square' " @click="maximizedToggle = !maximizedToggle" :disable="false">
                        <q-tooltip v-if="maximizedToggle" class="">Restaurar</q-tooltip>
                        <q-tooltip v-else class="">Maximizar</q-tooltip>
                    </q-btn>

                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section-->

                <q-card-section class="">
                    <!--DynamicComponent :pageName="`pages/${tableDialogName}/Grid.vue`"></DynamicComponent-->
                    <DynamicComponent folder="pages" :file="name + '/Form.vue'" :key="name" :componentsProps="{action: formAction, primaryKeyValue: primaryKeyValue}"></DynamicComponent>
                </q-card-section>

                <!--q-card-actions align="right">
                    <q-btn flat label="Ok" color="secondary" v-close-popup />
                </q-card-actions-->
            </q-card>
        </q-dialog>

        <q-table
            :title="label"
            :rows="rows"
            dense
            separator="cell"
            class="no-box-shadow	"
            ref="tableRef"
            tabindex="0"
            :row-key="primaryKey"
            selection="single"
            v-model:selected="selected"
            :filter="filter"

        >
            <template v-slot:top-left>

                <div class="q-gutter-sm" style="">
                    
                    <span class="text-h6" >{{ label }}</span>

                    <q-btn
                        size="sm"
                        v-for="(button, index) in buttonActions"
                        dense
                        outline
                        @click="
                            //$router.push(`/${name}/create`)
                            formAction = 'create',
                            showDialogButton = true
                        "
                        :key="index"
                        color="primary"
                        :label="button.label"
                        :icon="button.icon"
                    />
    
                    <q-btn
                        size="sm"
                        v-if="selected.length > 0"
                        v-for="(button, index) in buttonRowActions"
                        dense
                        outline
                        @click="
                            formAction = button.action,
                            primaryKeyValue = selected.length ? selected[0].id : null,
                            showDialogButton = true
                            /*
                            $router.push({
                                path: `/${name}/edit`,
                                params: { action: 'edit', primaryKeyValue: selected[0].id }
                            })
                            */
                        "
                        :key="index"
                        color="secondary"
                        :label="button.label + '(' + selected[0].id + ')'"
                        :icon="button.icon"
                    />
                </div>
                
            </template>

            <template v-slot:top-right>
                <q-input outlined rounded dense debounce="300" v-model="filter" placeholder="Busca">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

            <!--template v-slot:bottom>
              selected: {{ selected }}
            </template-->
            
        </q-table>
        <!--span>
            row selected: {{ selected }}
        </span-->

    </div>
</template>

<script>
//Vue 3 is having a special function to define these async functions

import { ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'

import DynamicComponent from './DynamicComponent.vue'


export default {
 name: "Table",
 components: { DynamicComponent },
 //I am passing the name of the Component as a prop
 props: {
    name: { type: String },
    label: { type: String },
    icon: { type: String },
    primaryKey: { type: String },
    buttonActions: { type: Array, default: [] },
    buttonRowActions: { type: Array, default: [] },
    rows: { type: Array, default: [] }, // create || edit
},
setup(props) {
    const $store = useStore()
    const tableRef = ref(null)

    //const id = Date.now() //id unico

    //console.log(id)

    const showDialogButton = ref(false)
    const formAction = ref('')
    const primaryKeyValue = ref('')
    const maximizedToggle = ref(false)

    //const selected = ref([])
    /*
    const selected = computed({
        get: () =>  $store.state.caixaSelecao.singleRowSelected,
        set: val => $store.commit('caixaSelecao/setSingleRowSelected', val)
    })
    */

    
    const selected = computed({
        get: () => {
            if($store.state.caixaSelecao.singleRowSelected.length > 0){
                let rs = $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == props.name )
                //let rs = $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == id )
                if(rs.length > 0 && rs[0].row){
                    return $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == props.name )[0]['row']
                    //return $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == id )[0]['row']
                }else{
                    return []
                }                
            }else{
                return []
            }
        },
        set: val => {
            $store.commit('caixaSelecao/setSingleRowSelected', {table: props.name, primaryKeyName: props.primaryKey,  row: val})
            //$store.commit('caixaSelecao/setSingleRowSelected', {table: id, primaryKeyName: props.primaryKey,  row: val})
        }
    })
    
    return {
      tableRef,

      filter: ref(''),
      selected,
      showDialogButton,
      formAction,
      primaryKeyValue,
      maximizedToggle
      
    }
}

}
</script>

<style >
    .my-focused-table{
        
        box-shadow: 0 0 4px 4px #ccc;
        outline: 0
        
    }
</style>