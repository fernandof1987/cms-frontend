<template src="src/templates/form.html" />

<script>
  import repository from "../../repositories/fornecedor.js";
  import FormModel from "src/components/FormModel.js";
  export default FormModel({componentName: 'CadastroFornecedor', repository})
</script>

