<template>
    <div>
        <q-table
            :title="label"
            :rows="rows"
            
            ref="tableRef"
            :class="tableClass"
            tabindex="0"
            :row-key="primaryKey"
            selection="single"
            v-model:selected="selected"
            :filter="filter"

        >
            <template v-slot:top-left >

                <span class="text-h6">{{ label }}</span><br />

                <div class="q-gutter-sm">
                    <q-btn
                        v-for="(button, index) in buttonActions"
                        dense
                        @click="$router.push('/grupos/create')"
                        :key="index"
                        color="primary"
                        :label="button.label"
                        :icon="button.icon"
                    />

                    <q-btn
                        v-for="(button, index) in buttonRowActions"
                        dense
                        @click="$router.push('/grupos/edit/' + selected[0].id)"
                        :key="index"
                        color="secondary"
                        :label="button.label"
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
        selected: {{ selected }}

    </div>
</template>

<script>
//Vue 3 is having a special function to define these async functions

import { ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'

export default {
 name: "Table",
 //I am passing the name of the Component as a prop
 props: {
    name: { type: String },
    label: { type: String },
    icon: { type: String },
    primaryKey: { type: String },
    buttonActions: { type: Array, default: [] },
    buttonRowActions: { type: Array, default: [] },
    buttonRowActions: [],
    rows: { type: Array, default: [] }, // create || edit
},
setup(props) {
    const $store = useStore()
    const tableRef = ref(null)

    //const selected = ref([])
    const selected = computed({
        get: () => {
            //console.log('props.name', props.name)
            //console.log($store.state.caixaSelecao.singleRowSelected.filter( el => el.table == props.name ))
            //console.log($store.state.caixaSelecao.singleRowSelected)//.filter( el => el.table == props.name ))
            //return $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == props.name )
            return $store.state.caixaSelecao.singleRowSelected
        },
        set: val => {
            //$store.commit('caixaSelecao/setSingleRowSelected', { table: props.name, primaryKey: props.primaryKey, row: val[0] })
            $store.commit('caixaSelecao/setSingleRowSelected', val)
        }
    })
    /*
    const selected = computed({
        get: () => {
            console.log($store.state.caixaSelecao.singleRowSelected)
            return $store.state.caixaSelecao.singleRowSelected
        },
        set: val => {
            $store.commit('caixaSelecao/setSingleRowSelected', val)
        }
    })
    */
    return {
      tableRef,

      filter: ref(''),
      selected,
      
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