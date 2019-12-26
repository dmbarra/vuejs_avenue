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
          <div class="row">
            <div class="col-lg-11 tasks-max-width">
              <fg-input placeholder="Create new task" v-model="task"></fg-input>
            </div>
            <n-button
              name="add"
              type="primary"
              class="tasks-remove-margin"
              @click.native="addTask()"
              round
              icon
            >
              <i class="now-ui-icons ui-1_simple-add"></i>
            </n-button>
          </div>
          <div class="tasks-pading-right">
            <card type="tasks" plain>
              <DataTable
                :header-fields="headerFields"
                :sort="sort"
                :data="data || []"
                :is-loading="isLoading"
                not-found-msg="Items not found"
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
  </div>
</template>
<script>
import { Parallax, Button, FormGroupInput, DataTable } from "@/components";
import Spinner from "vue-simple-spinner";

const tasks = [
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
    Spinner,
    [FormGroupInput.name]: FormGroupInput,
    [Button.name]: Button
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
      data: tasks,
      isLoading: false,
      sort: "asc"
    };
  },
  methods: {
    addTask: function() {
      console.log("update current page without need to load data", this.task);
    }
  }
};
</script>
<style></style>
