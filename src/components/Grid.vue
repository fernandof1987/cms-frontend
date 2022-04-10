<template>
  <div class="no-box-shadow" style="margin: -16px">


    <q-dialog v-model="filtroAvancadoDialog">

      <q-card style= 'max-width: 50vw;' bordered >
          <q-bar class="bg-primary text-white">

            <div class="text-h6">Filtro Avançado</div>

            <q-space />

            <q-btn
              dense
              round
              flat
              :icon="maximizedToggle ? 'minimize' : 'crop_square'"
              @click="maximizedToggle = !maximizedToggle"
              :disable="false"
            >
              <q-tooltip v-if="maximizedToggle" class="">Restaurar</q-tooltip>
              <q-tooltip v-else class="">Maximizar</q-tooltip>
            </q-btn>
            
            <q-btn icon="close" flat round dense v-close-popup>
              <q-tooltip class="">Fechar</q-tooltip>
            </q-btn>

          </q-bar>
  

          <q-card-section class="q-pt-none ">
            (<br />
              Filtro De: <q-input outlined rounded  dense type="text" />
              Filtro Ate: <q-input outlined rounded dense type="text" />
            )<br />

            ou<br />

            (<br />
              Filtro De: <q-input outlined rounded dense type="text" />
              Filtro Ate: <q-input outlined rounded dense type="text" />
            )<br />          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      


                  
    </q-dialog>
    
    <q-dialog v-model="showDialogButton" :maximized="maximizedToggle">
      <q-card
        :style="maximizedToggle ? 'max-width: 99vw;' : 'max-width: 90vw;'"
        bordered
      >
        <q-bar class="bg-primary text-white">
          
          <!--q-icon name="laptop_chromebook" /-->

          <!--div>Descricao.</div-->

          <q-space />

          <q-btn
            dense
            round
            flat
            :icon="maximizedToggle ? 'minimize' : 'crop_square'"
            @click="maximizedToggle = !maximizedToggle"
            :disable="false"
          >
            <q-tooltip v-if="maximizedToggle" class="">Restaurar</q-tooltip>
            <q-tooltip v-else class="">Maximizar</q-tooltip>
          </q-btn>

          <q-btn icon="close" flat round dense v-close-popup>
            <q-tooltip class="">Fechar</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="">
          <!--DynamicComponent :pageName="`pages/${tableDialogName}/Grid.vue`"></DynamicComponent-->
          <DynamicComponent
            folder="pages"
            :file="name + '/Form.vue'"
            :key="name"
            :componentsProps="{
              action: formAction,
              primaryKeyValue: primaryKeyValue,
              tableIdSelection: tableIdSelection
            }"
            @update:table="refreshGrid($event)"
          >
          </DynamicComponent>
        </q-card-section>

      </q-card>
    </q-dialog>

    <q-table
      :title="label"
      :rows="rows"
      :columns="columns"
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

          <q-btn dense flat :label = "label" icon-right="refresh" @click="onRequest(null)">
            <q-tooltip>
              Atualizar Tabela
            </q-tooltip>
          </q-btn>

          <q-btn
            size="sm"
            v-for="(button, index) in buttonActions"
            dense
            outline
            @click="
              //$router.push(`/${name}/create`)
              (formAction = 'create'), (showDialogButton = true)
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
              (formAction = button.action),
              (primaryKeyValue = selected.length > 0 && selected[0][primaryKey] != undefined ? selected[0][primaryKey] : null),
              (showDialogButton = true)
            "
            :key="index"
            color="secondary"
            :label="button.label + '(' + selected[0][primaryKey] + ')'"
            :icon="button.icon"
          />

        </div>
      </template>


      <template v-slot:header="props" v-if="fieldFilters.length">
        
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }} &nbsp;
              <q-tooltip>
                Nome Técnico: '{{ col.name }}'
              </q-tooltip>
            <q-icon :name="col.icon" size="1.5em" />
          </q-th>
        </q-tr>

        <q-tr style="padding:0">

          <q-th auto-width>
              <q-icon name="filter_alt" size="1.5em" />
          </q-th>

          <q-th
            v-for="(filter, k) in fieldFilters"
            :key="k"
            style="padding: 0; margin: 0"
          >
            <q-input
              type="text"
              :label="''/*filter.label*/"
              v-model="filter.value"
              filled
              square
              dense
              @keydown="$event.keyCode === 13 || $event.keyCode === 9 ? onRequest(null) : false"
              @blur="''/*filter.value != null ? onRequest(null) : null*/"
            >
              <template v-slot:append>

                <q-icon v-if="filter.value"  name="close" @click.stop="filter.value = null, onRequest(null)" class="cursor-pointer" size="0.8em">
                  <q-tooltip>
                    Limpar texto
                  </q-tooltip>
                </q-icon>

                <q-icon v-if="filter.value"  name="search" @click.stop="onRequest(null)" class="cursor-pointer" size="0.8em">
                  <q-tooltip>
                    Buscar ocorrências com texto "{{ filter.value }}"<br />
                    Dica: usando o caractere '%' no inicio ou fim, a busca é em qualquer parte do texto.
                  </q-tooltip>
                </q-icon>

                <q-icon name="filter_alt" class="cursor-pointer" size="0.8em" @click="filtroAvancado">
                  <q-tooltip>
                    Filtro Avançado<br />
                    Bloqueado
                  </q-tooltip>
                </q-icon>

              </template>

            </q-input>
          </q-th>
        </q-tr>
      </template>


       <template v-slot:bottom-row="props" v-if="summarableResults.length > 0">
        <q-tr :props="props">
          
          <q-td auto-width>Totais</q-td>
          
          <q-td v-for="col in props.cols" :key="col.name" >
            <!--q-icon name="person" size="1.5em" /-->
            <span class="float-right">{{ summarableResults[0][col.name] }}</span>
          </q-td>
          
        </q-tr>
        
      </template>


    </q-table>

  </div>
