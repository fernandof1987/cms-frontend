<template>
  <q-page :class="''/*flex flex-center*/" style="msrgim: 0; padding: 0">
  
      <!--img src="https://www.cofema.com.br/Content/image/empresa/unidade_sp.jpg" style="width: 100%"-->

    <!--q-parallax>
      <template v-slot:media>
        <img src="https://www.cofema.com.br/Content/image/empresa/unidade_sp.jpg">
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute column items-center"
          :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
        >
          <img src="https://www.cofema.com.br/Content/image/layout/LogoEmpresa.png">
          <div class="text-h5 text-white text-center">Portal de Relacionamento</div>
          <div class="text-h6 text-grey-3 text-center">
            v 0.1
          </div>
        </div>
      </template>
    </q-parallax-->
    
    

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex'
})
</script>
