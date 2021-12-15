<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar >

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <img src="~assets/logo_cofema_branco.png" style="width: 160px; margin-top: 6px"/>
        </q-toolbar-title>
        <q-space />

        <q-btn
            flat
            round
            :color="$q.dark.isActive ? 'black' : 'white' "
            :icon="$q.dark.isActive ? 'nightlight_round' : 'brightness_low'"
            @click="$q.dark.toggle()"
          />

          <q-btn flat round icon="notifications_active" color="" dense >
            <q-badge color="negative" floating>2</q-badge>
            <q-popup-proxy >

              <q-banner >
                <template v-slot:avatar>
                  <q-icon name="bookmark" color="primary" />
                </template>
                Você tem itens a serem aprovados
              </q-banner>

              <q-separator />
              
              <q-banner>
                <template v-slot:avatar>
                  <q-icon name="question_answer" color="primary" />
                </template>
                Você tem mensagens não lidas
              </q-banner>

            </q-popup-proxy>
          </q-btn>

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
    >
      <!--q-input label="Filtro" icon="search" dense>
        <template v-slot:append>
          <q-icon name="search" avatar/>
        </template>
      </q-input-->

  

      <q-list bordered class="no-border">

        <q-item >
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
          <q-item-section>
            <q-input label="Filtro" filled square icon="search" dense style="margin-top:-8px"/>
          </q-item-section>
        </q-item>
          
        <LeftMenuItem
          v-for="(item, k) in menuContent"
          :key="k"
          v-bind="item"
        >
        </LeftMenuItem>
      </q-list>

    </q-drawer>

      <transition
          appear
          enter-active-class="animated fadeIn "
          leave-active-class="animated fadeOut"
        >

      <q-page-container >
        <router-view class="q-pa-md" />
      </q-page-container>

      </transition>
    
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="email" color="primary" dense glossy>
            <q-badge color="accent" floating>0</q-badge>
        </q-btn>
    </q-page-sticky>

  </q-layout>
</template>

<script>

import LeftMenuItem from 'src/components/LeftMenuItem.vue'

const menuContent = [
  { label: 'Home', icon: 'home', link: '/#' },
  {
    label: 'Admin',
    icon: 'settings',
    "default-opened": true,
    child: [
      {
        label: 'Usuários',
        icon: 'people',
        link: '/#/usuarios'
        /*
        child: [
          //{ label: 'Cadastro', icon: 'assignment', link: '/#/usuarios/create' },
          { label: 'Lista', icon: 'list', link: '/#/usuarios' },
        ]
        */
      },
      {
        label: 'Grupos',
        icon: 'groups',
        link: '/#/grupos'
        /*
        child: [
          { label: 'Cadastro', icon: 'assignment', link: '/#/grupos/create' },
          { label: 'Lista', icon: 'list', link: '/#/grupos' },
        ]
        */
      }
    ]
  },
  { label: 'login',     icon: 'login', link: '/#/login' },
  { label: 'Área do Fornecedor',     icon: 'work' },
  { label: 'Área do Cliente',        icon: 'how_to_reg' },
  { label: 'Área de Produtos',       icon: 'category' },
  { label: 'Área de Logística',      icon: 'local_shipping' },
  { label: 'Área de Marketing',      icon: 'auto_awesome' },
  { label: 'Área do Financeiro',     icon: 'monetization_on' },
  { label: 'Atendimento ao Cliente', icon: 'settings_phone' },
  { label: 'Área de Compras',        icon: 'wysiwyg' },
  { label: 'Embedded Apps',          icon: 'article', link: '/#/embedded' },
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
                        label: 'Home',
                        icon: 'home',
                        link: "/#"
                      }
                  ]
              }
            ]
        }
    ]
  },
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
      menuContent,
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
