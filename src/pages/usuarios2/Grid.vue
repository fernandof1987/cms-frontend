<template>
  <GridRepository :repository="repository"></GridRepository>
</template>

<script>

import repository from "../../repositories/usuario.js";
import GridRepository from "src/components/GridRepository.vue";
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'usuarios',
  components: { GridRepository },

  setup(){    
    return {
      repository
    }
  }
})

</script>