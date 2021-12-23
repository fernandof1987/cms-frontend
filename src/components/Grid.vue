<template>
  <div class="no-box-shadow" style="margin: -16px">

        <q-dialog v-model="showDialogButton" :maximized="maximizedToggle" >
            <q-card :style=" maximizedToggle ? 'max-width: 99vw;' : 'max-width: 90vw;' " bordered>

                <q-bar class="bg-primary text-white">

                    <q-icon name="laptop_chromebook" />

                    <!--div>Descricao.</div-->
                    
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
            class="no-box-shadow"
            ref="tableRef"
            tabindex="0"
            :row-key="primaryKey"
            selection="single"
            v-model:selected="selected"
            v-model:pagination="pagination"
            :filter="filter"
            @request="onRequest"
            binary-state-sort

            @focusin="activateNavigation"
            @focusout="deactivateNavigation"
            @keydown="onKey"

            :loading="loading"

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

import { ref, computed, nextTick, watch } from 'vue'
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
    loading: { type: Boolean, default: false },

    pagination: { type: Object }, //emit event
    //selected: { type: Array, default: [] } //emit event
    /*
    page: { type: Number },
    rowsPerPage: { type: Number },
    rowsNumber: { type: Number }
    */
},
emits: ['update:pagination', 'update:selected'],
setup(props, { emit }) {
    const $store = useStore()
    const tableRef = ref(null)

    //const selected = ref(props.selected)

    //const pagination = ref(props.pagination)

    function onRequest(tableProps){
        //console.log('update:pagination')
        console.log('props table')
        console.log(tableProps)
        //emit("update:pagination", props.pagination);
        emit("update:pagination", tableProps.pagination);
    }

    const showDialogButton = ref(false)
    const formAction = ref('')
    const primaryKeyValue = ref('')
    const maximizedToggle = ref(false)

    const navigationActive = ref(false)


    /*
    watch(selected, (currentValue, oldValue) => {
        //console.log(oldValue);
        //console.log(currentValue);
        console.log("update:selected", selected.value)
        emit("update:selected", selected.value)
    });
    */

    //const paginationWatch = ref(props.pagination)

    /*
    watch(paginationWatch, (currentValue, oldValue) => {
        //console.log(oldValue);
        //console.log(currentValue);
        console.log("update:pagination", props.pagination)
        emit("update:pagination", props.pagination);
    });
    */
   

    //const selected = ref([])

    function activateNavigation () {
        navigationActive.value = true
    }

    function deactivateNavigation () {
        navigationActive.value = false
    }

    
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

    async function onKey (evt) {
        if (
          navigationActive.value !== true ||
          [ 33, 34, 35, 36, 38, 40 ].indexOf(evt.keyCode) === -1 ||
          tableRef.value === null
        ) {
          return
        }

        evt.preventDefault()

        const { computedRowsNumber, computedRows } = tableRef.value

        if (computedRows.length === 0) {
          return
        }

        const currentIndex = selected.value.length > 0 ? computedRows.indexOf(selected.value[ 0 ]) : -1
        const currentPage = props.pagination.page
        const rowsPerPage = props.pagination.rowsPerPage === 0 ? computedRowsNumber : props.pagination.rowsPerPage
        const lastIndex = computedRows.length - 1
        const lastPage = Math.ceil(computedRowsNumber / rowsPerPage)

        let index = currentIndex
        let page = currentPage

        switch (evt.keyCode) {
          /*  
          case 36: // Home
            page = 1
            index = 0
            break
          case 35: // End
            page = lastPage
            index = rowsPerPage - 1
            break
          case 33: // PageUp
            page = currentPage <= 1 ? lastPage : currentPage - 1
            if (index < 0) {
              index = 0
            }
            break
          case 34: // PageDown
            page = currentPage >= lastPage ? 1 : currentPage + 1
            if (index < 0) {
              index = rowsPerPage - 1
            }
            break
           */
          case 38: // ArrowUp
            if (currentIndex <= 0) {
              page = currentPage <= 1 ? lastPage : currentPage - 1
              index = rowsPerPage - 1
            }
            else {
              index = currentIndex - 1
            }
            break
          case 40: // ArrowDown
            if (currentIndex >= lastIndex) {
              page = currentPage >= lastPage ? 1 : currentPage + 1
              index = 0
            }
            else {
              index = currentIndex + 1
            }
            break
        }
        //console.log(props.pagination)
        
        if (page !== props.pagination.page) {
          props.pagination.page = page
          emit("update:pagination", props.pagination)

          //tem que esperar o evento do emit para dar certo, ta selecionando dados da paginacao anterior
          setTimeout( () => {
            nextTick(() => {
                const { computedRows } = tableRef.value
                //console.log('tableRef.value')
                //console.log(index)
                //console.log(computedRows)
                selected.value = [computedRows[ Math.min(index, computedRows.length - 1) ]]
            })
          }, 300)
        }
        else {
          selected.value = [computedRows[ index ]]
        }
      }
    
    
    
    return {
      tableRef,

      filter: ref(''),
      selected,
      showDialogButton,
      formAction,
      primaryKeyValue,
      maximizedToggle,
      //pagination,

      onRequest,
      activateNavigation,
      deactivateNavigation,
      onKey
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