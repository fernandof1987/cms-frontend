<template>
    <q-expansion-item v-if="child" dense-toggle
        expand-separator
        :icon="icon"
        :label="label"
        dense
      >
      <!--LeftMenuItemChild v-if="child" :items="child"></LeftMenuItemChild-->
      <LeftMenuItem v-for="(item, k) in child" :key="k" v-bind="item" style="background-color: rgba(0, 0, 0, 0.04)"></LeftMenuItem>
    </q-expansion-item>

    <q-item v-else-if="link" clickable tag="a" target="" :href="link" dense>
      <q-item-section  avatar >
        <q-icon :name="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label >{{ label }}</q-item-label>
      </q-item-section>
    </q-item>
    
    <q-item v-else clickable tag="a" target="" disabled dense>
      <q-item-section  avatar >
        <q-icon :name="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
      </q-item-section>
    </q-item>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LeftMenuItem',
  props: {
    label: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    child: {
        type: Array,
        default: null
    },
    isChild: {
      type: Boolean,
      default: false
    }
  }
})
</script>
