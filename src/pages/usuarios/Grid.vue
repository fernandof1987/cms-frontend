<template>
  <div>
      <Grid
        :rows="usuarios"
        :label="tableName"
        :primaryKey="primaryKey"
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
    const primaryKey = ref('')
    //const gruposColumns = ref([])
    const filter = ref('')
     
    onMounted( async () => {
        //console.log('onmountd')
        let rs = await getUser()
        //console.log(rs)
        tableName.value = rs.metadata.label
        primaryKey.value = rs.metadata.primaryKey
        usuarios.value = rs.results
    } )

    return{
        usuarios,
        filter,
        tableName,
        primaryKey
    }
  }
})
</script>

