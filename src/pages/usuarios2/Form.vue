<template src="src/templates/form.html" />

<script>
  import repository from "../../repositories/usuario.js";
  import FormModel from "src/components/FormModel.js";
  export default FormModel({componentName: 'CadastroUsuario', repository})
</script>

