<template>
  <div>
      <Grid
        :name="tableName"
        :rows="usuarios"
        :label="tableLabel"
        :primaryKey="primaryKey"
        :buttonActions="buttonActions"
        :buttonRowActions="buttonRowActions"
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

    //const gruposColumns = ref([])
    const filter = ref('')
     
    onMounted( async () => {
        //console.log('onmountd')
        let rs = await getUser()
        //console.log(rs)
        tableName.value = rs.metadata.name
        tableLabel.value = rs.metadata.label
        primaryKey.value = rs.metadata.primaryKey
        buttonActions.value = rs.metadata.buttonActions
        buttonRowActions.value = rs.metadata.buttonRowActions
        usuarios.value = rs.results
    } )

    return{
        usuarios,
        filter,
        tableName,
        tableLabel,
        primaryKey,
        buttonActions,
        buttonRowActions
    }
  }
})
</script>

