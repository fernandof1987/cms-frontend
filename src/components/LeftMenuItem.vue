<template>
    <q-expansion-item v-if="child"
        expand-separator
        :icon="icon"
        :label="label"
      >
      <LeftMenuItemChild v-if="child" :items="child"></LeftMenuItemChild>
    </q-expansion-item>

    <q-item v-else-if="link" clickable tag="a" target="" :href="link" style="background-color: rgba(0, 0, 0, 0.1)">
      <q-item-section  avatar >
        <q-icon :name="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
      </q-item-section>
    </q-item>
    
    <q-item v-else clickable tag="a" target="" disabled>
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

import LeftMenuItemChild from 'components/LeftMenuItemChild.vue'

export default defineComponent({
  name: 'LeftMenuItem',
  components: { LeftMenuItemChild },
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
