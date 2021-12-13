<template>
  <div>
      <Grid
        :rows="grupos"
        :label="tableName"
        :primaryKey="primaryKey"
        :buttonActions="buttonActions"
        :buttonRowActions="buttonRowActions"
      ></Grid>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { getGroup } from '../../repositories/grupo.js'
import Grid from 'src/components/Grid.vue'


export default defineComponent({
  name: 'GrupoGrid',
  components: {Grid},
  setup() {

    const grupos = ref([])
    const tableName = ref('')
    const primaryKey = ref('')
    const buttonActions = ref([])
    const buttonRowActions = ref([])

    //const gruposColumns = ref([])
    const filter = ref('')
     
    onMounted( async () => {
        let rs = await getGroup()
        tableName.value = rs.metadata.label
        primaryKey.value = rs.metadata.primaryKey
        buttonActions.value = rs.metadata.buttonActions
        buttonRowActions.value = rs.metadata.buttonRowActions
        grupos.value = rs.results
    } )

    return{
        grupos,
        filter,
        tableName,
        primaryKey,
        buttonActions,
        buttonRowActions
    }
  }
})
</script>

