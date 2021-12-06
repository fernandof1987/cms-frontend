<template>
  <div>
     
    <q-table
      title="Usuários"
      :rows="users"
      row-key="id"
      :filter="filter"
    >
        <template v-slot:top-right>
          <q-input outlined rounded dense debounce="300" v-model="filter" placeholder="Busca">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        
    </q-table>


  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { addUser, getForm, getUser } from '../../repositories/usuario.js'

export default defineComponent({
  name: 'Index',
  setup() {

    const users = ref([])
    const userColumns = ref([])
    const filter = ref('')
     
    onMounted( async () => {
        users.value = await getUser()
        //userColumns.value = users.value.map(el => el.label)
    } )

    return{
        users,
        userColumns,
        filter
    }
  }
})
</script>

