<template>
  <div>
    <div>
      <date-picker
        class="mdc-textfield__input"
        v-model="state.value"
        :id="id"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :editable="editable"
        :clearable="clearable"
        :format="format"
        :placeholder="placeholder"
        @change="updateValue"
      ></date-picker>
    </div>
  </div>
</template>

<script>
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import { DatePicker } from "element-ui";
import "element-ui/lib/theme-chalk/date-picker.css";
import "element-ui/lib/theme-chalk/button.css";
import "element-ui/lib/theme-chalk/icon.css";

// Set Element locale.
locale.use(lang);

export default {
  name: "datetime-picker",
  components: {
    datePicker: DatePicker
  },
  props: {
    id: {
      type: String
    },
    value: {
      type: Date
    },
    placeholder: {
      type: String,
      default: "Pick a Date"
    },
    format: {
      type: String,
      default: "dd/MM/yyyy"
    },
    readonly: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    editable: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    },
    type: {
      type: String,
      default: "date"
    }
  },
  data() {
    return {
      state: {
        value: this.value
      }
    };
  },
  watch: {
    value: function(value) {
      if (this.state.value !== value) {
        this.state.value = value;
      }
    }
  },
  methods: {
    updateValue: function(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style></style>
