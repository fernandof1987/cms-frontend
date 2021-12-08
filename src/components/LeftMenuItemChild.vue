<template>
    <q-expansion-item style="background-color: rgba(0, 0, 0, 0.1)"
        v-for="(item, k) in items"
        :key=k
        expand-separator
        :icon="item.icon"
        :label="item.label"
      >
        <left-menu-item
          v-for="(child, k) in item.child"
          :key="k"
          v-bind="child"
        >
        </left-menu-item>
    </q-expansion-item>      
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

//import LeftMenuItem from 'components/LeftMenuItem.vue'

export default defineComponent({
  name: 'LeftMenuItemChild',
  components: {
      LeftMenuItem: defineAsyncComponent( () => import('components/LeftMenuItem.vue') )       //resolve dependencia circular
  },
  props: ['items'],
  
})
</script>
