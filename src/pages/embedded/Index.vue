<template>
      <div id="reportContainer" style="height: 95vh; margim: 0;padding: 0" ref="reportContainer" v-once></div>
      <!--div id="reportContainer" style="margim: 0;padding: 0" ref="reportContainer" v-once class="full-height"></div-->
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { openURL } from 'quasar'

import { getToken } from '../../repositories/powerbi_embedded.js'

import * as pbi from 'powerbi-client';


export default defineComponent({
  name: 'Index',
  setup() {

      const reportContainer = ref(null)

      function displayReport(token, reportId, filters){
        let models = pbi.models;
        let embedConfiguration = {
            type:'report',
            /*Report ID*/
            id: reportId,
            embedUrl:'https://app.powerbi.com/reportEmbed',
            filters:[],
            tokenType: models.TokenType.Embed,
            accessToken: token
        };
        if (filters) {
            embedConfiguration.filters.push(filters)
        }
        let _reportContainer = reportContainer.value
        powerbi.embed(_reportContainer, embedConfiguration)
      }

      onMounted( async() => {
        console.log('mounted!')
        //console.log(reportContainer.value)
        let groupId = 'ca5b45fe-1be2-4074-b311-7f69e5c27010'
        let reportId = '6eb6b413-6ade-4e66-8143-30bb0f22752f'
        let apiData = await getToken(groupId, reportId)
        let token = apiData.results.token
        //console.log(token.results.token)
        displayReport(token, reportId)
        /*
        openURL(
          'https://www.google.com.br/',
          null, // in this example we don't care about the rejectFn()

            // this is the windowFeatures Object param:
            {
                noopener: true, // this is set by default for security purposes
                                // but it can be disabled if specified with a Boolean false value
                menubar: true,
                toolbar: false,
                noreferrer: true
                // .....any other window features
            }
        )
        */
      })
      return{
          reportContainer
      }
  }
})
</script>