</template>

<script>
//Vue 3 is having a special function to define these async functions

import { ref, computed, nextTick, watch, onUnmounted } from "vue";
import { useStore } from "vuex";

import DynamicComponent from "./DynamicComponent.vue";

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
    fieldFilters: { type: Array, default: [] },
    columns: { type: Array, default: [] },
    summarableResults: { type: Array, default: [] },
    //tableIdSelection: { type: String, default: ( Math.random().toString(36).slice(2) ) },
    //selected: { type: Array, default: [] } //emit event
    /*
    page: { type: Number },
    rowsPerPage: { type: Number },
    rowsNumber: { type: Number }
    */
  },
  emits: ["update:pagination", "update:selected", "update:fieldFilters"],
  setup(props, { emit }) {
    const $store = useStore();
    const tableRef = ref(null);

    const tableIdSelection = ref(Math.random().toString(36).slice(2))

    onUnmounted(() => {
      $store.commit("caixaSelecao/removeSingleRowSelected", {
          table: props.name,
          primaryKeyName: props.primaryKey,
          //row: val,
          id: tableIdSelection.value
        });
    })

    console.log('tableLabel: ' + props.label, 'tableIdSelection: ' + tableIdSelection.value)
    //console.log('tableIdSelection: ', tableIdSelection.value)

    //const selected = ref(props.selected)

    //const pagination = ref(props.pagination)

    function onRequest(tableProps = null) {
      //console.log('update:pagination')
      if (tableProps != null) {
        console.log("props table");
        console.log(tableProps);
        //emit("update:pagination", props.pagination);
       
        emit("update:pagination", tableProps.pagination);
      }


      $store.commit("caixaSelecao/removeSingleRowSelected", {
        table: props.name,
        primaryKeyName: props.primaryKey,
        //row: val,
        id: tableIdSelection.value
      });
      emit("update:fieldFilters", props.fieldFilters);
    }

    const showDialogButton = ref(false);
    const formAction = ref("");
    const primaryKeyValue = ref("");
    const maximizedToggle = ref(false);

    const navigationActive = ref(false);

    const filtroAvancadoDialog = ref(false);

    function refreshGrid(evt){
      //console.log('AQUIUIUIUIUI')
      //console.log(evt)      
      emit("update:fieldFilters", props.fieldFilters);
      //remover caixa de selecao
      showDialogButton.value = false;
      $store.commit("caixaSelecao/removeSingleRowSelected", {
          table: props.name,
          primaryKeyName: props.primaryKey,
          //row: val,
          id: tableIdSelection.value
        });
    }

    function filtroAvancado(){
      filtroAvancadoDialog.value = !filtroAvancadoDialog.value;
      //console.log('filtroAvancadoDialog', filtroAvancadoDialog)
    }
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

    function activateNavigation() {
      navigationActive.value = true;
    }

    function deactivateNavigation() {
      navigationActive.value = false;
    }

    const selected = computed({
      get: () => {
        if ($store.state.caixaSelecao.singleRowSelected.length > 0) {
          let rs = $store.state.caixaSelecao.singleRowSelected.filter(
            (el) => el.table == props.name && el.id == tableIdSelection.value
          );
          //let rs = $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == id )
          if (rs.length > 0 && rs[0].row) {
            return $store.state.caixaSelecao.singleRowSelected.filter(
              (el) => el.table == props.name && el.id == tableIdSelection.value
            )[0]["row"];
            //return $store.state.caixaSelecao.singleRowSelected.filter( el => el.table == id )[0]['row']
          } else {
            return [];
          }
        } else {
          return [];
        }
      },
      set: (val) => {
        /*
        console.log('caixaSelecao/setSingleRowSelected: ', {
          table: props.name,
          primaryKeyName: props.primaryKey,
          row: val,
          id: tableIdSelection.value
        })
        */
        $store.commit("caixaSelecao/setSingleRowSelected", {
          table: props.name,
          primaryKeyName: props.primaryKey,
          row: val,
          id: tableIdSelection.value
        });
        //$store.commit('caixaSelecao/setSingleRowSelected', {table: id, primaryKeyName: props.primaryKey,  row: val})
      },
    });

    async function onKey(evt) {
      console.log('navigationActive.value !== true', navigationActive.value !== true)
      console.log('[33, 34, /*35, 36*/, 38, 40].indexOf(evt.keyCode) === -1', [33, 34, /*35, 36*/, 38, 40].indexOf(evt.keyCode) === -1)
      console.log('tableRef.value === null', tableRef.value === null)

      console.log('navigationActive.value', navigationActive.value)
      console.log('[33, 34, /*35, 36*/, 38, 40].indexOf(evt.keyCode)', [33, 34, /*35, 36*/, 38, 40].indexOf(evt.keyCode))
      console.log('tableRef.value', tableRef.value)
      
      
      if (
        navigationActive.value !== true ||
        [33, 34, 38, 40].indexOf(evt.keyCode) === -1 ||
        tableRef.value === null
      ) {
        return;
      }
      

      evt.preventDefault();

      const { computedRowsNumber, computedRows } = tableRef.value;

      if (computedRows.length === 0) {
        return;
      }

      const currentIndex =
        selected.value.length > 0
          ? computedRows.indexOf(selected.value[0])
          : -1;
      const currentPage = props.pagination.page;
      const rowsPerPage =
        props.pagination.rowsPerPage === 0
          ? computedRowsNumber
          : props.pagination.rowsPerPage;
      const lastIndex = computedRows.length - 1;
      const lastPage = Math.ceil(computedRowsNumber / rowsPerPage);

      let index = currentIndex;
      let page = currentPage;

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
          console.log('38 ArrowUp')
          if (currentIndex <= 0) {
            page = currentPage <= 1 ? lastPage : currentPage - 1;
            index = rowsPerPage - 1;
          } else {
            index = currentIndex - 1;
          }
          break;
        case 40: // ArrowDown
          console.log('40 ArrowDown')
          if (currentIndex >= lastIndex) {
            page = currentPage >= lastPage ? 1 : currentPage + 1;
            index = 0;
          } else {
            index = currentIndex + 1;
          }
          break;
      }
      //console.log(props.pagination)


      /*
      if (page !== props.pagination.page) {
        props.pagination.page = page;
        emit("update:pagination", props.pagination);

        //tem que esperar o evento do emit para dar certo, ta selecionando dados da paginacao anterior
        setTimeout(() => {
          nextTick(() => {
            const { computedRows } = tableRef.value;
            //console.log('tableRef.value')
            //console.log(index)
            //console.log(computedRows)
            selected.value = [
              computedRows[Math.min(index, computedRows.length - 1)],
            ];
          });
        }, 600);
      } else {
        selected.value = [computedRows[index]];
      }
      */
        selected.value = [computedRows[index]];

    }

    return {
      tableRef,

      filter: ref(""),
      selected,
      showDialogButton,
      formAction,
      primaryKeyValue,
      maximizedToggle,
      //pagination,

      onRequest,
      activateNavigation,
      deactivateNavigation,
      onKey,
      refreshGrid,
      filtroAvancado,
      filtroAvancadoDialog,
      tableIdSelection
    };
  },
};
</script>

<style >
.my-focused-table {
  box-shadow: 0 0 4px 4px #ccc;
  outline: 0;
}
</style>