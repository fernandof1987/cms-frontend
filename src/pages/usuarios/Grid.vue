<template src="src/templates/grid.html" />

<script>
  import repository from "../../repositories/usuario.js";
  import GridModel from "src/components/GridModel.js";
  export default GridModel({componentName: 'UsuarioGrid', repository})
</script>