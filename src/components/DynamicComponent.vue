<template>
    <component v-if="comp" :is="comp" v-bind="componentsProps" @update:selectedRow="(teste3($event))"></component>
</template>

<script>
//Vue 3 is having a special function to define these async functions
import { defineAsyncComponent, onMounted, onUnmounted, onUpdated } from "vue";

export default {
    name: "DynamicComponent",
    //I am passing the name of the Component as a prop
    props: {
        folder: {
            type: String,
            default: 'components' // components || pages
        },
        file:{
            type: String,
            required: true,
            default: ''
        },
        finishFunction: {
            type: Function,
            default: null
        },
        componentsProps: { type: Object, default: {} }
    },
    computed: {
        comp () {

            //"solucao" para conseguir o import dinamico variavel no path inteiro da pau no webpack
            if(this.folder == 'components'){
                //console.log('this.componentsProps')
                //console.log(this.componentsProps)
                return defineAsyncComponent(() => import(`src/components/${this.file}`))
            }
            
            if(this.folder == 'pages') {
                //console.log('this.componentsProps')
                //console.log(this.componentsProps)
                //console.log( defineAsyncComponent(() => import(`src/pages/${this.file}`)) )
                return defineAsyncComponent(() => import(`src/pages/${this.file}`))
            }
            //return defineAsyncComponent(() => import(path))
            //return defineAsyncComponent(() => import(`../${this.path}/${this.file}`))
        }
    },
    setup(props) {

        
        function teste3(evento){
            console.log('teste3'),
            console.log(evento)
        }

        return {
            teste3
        }
        
        /*
        onUpdated( () => {
            if(props.finishFunction){
                console.log('finishFunction()')
                props.finishFunction()
            }
        } )
        */
    }

}
</script>