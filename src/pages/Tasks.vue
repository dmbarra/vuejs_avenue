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
          <h3 class="title">Hey John, this is your todo list for today:</h3>
          <div class="row">
            <div class="col-lg-11 tasks-max-width">
              <fg-input placeholder="Create new task" v-model="todo"></fg-input>
            </div>
            <n-button
              name="addTask"
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
                :css="datatableCss"
                track-by="todo"
              >
                <Spinner slot="spinner" />
              </DataTable>
            </card>
          </div>
        </div>
        <!-- Modal subtasks -->
        <div>
          <modal
            :show.sync="modals.notice"
            class="modal-notice"
            headerClasses="justify-content-center"
            type="notice"
          >
            <h4 slot="header" class="title">List of Subtasks</h4>
            <template slot="body">
              <div class="text-right tasks-modal-pading-right">
                <n-button
                  name="addSubTask"
                  type="primary"
                  @click.native="addSubTask()"
                  round
                  icon
                >
                  <i class="now-ui-icons ui-1_simple-add"></i>
                </n-button>
              </div>
              <div>
                <card type="subtasks" plain>
                  <DataTable
                    :header-fields="subTasksFields"
                    :data="listOfSubtasks || []"
                    :is-loading="isLoading"
                    :css="datatableCss"
                    track-by="subtaskdescription"
                  >
                    <Spinner slot="spinner" />
                  </DataTable>
                </card>
              </div>
            </template>
            <div slot="footer"></div>
          </modal>
        </div>
      </div>
      <div>
        <!-- small modal to edit subtask -->
        <modal
          :show.sync="modals.mini"
          class="modal-primary"
          :show-close="false"
          headerClasses="justify-content-center"
          type="mini"
        >
          <h4 slot="header" class="title">
            Subtask Details
          </h4>
          <div slot="body">
            <div class="col-md-12">
              <fg-input
                addon-left-icon="now-ui-icons education_paper"
                placeholder="Description"
              >
              </fg-input>
              <div class="datepicker-container">
                <fg-input>
                  <date-time-picker
                    id="date"
                    :editable="false"
                    :clearable="true"
                  >
                  </date-time-picker>
                </fg-input>
              </div>
            </div>
          </div>
          <template slot="footer">
            <n-button
              type="neutral"
              name="close"
              link
              @click.native="closeEditSubtask()"
            >
              Close
            </n-button>
            <n-button
              type="neutral"
              name="saveSubtask"
              link
              @click.native="saveSubtask()"
            >
              Save
            </n-button>
          </template>
        </modal>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Card,
  Parallax,
  Button,
  FormGroupInput,
  DataTable,
  Modal
} from "@/components";
import DateTimePicker from "@/components/DateTimePicker";
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
    Card,
    Modal,
    Parallax,
    DataTable,
    Spinner,
    [FormGroupInput.name]: FormGroupInput,
    [Button.name]: Button,
    DateTimePicker
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
          iconReference: "now-ui-icons text_align-center",
          functionHit: this.openSubtaskModal
        },
        {
          name: "deletesubtask",
          typeElement: "icon",
          elementSize: "150px",
          alignField: "text-right",
          clickType: "warning",
          actionElement: "delete",
          iconReference: "now-ui-icons ui-1_simple-remove",
          functionHit: this.deleteSubtask
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
          actionElement: "details",
          functionHit: this.openSubtasksModal
        },
        {
          name: "deletesubtasks",
          label: "Delete",
          typeElement: "btn",
          elementSize: "150px",
          alignField: "text-center",
          clickType: "warning",
          actionElement: "delete",
          functionHit: this.delete
        }
      ],
      data: tasks,
      props: null,
      listOfSubtasks: [],
      isLoading: false,
      todo: "",
      datatableCss: {
        table: "table-tasks tasks-without-color",
        thead: "thead tasks-thead",
        theadTr: "thead-tr",
        theadTh: "thead-th",
        tbody: "tbody",
        tbodyTr: "tbody-tr",
        tbodyTrSpinner: "tbody-tr-spinner",
        tbodyTd: "tbody-td",
        tbodyTdSpinner: "tbody-td-spinner",
        tfoot: "tfoot",
        tfootTd: "tfoot-td",
        tfootTr: "tfoot-tr",
        footer: "footer",
        thWrapper: "th-wrapper",
        thWrapperCheckboxes: "th-wrapper-checkboxes"
      }
    };
  },
  methods: {
    addTask: function() {
      console.log("update current page without need to load data", this.todo);
    },

    openSubtasksModal: function(task) {
      console.log(task.id);
      this.modals.notice = true;
      this.listOfSubtasks = [
        {
          id: 2,
          todo:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dasdddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          numberofsubtasks: 3
        }
      ];
      console.log("task Id is: ", task.id);
    },

    openSubtaskModal: function(subTask) {
      this.modals.notice = false;
      this.modals.mini = true;
      console.log("Subt task Id is: ", subTask.id);
    },

    delete: function(props) {
      alert("Click Delete:" + JSON.stringify(props));
    },

    deleteSubtask: function(props) {
      alert("Click Delete Subtask:" + JSON.stringify(props));
    },

    addSubTask: function(subTask) {
      this.modals.notice = false;
      this.modals.mini = true;
      console.log("Subt task Id is: ", subTask.id);
    },

    closeEditSubtask: function() {
      this.modals.mini = false;
      this.modals.notice = true;
    },
    saveSubtask: function() {
      this.modals.mini = false;
      this.modals.notice = true;
    }
  }
};
</script>
<style></style>
