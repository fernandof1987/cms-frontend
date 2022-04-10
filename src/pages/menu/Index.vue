<template>
  <div class="q-pa-md q-gutter-sm">
    
    <span class="text-h6">Estrutura do menu geral em árvore</span>
    
     <q-dialog v-model="modalForm">

      <q-card style= 'max-width: 50vw;' bordered >
          <q-bar class="bg-primary text-white">

            <div class="text-h6"></div>

            <q-space />

            <q-btn icon="close" flat round dense v-close-popup>
              <q-tooltip class="">Fechar</q-tooltip>
            </q-btn>

          </q-bar>
  

        <q-card-section class="q-pt-none ">
            <Form :action="actionForm" :primaryKeyValue="primaryKeyValueForm" @update:table="getEvent($event)"></Form>
        </q-card-section>

          <q-card-actions align="right" class="">
            <!--q-btn flat label="OK" v-close-popup /-->
          </q-card-actions>
        </q-card>
           
    </q-dialog>

    <q-input ref="filterRef" outlined dense v-model="filter" label="Filtro" style="width: 300px">
      <template v-slot:append>
        <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="filter = '' " />
        <q-icon name="search" />
      </template>
    </q-input>

    <q-btn size="" dense flat round color="positive" icon="add" @click="actionForm='create', primaryKeyValueForm = null, modalForm = true">
        <q-tooltip class="">Adicionar item na raiz do menu</q-tooltip>
    </q-btn>

    <q-tree
      :nodes="menuTree"
      default-expand-all
      selected="false"
      node-key="label"
      :filter="filter"
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
            
            <q-icon :name="prop.node.icon || ''" />&nbsp;&nbsp;&nbsp;
            <div class="">
              {{ prop.node.id }} - {{ prop.node.label }} ({{ prop.node.children && prop.node.children.length > 0 ? prop.node.children.length : 0 }})
              <q-tooltip class="">{{ prop.node.label }} Tipo {{ prop.node.tipo == 1 ? '1 - Folder' : prop.node.tipo == 2 ? '2 - App' : '3 - Action' }}</q-tooltip>
            </div>&nbsp;&nbsp;&nbsp;


            <q-btn
              v-if="prop.node.tipo != 3"
              size="xs" dense flat round color="positive" icon="add"    @click="actionForm='create', primaryKeyValueForm = null, modalForm = true"
            >
              <q-tooltip class="">Adicionar Subitem em {{ prop.node.tipo == 1 ? 'Folder' : prop.node.tipo == 2 ? 'App' : 'Action' }} {{ prop.node.label }}</q-tooltip>
            </q-btn>

            <q-btn size="xs" dense flat round color="primary"  icon="edit"   @click=" actionForm='edit',  primaryKeyValueForm = prop.node.id, modalForm = true">
                <q-tooltip class="">Editar {{ prop.node.tipo == 1 ? 'Folder' : prop.node.tipo == 2 ? 'App' : 'Action' }} {{ prop.node.label }}</q-tooltip>
            </q-btn>

            <q-btn
              v-if="prop.node.children == undefined"
              size="xs" dense flat round color="negative" icon="remove" @click="actionForm='delete', primaryKeyValueForm = prop.node.id, modalForm = true">
                  <q-tooltip class="">Remover {{ prop.node.tipo == 1 ? 'Folder' : prop.node.tipo == 2 ? 'App' : 'Action' }} {{ prop.node.label }}</q-tooltip>
            </q-btn>

          
        </div>
      </template>

      <!--template v-slot:default-body="prop">
        <div v-if="prop.node.story">
          <span class="">This node has a story</span>:
          {{ prop.node.story }}teste
        </div>
        <span v-else class="text-weight-light text-black"
          >This is some default content.</span
        >
      </template-->
    </q-tree>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import Form from './Form.vue'

import repository from "../../repositories/menu.js";

export default {
  components: {Form},
  setup() {
    const selected = ref(null)
    const modalForm = ref(false)
    const menuTree = ref([])
    const filter = ref('')

    const actionForm = ref('create')
    const primaryKeyValueForm = ref(null)

    onMounted( async () => {
        getTree()
    } )

    function getEvent(event){
      //console.log('getEvent')
      //console.log(event)
      if(event){
        getTree()
      }     
    }

    async function getTree(){
        //console.log(event)
        //@update:table="refreshGrid($event)"
        menuTree.value = await repository.menuTree()
        menuTree.value = menuTree.value.sort((a, b) => a.id > b.id ? 1 : -1); // Ordenação
    }

    return {
      menuTree,
      selected,
      modalForm,
      filter,
      actionForm,
      primaryKeyValueForm,

      //getTree,

      getEvent,

      selectAdmin() {
        if (selected.value !== "Admin") {
          selected.value = "Admin";
        }
      },

      unselectNode() {
        selected.value = null;
      },

    };
  },
};
</script>
