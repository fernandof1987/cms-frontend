<template>
  <q-layout view="lHh Lpr lFf">
                    
    <q-header elevated>
      
      <!--q-bar class="">
        <q-icon name="laptop_chromebook" />
        <div>Barra</div>
      </q-bar-->

      <q-bar class="bg-primary">

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        >
          <q-tooltip>
            <span v-if="leftDrawerOpen">Ocultar Menu</span>
            <span v-else>Mostrar Menu</span>
          </q-tooltip>
        </q-btn>

        <!--q-toolbar-title>
          <img src="~assets/logo_cofema_branco.png" style="width: 100px; margin-top: 6px"/>
        </q-toolbar-title-->
        <q-space />

        
        <q-btn
            flat
            round
            dense
            icon="color_lens"
          />

        <q-btn
            flat
            round
            dense
            :color="$q.dark.isActive ? 'black' : 'white' "
            :icon="$q.dark.isActive ? 'nightlight_round' : 'brightness_low'"
            @click="$q.dark.toggle()"
          >
          <q-tooltip>
            <span v-if="$q.dark.isActive">Trocar para modo 'Dia'</span>
            <span v-else>Trocar para modo 'Noite'</span>
          </q-tooltip>
        </q-btn>

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
        
          <q-btn-dropdown dense stretch flat :label="usuario?.nome" icon="account_circle">
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

      </q-bar>
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
    
        <q-list bordered class="no-border" style="font-size: 0.9em">

          <q-item >
            <q-item-section avatar >
              <q-icon name="account_circle" font-size="52px"/>
            </q-item-section>
            <q-item-section>

              <!--q-input label="Filtro" filled square icon="search" dense style="margin-top:-8px"/-->

              <q-input ref="filterRef"  filled square dense v-model="filter" label="Filtro" style="margin-top:-8px;">
                <template v-slot:append>
                  <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="filter = '' " />
                  <q-icon name="search" />
                </template>
              </q-input>

            </q-item-section>
          </q-item>

          <q-separator />

          
            
          <LeftMenuItem
            v-for="(item, k) in menuTreeFilterView"
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

import repository from "../repositories/menu";

import { defineComponent, ref, onMounted, computed  } from 'vue'

import { LocalStorage, useQuasar } from 'quasar'


export default defineComponent({
  name: 'MainLayout',

  components: {
    LeftMenuItem
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const miniState = ref(true)
    const menuTree = ref([])
    const filter = ref('')

    let usuario = ref({})

    //const menuTreeFilterView = () => menuTree.value.filter( el => el.name.search(filter.value) !== -1 )

    const menuTreeFilterView = computed( () => {
      if(filter.value && filter.value != ''){
        return menuTree.value.filter( el => el.nome.search(filter.value) !== -1 )
      }else{
        return menuTree.value
      }
    })


    onMounted(() => {
      getTree(),
      getUser()
    })

    async function getUser(){

      let login = LocalStorage.getItem('login')

      //console.log('AQUI login')
        
      if(login){
          usuario.value = login
      }
    }

    async function getTree(){
        menuTree.value = await repository.menuTree()
        menuTree.value = menuTree.value.sort((a, b) => a.id > b.id ? 1 : -1); // Ordenação
        //console.log(menuTree.value)
    }

    return {
      menuTree,
      menuTreeFilterView,
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      filter,
      usuario
    }
  }
})
</script>
