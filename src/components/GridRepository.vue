<template>
  <div>
    <q-table
      :title="title"
      :rows="rows"
      :columns="columns"
      tabindex="0"
      :row-key="primaryKey"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
      dense
    >
    </q-table>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "GridRepository",
  props: {
    repository: { type: Object },
  },
  setup(props) {
    const loading = ref(true);
    const title = ref("");
    const primaryKey = ref("");
    const columns = ref([]);
    const rows = ref([]);
    const pagination = ref({
      sortBy: "1",
      descending: true,
      page: 1,
      rowsPerPage: 12,
    });

    onMounted(async () => {
      loadDatafromRepository();
    });

    async function loadDatafromRepository() {
      loading.value = true;

      let { sortBy, descending, page, rowsPerPage } = pagination.value;

      sortBy = sortBy || primaryKey.value; //QG perdendo sortBy

      let rsData = await props.repository.get(
        page,
        rowsPerPage,
        sortBy,
        descending
      );

      title.value = rsData.metadata.label;
      primaryKey.value = rsData.metadata.primaryKey;
      columns.value = rsData.metadata.fields;
      rows.value = rsData.results;

      pagination.value.rowsNumber = rsData.metadata.pagination.rowsNumber;

      loading.value = false;
    }

    async function onRequest(tableProps = null) {
      if (tableProps != null) {
        pagination.value = tableProps.pagination;
        await loadDatafromRepository();
      }
    }

    return {
      title,
      columns,
      primaryKey,
      rows,
      loading,
      pagination,

      onRequest,
    };
  },
});
</script>
