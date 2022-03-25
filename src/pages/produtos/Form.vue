<template src="src/templates/form.html" />

<script>
  import repository from "../../repositories/produto.js";
  import FormModel from "src/components/FormModel.js";
  export default FormModel({componentName: 'CadastroProduto', repository})
</script>

