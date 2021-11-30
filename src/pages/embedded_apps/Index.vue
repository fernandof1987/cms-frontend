<template>
  <div>
      Index

  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { openURL } from 'quasar'

export default defineComponent({
  name: 'Index',
  setup() {
      onMounted( async() => {
        //console.log('mounted!')
        openURL(
            'https://www.google.com.br/',
            null, // in this example we don't care about the rejectFn()

            // this is the windowFeatures Object param:
            {
                noopener: true, // this is set by default for security purposes
                                // but it can be disabled if specified with a Boolean false value
                menubar: true,
                toolbar: true,
                noreferrer: true,
                // .....any other window features
            }
        )
      })
      return{
          
      }
  }
})
</script>
