<template>
    <q-layout>
    login layout...
    <q-page-container>
        <!--
        This is where your pages will get
        injected into your Layout
        -->
        <router-view />
    </q-page-container>
    ...
    </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
