<template>
  <div>
      <Grid
        :name="tableName"
        :rows="data"
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
import { get } from '../../repositories/cliente.js'
import Grid from 'src/components/Grid.vue'


export default defineComponent({
  name: 'GrupoGrid',
  components: {Grid},
  setup() {

    const data = ref([])
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
        let rs = await get(pagination.value.page, pagination.value.rowsPerPage, pagination.value.sortBy, pagination.value.descending)

        tableName.value = rs.metadata.name
        tableLabel.value = rs.metadata.label
        primaryKey.value = rs.metadata.primaryKey
        buttonActions.value = rs.metadata.buttonActions
        buttonRowActions.value = rs.metadata.buttonRowActions
        /*
        pagination.value.sortBy = rs.metadata.sortBy
        pagination.value.descending = rs.metadata.descending
        pagination.value.page = rs.metadata.pagination.page
        pagination.value.rowsPerPage = rs.metadata.pagination.rowsPerPage
        pagination.value.rowsNumber = rs.metadata.pagination.rowsNumber
        */

        data.value = rs.results
    }

    onMounted( async () => {
        getData()
    } )

    return{
        data,
        filter,
        tableName,
        tableLabel,
        primaryKey,
        buttonActions,
        buttonRowActions,
        pagination,
        getData
    }
  }
})
</script>

