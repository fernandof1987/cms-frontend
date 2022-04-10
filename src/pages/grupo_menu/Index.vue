<template>
  <div class="q-pa-md q-gutter-sm">
    <span class="text-h6">
      Grupo x Menu
    
      <q-btn
        color="primary"
        dense
        size="sm"
        
        label="Vizualizar Novo Menu"
        @click="refreshTree"
      />
    </span>

    <br />

    ticked: {{ ticked }}

    <q-separator />

    <q-splitter v-model="splitterModel" style="">
      <template v-slot:before>
        <q-tree
          class="col-12 col-sm-6"
          :nodes="menuTree"
          v-model:ticked="ticked"
          node-key="id"
          :tick-strategy="tickStrategy"
          default-expand-all
          @update:selected="onNodeClick"
        />
      </template>

      <template v-slot:after>
        <q-tree :nodes="recursiveTopDownTree(subTree)" node-key="id" />
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

//import Form from './Form.vue'

import repository from "../../repositories/menu.js";

export default {
  components: {},
  setup() {
    const menu = [];
    const menuTree = ref([]);
    const subTree = ref([]);

    const ticked = ref([]);
    const tickStrategy = ref("leaf");

    const splitterModel = ref(50); // start at 50%

    function onNodeClick(node) {
      alert("onNodeClick");
      console.log("node click", node);
    }

    onMounted(async () => {
      getTree();
      getMenu();
    });

    function getEvent(event) {
      if (event) {
        getTree();
      }
    }

    async function getTree() {
      menuTree.value = await repository.menuTree();
      menuTree.value = menuTree.value.sort((a, b) => (a.id > b.id ? 1 : -1)); // Ordenação
    }

    async function getMenu() {
      let data = await repository.get(1, 10000000);
      menu.push(...data.results);
    }

    function refreshTree() {
      crossTree();
    }

    function crossTree() {
      subTree.value = [];
      if (menu.length === 0) return []; //se não tem menuTree, não tem subTree
      let full = [...menu];
      for (let i = 0, len = full.length; i < len; i++) {
        let item = full[i];
        let subTreeId = ticked.value.find((el) => el === item.id);
        if (subTreeId) {
          subTree.value.push(item);
          pushParentTree(item.parent_id);
        }
      }
    }

    function pushParentTree(parentId) {
      let parent = menu.find((el) => el.id === parentId);

      if (parent) {
        let checkExist = subTree.value.find((el) => el.id == parent.id);

        if (checkExist == undefined || checkExist == null) {
          subTree.value.push(parent);

          if (parent.parent_id) {
            pushParentTree(parent.parent_id);
          }
        }
      }
    }

    function recursiveTopDownTree(_menu = [], parent_id = 0) {
      let data = _menu.slice();
      let tree = [];
      for (let i = 0; i < data.length; i++) {
        let item = { ...data[i] };
        if (item.frontend_url) {
          item.link = "/#" + item.frontend_url;
        }
        if (item.parent_id == parent_id) {
          let children = recursiveTopDownTree(data, item.id);
          if (children.length > 0) {
            item.children = children;
          }
          tree.push(item);
        }
      }
      return tree.sort((a, b) => (a.id > b.id ? 1 : -1));
    }

    return {
      menuTree,
      getEvent,
      ticked,
      tickStrategy,
      onNodeClick,

      subTree,
      refreshTree,
      splitterModel,
      recursiveTopDownTree,
    };
  },
};
</script>
