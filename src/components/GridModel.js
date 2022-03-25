import { defineComponent, onMounted, ref } from "vue";
import Grid from "src/components/Grid.vue";

export default function GridModel({componentName, repository}) {
  let component = defineComponent({
    name: componentName,
    components: { Grid },
    setup() {
      const rows = ref([]);
      const tableName = ref("");
      const tableLabel = ref("");
      const columns = ref([]);
      const primaryKey = ref("");
      const buttonActions = ref([]);
      const buttonRowActions = ref([]);
      const pagination = ref({
        //sortBy: 'id',//primaryKey.value,
        sortBy: '1',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        //rowsNumber: 15
      });
      const loading = ref(false);
      const fieldFilters = ref([]);

      const filter = ref("");

      async function getData() {
        loading.value = true;

        let filters = fieldFilters.value.map((el) => {
          if (el.value != "" && el.value != null) {
            let item = {
              field: el.name,
              operator: "LIKE",
              value: el.value.replace(/\%/g, "%25"),
            };
            return item;
          }
        });

        filters = filters.filter((el) => el != null);

        let rs = await repository.get(
          pagination.value.page,
          pagination.value.rowsPerPage,
          pagination.value.sortBy,
          pagination.value.descending,
          filters
        );
        //console.log("groups", rs);
        //fieldFilters.value = [];
        if (fieldFilters.value.length === 0) {
          rs.metadata.fields.forEach((el) => {
            fieldFilters.value.push({
              name: el.name,
              label: el.label,
              value: null,
            });
          });
        }

        //console.log(fieldFilters.value)
        
        tableName.value = rs.metadata.name;
        tableLabel.value = rs.metadata.label;
        primaryKey.value = rs.metadata.primaryKey;
        columns.value = rs.metadata.fields;
        //console.log('columns.value', columns.value)
        buttonActions.value = rs.metadata.buttonActions;
        buttonRowActions.value = rs.metadata.buttonRowActions;

        //pagination.value.sortBy = primaryKey.value
        pagination.value.rowsNumber = rs.metadata.pagination.rowsNumber;

        rows.value = rs.results;
        loading.value = false;
      }

      onMounted(async () => {
        getData();
      });

      return {
        rows,
        filter,
        tableName,
        tableLabel,
        primaryKey,
        columns,
        buttonActions,
        buttonRowActions,
        pagination,
        getData,
        loading,
        fieldFilters,
      };
    },
  });

  return component
}


