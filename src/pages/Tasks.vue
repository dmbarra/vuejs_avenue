<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url('img/chicago1024.jpg')"
      >
      </parallax>
      <div class="content">
        <div class="container">
          <h3 class="title">My tasks to be done</h3>
          <card type="tasks" plain>
            <DataTable
              :header-fields="headerFields"
              :sort-field="sortField"
              :sort="sort"
              :data="data || []"
              :is-loading="isLoading"
              :css="datatableCss"
              not-found-msg="Items not found"
              @onUpdate="dtUpdateSort"
              track-by="todo"
            >
              <n-button></n-button>
              <n-button></n-button>

              <Spinner slot="spinner" />
            </DataTable>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from "@/components";
import Spinner from "vue-simple-spinner";
import DataTable from "@/components/DataTable.vue";
import orderBy from "lodash.orderby";

const initialData = [
  {
    id: 1,
    todo: "Lucca",
    numberofsubtasks: 3
  },
  {
    id: 2,
    todo:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    numberofsubtasks: 3
  },
  {
    id: 3,
    todo:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    numberofsubtasks: 1
  },
  {
    id: 4,
    todo: "Task2s",
    numberofsubtasks: 5
  }
];

export default {
  name: "tasks",
  bodyClass: "tasks-page",
  components: {
    Parallax,
    DataTable,
    Spinner
  },
  data: function() {
    return {
      headerFields: [
        {
          name: "todo",
          label: "To do",
          elementSize: "50%",
          typeElement: "column",
          alignField: "text-left"
        },
        {
          name: "numberofsubtasks",
          label: "Number of Subtasks",
          typeElement: "column",
          alignField: "text-right",
          elementSize: "15%"
        },
        {
          name: "opensubtasks",
          label: "Open Subtasks",
          typeElement: "btn",
          elementSize: "150px",
          alignField: "text-center",
          clickType: "primary",
          actionElement: "details"
        },
        {
          name: "deletesubtasks",
          label: "Delete",
          typeElement: "btn",
          elementSize: "150px",
          alignField: "text-center",
          clickType: "warning",
          actionElement: "delete"
        }
      ],
      data: initialData.slice(0, 10),
      isLoading: false,
      sort: "asc"
    };
  },
  methods: {
    dtUpdateSort: function({ sortField, sort }) {
      const sortedData = orderBy(initialData, [sortField], [sort]);
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      this.data = sortedData.slice(start, end);
      console.log("load data based on new sort", this.currentPage);
    },

    updateItemsPerPage: function(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      if (itemsPerPage >= initialData.length) {
        this.data = initialData;
      } else {
        this.data = initialData.slice(0, itemsPerPage);
      }
      console.log("load data with new items per page number", itemsPerPage);
    },

    changePage: function(currentPage) {
      this.currentPage = currentPage;
      const start = (currentPage - 1) * this.itemsPerPage;
      const end = currentPage * this.itemsPerPage;
      this.data = initialData.slice(start, end);
      console.log("load data for the new page", currentPage);
    },

    updateCurrentPage: function(currentPage) {
      this.currentPage = currentPage;
      console.log("update current page without need to load data", currentPage);
    }
  }
};
</script>
<style></style>
