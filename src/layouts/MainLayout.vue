<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
              
          Quasar App
        </q-toolbar-title>
          <q-btn
            flat
            round
            :color="$q.dark.isActive ? 'black' : 'white' "
            :icon="$q.dark.isActive ? 'nightlight_round' : 'brightness_low'"
            @click="$q.dark.toggle()"
          />
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :mini-to-overlay="false"

    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container >
      <router-view class="q-pa-md"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'home page',
    icon: 'home',
    link: '/#'
  },
   {
    title: 'Cadastro Embedded Apps',
    caption: 'aplicações externas',
    icon: 'article',
    link: '/#/cadastro_embedded'
  },
     {
    title: 'Lista Embedded Apps',
    caption: 'aplicações externas',
    icon: 'subject',
    link: '/#/lista_embedded'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const miniState = ref(true)


    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
