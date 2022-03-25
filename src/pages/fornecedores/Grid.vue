<template src="src/templates/grid.html" />

<script>
  import repository from "../../repositories/fornecedor.js";
  import GridModel from "src/components/GridModel.js";
  export default GridModel({componentName: 'GrupoGrid', repository})
</script>