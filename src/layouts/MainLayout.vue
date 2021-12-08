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
              
        Portal Cofema
        </q-toolbar-title>
        <q-space />

        <q-btn
            flat
            round
            :color="$q.dark.isActive ? 'black' : 'white' "
            :icon="$q.dark.isActive ? 'nightlight_round' : 'brightness_low'"
            @click="$q.dark.toggle()"
          />

        <q-btn-dropdown stretch flat label="Usuario" icon="account_circle">
          <q-list>
            <q-item-label header>Quasar v{{ $q.version }}</q-item-label>
            <q-item-label header>Folders</q-item-label>
            <q-item v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="folder" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Photos</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>Files</q-item-label>
            <q-item v-for="n in 3" :key="`y.${n}`" clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="assignment" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Vacation</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :mini-to-overlay="true"
      style="background-color: rgba(0, 0, 0, 0.0)"
    >
           
      <q-list bordered class="no-border">
        <left-menu-item
          v-for="(item, k) in menu"
          :key="k"
          v-bind="item"
        >
        </left-menu-item>
      </q-list>

    </q-drawer>

    <q-page-container >
      <router-view class="q-pa-md"/>
    </q-page-container>
  </q-layout>
</template>

<script>

import LeftMenuItem from 'src/components/LeftMenuItem.vue'

const menu = [
  { label: 'home', icon: 'home', link: '/#' },
  {
    label: 'Admin',
    icon: 'settings',
    child: [
      {
        label: 'Usuários',
        icon: 'people',
        child: [
          { label: 'Cadastro', icon: 'assignment', link: '/#/usuarios/create' },
          { label: 'Lista', icon: 'list', link: '/#/usuarios' },
        ]
      },
      {
        label: 'Grupos',
        icon: 'groups',
        child: [
          { label: 'Cadastro', icon: 'assignment', link: '/#/grupos/create' },
          { label: 'Lista', icon: 'list', link: '/#/grupos' },
        ]
      }
    ]
  },
  {
    label: 'Folder 1', icon: 'folder',
    child: [
        {
          label: 'Folder 2',
          icon: 'folder',
          child:
            [
              {
                label: 'Folder 3',
                icon: 'folder',
                child:
                  [
                      {
                        label: 'Folder 4',
                        icon: 'folder',
                        link: "/#"
                      }
                  ]
              }
            ]
        }
    ]
  },
  { label: 'Área do Fornecedor', icon: 'work' },
  { label: 'Área do Cliente', icon: 'how_to_reg' },
  { label: 'Área de Produtos', icon: 'category' },
  { label: 'Área de Logística', icon: 'local_shipping' },
  { label: 'Área de Marketing', icon: 'auto_awesome' },
  { label: 'Área do Financeiro', icon: 'monetization_on' },
  { label: 'Atendimento ao Cliente', icon: 'settings_phone' },
  { label: 'Área de Compras', icon: 'wysiwyg' },
  { label: 'Embedded Apps', icon: 'article', link: '/#/embedded' }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    LeftMenuItem
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const miniState = ref(true)


    return {
      menu,
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
