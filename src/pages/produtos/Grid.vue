<template src="src/templates/grid.html" />

<script>
  import repository from "../../repositories/produto.js";
  import GridModel from "src/components/GridModel.js";
  export default GridModel({componentName: 'GrupoGrid', repository})
</script>