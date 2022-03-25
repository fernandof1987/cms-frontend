<template src="src/templates/grid.html" />

<script>
  import repository from "../../repositories/cliente.js";
  import GridModel from "src/components/GridModel.js";
  export default GridModel({componentName: 'ClienteGrid', repository})
</script>

