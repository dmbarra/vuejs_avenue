<template>
  <table :class="[css.table]">
    <thead :class="css.thead" :style="theadStyle">
      <tr :class="css.theadTr">
        <th
          v-for="item in headers"
          :key="item.label"
          :class="[headerItemClass(item, css.theadTh), getAlignClass(item)]"
          :style="getColumnWidth(item)"
        >
          <div
            v-if="!isFieldSpecial(item) && !item.customHeader"
            :class="css.thWrapper"
            @click="orderBy(item.name)"
          >
            {{ item.label }}
          </div>
          <div
            v-if="!isFieldSpecial(item) && item.customHeader"
            :class="css.thWrapper"
            @click="orderBy(item.name)"
          >
            <slot
              v-if="item.customHeader"
              :header-data="item"
              :name="customHeaderName(item)"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody :class="css.tbody" :style="tbodyStyle">
      <template v-if="isLoading">
        <tr :class="css.tbodyTrSpinner">
          <td :colspan="headers.length" :class="css.tbodyTdSpinner">
            <slot name="spinner" />
          </td>
        </tr>
      </template>
      <template v-else-if="data.length">
        <tr v-for="(item, index) in data" :key="index" :class="css.tbodyTr">
          <td
            v-for="key in headers"
            :key="`${index}-${key.name}`"
            :class="[css.tbodyTd, getAlignClass(key)]"
            :style="getColumnWidth(key)"
          >
            <n-button
              v-if="isFieldSpecial(key) && !isaIcon(key)"
              :class="[getClickType(key), 'btn', 'btn-round', 'btn-sm']"
              :style="getColumnWidth(key)"
              @click="whatIsTheFunction(key, item)"
            >
              {{ key.label }}
            </n-button>
            <button
              v-if="isFieldSpecial(key) && isaIcon(key)"
              :class="[getClickType(key), 'btn', 'btn-icon', 'btn-round']"
              @click="whatIsTheFunction(key, item)"
            >
              <i :class="getIconsReference(key)"></i>
            </button>
            <template v-else-if="key.format">{{
              key.format(item[key.name])
            }}</template>
            <template v-else>{{
              limitNumbersOfCharacters(item[key.name])
            }}</template>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr :class="css.notFoundTr">
          <td :colspan="headers.length" :class="css.notFoundTd">
            {{ notFoundMessage }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
import { Button } from "@/components";

export default {
  name: "DataTable",
  props: {
    headerFields: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    trackBy: {
      type: String,
      default: "id"
    },
    alignField: {
      type: String,
      default: null
    },
    typeElement: {
      type: String,
      default: null
    },
    clickType: {
      type: String,
      default: null
    },
    elementSize: {
      type: String,
      default: null
    },
    actionElement: {
      type: String,
      default: null
    },
    iconReference: {
      type: String,
      default: null
    },
    tableHeight: {
      type: String,
      default: null
    },
    defaultColumnWidth: {
      type: String,
      default: "150px"
    },
    onlyShowOrderedArrow: {
      type: Boolean,
      default: false
    },
    components: {
      [Button.name]: Button
    },
    functionHit: {
      type: Function
    },
    css: {
      type: Object,
      default: () => ({
        table: "table-tasks task-without-color",
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
        thWrapperCheckboxes: "th-wrapper-checkboxes",
        arrowsWrapper: "arrows-wrapper",
        arrowUp: "arrow-up",
        arrowDown: "arrow-down",
        checkboxHeader: "checkbox-header",
        checkbox: "checkbox"
      })
    }
  },

  data: function() {
    return {
      loading: this.isLoading
    };
  },

  computed: {
    headers: function() {
      if (
        this.headerFields &&
        this.headerFields.constructor === Array &&
        this.headerFields.length
      ) {
        return Object.keys(this.headerFields).map(key => {
          const field = this.headerFields[key];
          if (typeof field === "string") {
            return { label: field, name: field };
          }
          return field;
        });
      }
      return [];
    },
    tbodyStyle: function() {
      if (this.tableHeight) {
        return {
          height: this.tableHeight,
          display: "block",
          overflowX: "auto"
        };
      }
      return null;
    },
    theadStyle: function() {
      return this.tableHeight ? { display: "block" } : null;
    }
  },

  methods: {
    getAlignClass(item) {
      return item.alignField !== null ? item.alignField : "text-center";
    },
    getClickType(item) {
      return item.clickType !== null ? "btn-" + item.clickType : "btn-primary";
    },
    getTypeElement(item) {
      return item.typeElement !== null ? item.typeElement : "";
    },
    getActionElement(item) {
      if (item.actionElement === "details") {
        return this.openDetails(item);
      } else {
        return this.delete(item);
      }
    },
    headerItemClass: function(item, className = "") {
      return item && item.sortable ? className : `${className} no-sortable`;
    },

    isFieldSpecial: field => field.typeElement !== "column",

    isaIcon: field => field.typeElement === "icon",

    getIconsReference: field =>
      field !== null ? field.iconReference : "now-ui-icons ui-1_simple-add",

    getColumnWidth: function(item) {
      return { width: item.elementSize || this.defaultColumnWidth };
    },

    customHeaderName: ({ customHeader, name }) =>
      typeof customHeader === "string" ? customHeader : `${name}:header`,

    openDetails: props => alert("Click props:" + JSON.stringify(props)),

    limitNumbersOfCharacters: function(item) {
      if (item != undefined && typeof item == "string") {
        item = item.substring(0, 70) + "...";
        return item;
      }
    },

    whatIsTheFunction: function(key, item) {
      console.log(key.functionHit(item));
      console.log(item);
    }
  }
};
</script>
