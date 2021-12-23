<template>
  <div>
      <Grid
        :name="tableName"
        :rows="usuarios"
        :label="tableLabel"
        :primaryKey="primaryKey"
        :buttonActions="buttonActions"
        :buttonRowActions="buttonRowActions"

        :pagination="pagination"
        @update:pagination="
          pagination = $event,
          getData()
        "

      ></Grid>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { getUser } from '../../repositories/usuario.js'
import Grid from 'src/components/Grid.vue'


export default defineComponent({
  name: 'UsuarioGrid',
  components: {Grid},
  setup() {
    const usuarios = ref([])
    const tableName = ref('')
    const tableLabel = ref('')
    const primaryKey = ref('')
    const buttonActions = ref([])
    const buttonRowActions = ref([])

    const pagination = ref({
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 6
    })


    //const gruposColumns = ref([])
    const filter = ref('')

    async function getData(){
        let rs = await getUser(pagination.value.page, pagination.value.rowsPerPage, pagination.value.sortBy, pagination.value.descending)

        tableName.value = rs.metadata.name
        tableLabel.value = rs.metadata.label
        primaryKey.value = rs.metadata.primaryKey
        buttonActions.value = rs.metadata.buttonActions
        buttonRowActions.value = rs.metadata.buttonRowActions
        /*
        pagination.value = {
          sortBy: "id",
          descending: true,
          page: rs.metadata.pagination.page,
          rowsPerPage: rs.metadata.pagination.rowsPerPage,
          rowsNumber: rs.metadata.pagination.rowsNumber
        }

        */

        usuarios.value = rs.results

    }
     
    onMounted( async () => {
      getData()
    } )

    return{
        usuarios,
        filter,
        tableName,
        tableLabel,
        primaryKey,
        buttonActions,
        buttonRowActions,
        getData,
        pagination
    }
  }
})
</script>

