<template src="src/templates/form.html" />

<script>
  import repository from "../../repositories/cliente.js";
  import FormModel from "src/components/FormModel.js";
  export default FormModel({componentName: 'CadastroCliente', repository})
</script>

