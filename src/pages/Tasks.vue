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
                :header-fields="tasksFields"
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
        <!-- Modal subtasks -->
        <div>
          <modal
            :show.sync="modals.notice"
            headerClasses="justify-content-center"
            type="notice"
          >
            <h4 slot="header" class="title tasks-modal-title">Sub tasks</h4>
            <template slot="body">
              <div class="text-right tasks-modal-pading-right">
                <n-button
                  name="add"
                  type="primary"
                  @click.native="addTask()"
                  round
                  icon
                >
                  <i class="now-ui-icons ui-1_simple-add"></i>
                </n-button>
              </div>
              <div class="tasks-modal-table-body">
                <card type="subtasks" plain>
                  <DataTable
                    :header-fields="subTasksFields"
                    :data="data || []"
                    :is-loading="isLoading"
                    not-found-msg="Items not found"
                    track-by="subtaskdescription"
                  >
                    <Spinner slot="spinner" />
                  </DataTable>
                </card>
              </div>
            </template> </modal
          >s
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Parallax,
  Button,
  FormGroupInput,
  DataTable,
  Modal
} from "@/components";
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
    Modal,
    Parallax,
    DataTable,
    Spinner,
    [FormGroupInput.name]: FormGroupInput,
    [Button.name]: Button
  },
  data: function() {
    return {
      modals: {
        notice: false
      },
      subTasksFields: [
        {
          name: "todo",
          label: "Description",
          elementSize: "80%",
          typeElement: "column",
          alignField: "text-left"
        },
        {
          name: "opensubtask",
          typeElement: "icon",
          alignField: "text-right",
          clickType: "primary",
          actionElement: "edit",
          iconReference: "now-ui-icons text_align-center"
        },
        {
          name: "deletesubtask",
          typeElement: "icon",
          elementSize: "150px",
          alignField: "text-right",
          clickType: "warning",
          actionElement: "delete",
          iconReference: "now-ui-icons ui-1_simple-remove"
        }
      ],
      tasksFields: [
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
      isLoading: false
    };
  },
  methods: {
    addTask: function() {
      this.modals.notice = true;
      console.log("update current page without need to load data", this.task);
    }
  }
};
</script>
<style></style>
