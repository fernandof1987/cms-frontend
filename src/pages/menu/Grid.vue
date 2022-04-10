<template src="src/templates/grid.html" />

<script>
  import repository from "../../repositories/menu.js";
  import GridModel from "src/components/GridModel.js";
  export default GridModel({componentName: 'MenuGrid', repository})
</script>