<template>
  <div>
    <div class="page-header clear-filter" filter-color="blue">
      <parallax
        class="page-header-image"
        style="background-image:url('img/chicago1024.jpg')"
      >
      </parallax>
      <div class="content">
        <div class="container">
          <h3 class="title text-left">Bugs:</h3>
          <div class="row btn-add-new">
            <n-button type="primary" @click.native="addBug()" round>
              <i class="now-ui-icons ui-1_simple-add btn-add-new-icon"></i> Add
              new bug
            </n-button>
          </div>
          <div class="bugs-pading-right">
            <card type="bugs" plain>
              <DataTable
                :header-fields="bugsFields"
                :data="loadBugs()"
                :is-loading="isLoading"
                :css="datatableCss"
                not-found-msg="Items not found"
                track-by="summary"
              >
                <Spinner slot="spinner" />
              </DataTable>
            </card>
          </div>
        </div>
        <!-- Modal subbugs -->
        <div>
          <modal
            :show.sync="modals.notice"
            class="modal-notice"
            headerClasses="justify-content-center"
            type="notice"
          >
            <h4 slot="header" class="title">Bug</h4>
            <template slot="body">
              <div class="text-right bugs-modal-pading-right"></div>
              <div>
                <fg-input
                  id="summaryField"
                  addon-left-icon="now-ui-icons education_paper"
                  placeholder="Summary"
                  v-model="summary"
                >
                </fg-input>
                <div>
                  <b-container fluid>
                    <b-row>
                      <b-form-textarea
                        rows="20"
                        max-rows="50"
                        size="lg"
                        id="descriptionField"
                        addon-left-icon="now-ui-icons objects_diamond"
                        placeholder="Description"
                        v-model="description"
                      ></b-form-textarea>
                    </b-row>
                  </b-container>
                </div>
                <div class="col-5">
                  <drop-down>
                    <n-button
                      slot="title"
                      type="primary"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                      block
                      round
                    >
                      {{ priority }}
                    </n-button>
                    <a class="dropdown-item" @click.prevent="priority = 'LOW'"
                      >LOW</a
                    >
                    <a
                      class="dropdown-item"
                      @click.prevent="priority = 'MEDIUM'"
                      >MEDIUM</a
                    >
                    <a class="dropdown-item" @click.prevent="priority = 'HIGH'"
                      >HIGH</a
                    >
                  </drop-down>
                </div>
              </div>
              <div slot="footer">
                <n-button type="primary" link @click.native="saveBug()">
                  Save
                </n-button>
              </div>
            </template>
          </modal>
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
  Modal,
  DropDown
} from "@/components";
import { BFormTextarea } from "bootstrap-vue";
import Spinner from "vue-simple-spinner";

const bugs = [
  {
    id: 1,
    summary: "Bug for example",
    description:
      "O campo Due Data, dentro da subtarefa está vindo preenchido com a data 0/12/2019",
    priority: "HIGH"
  },
  {
    id: 2,
    summary: "Bug for example",
    description:
      "Blank subbugs can be added when name and date should be mandatory When adding new subbugs, the description and due date are mandatory",
    priority: "LOW"
  },
  {
    id: 3,
    summary: "Bug for example",
    description:
      "Editing a subtask name that was created with an invalid date format throws an error Task is not saved and a stack trace is returned in the page",
    priority: "MEDIUM"
  }
];

export default {
  name: "bugs",
  bodyClass: "bugs-page",
  components: {
    Modal,
    Parallax,
    DataTable,
    Spinner,
    [FormGroupInput.name]: FormGroupInput,
    [Button.name]: Button,
    DropDown,
    BFormTextarea
  },
  data: function() {
    return {
      modals: {
        notice: false
      },
      bugsFields: [
        {
          name: "summary",
          label: "Summary",
          elementSize: "50%",
          typeElement: "column",
          alignField: "text-left"
        },
        {
          name: "priority",
          label: "Priority",
          typeElement: "column",
          alignField: "text-center",
          elementSize: "15%"
        },
        {
          name: "openbug",
          label: "Open Bug",
          typeElement: "btn",
          elementSize: "150px",
          alignField: "text-center",
          clickType: "primary",
          actionElement: "details",
          functionHit: this.openBugModal
        },
        {
          name: "deletebug",
          label: "Delete",
          typeElement: "btn",
          elementSize: "150px",
          alignField: "text-center",
          clickType: "warning",
          actionElement: "delete",
          functionHit: this.delete
        }
      ],
      props: null,
      summary: "",
      description: "",
      priority: "Priority",
      isLoading: false,
      datatableCss: {
        table: "table-bugs bugs-without-color",
        thead: "thead bugs-thead",
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
    loadBugs() {
      return bugs;
    },

    addBug: function() {
      this.summary = "";
      this.description = "";
      this.priority = "LOW";
      this.modals.notice = true;
      console.log("update current page without need to load data");
    },

    openBugModal: function(bug) {
      console.log(bug.id);
      this.summary = bug.summary;
      this.description = bug.description;
      this.priority = bug.priority;
      this.modals.notice = true;
    },

    delete: function(props) {
      alert("Click Delete:" + JSON.stringify(props));
    },

    saveBug: function() {
      this.modals.notice = false;
      console.log(this.summary);
      console.log(this.description);
      console.log(this.priority);
    }
  }
};
</script>
<style></style>
