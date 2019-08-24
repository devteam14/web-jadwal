<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex>
        <v-card :raised="raised" :elevation="elevation">
          <v-card-title class="py-4">
            <v-flex xs12 sm6 md9>
              <h5>AI CALENDAR</h5>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                outlined
                v-model="ai_search"
                @input="searchInData('ai')"
              ></v-text-field>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-data-table
              disable-sort
              hide-default-footer
              :headers="ai_headers"
              :items="ai_data"
              class="calendar"
            >
              <template v-slot:item="{ headers, item }">
                <tr>
                  <td
                    v-for="(header, i) in headers"
                    v-bind:key="i"
                    v-html="item[header.value]"
                    align="left"
                    valign="top"
                  ></td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <v-card :raised="raised" :elevation="elevation">
          <v-card-title class="py-4 pt-5 mt-5">
            <v-flex xs12 sm6 md9>
              <h5>MANUAL CALENDAR</h5>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                outlined
                v-model="manual_search"
                @input="searchInData('manual')"
              ></v-text-field>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-data-table
              disable-sort
              hide-default-footer
              :headers="manual_headers"
              :items="manual_data"
              class="calendar"
            >
              <template v-slot:item="{ headers, item }">
                <tr>
                  <td
                    v-for="(header, i) in headers"
                    v-bind:key="i"
                    v-html="item[header.value]"
                    align="left"
                    valign="top"
                  ></td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn text @click="snack = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
var _ = require("lodash");
export default {
  data: function() {
    return {
      ai_search: "",
      manual_search: "",
      elevation: 0,
      raised: false,
      snack: false,
      snackColor: "",
      snackText: "",
      ai_headers: [],
      manual_headers: [],
      ai_data: [],
      manual_data: [],
      tmp_ai_data: [],
      tmp_manual_data: []
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get(utils.apiBaseUrl + "exam-schedule-calendar")
        .then(resp => {
          this.tmp_ai_data = resp.data.data.calendars.ai;
          this.tmp_manual_data = resp.data.data.calendars.manual;
          this.preparingData(this.tmp_ai_data, 'ai');
          this.preparingData(this.tmp_manual_data, 'manual');
        })
        .catch(err => {
          this.snack = true;
          this.snackColor = "error";
          this.snackText = "Opps! Something went wrong when getting data.";
        });
    },
    preparingData(exam_data, data_type) {
      var new_data = [];
      var new_headers = [];
      new_headers.push({ text: "Hours", value: "hours", align: "center" });

      var exams = exam_data;

      for (var hour in exams) {
        const obj = {};
        const days = exams[hour];
        for (var day in days) {
          if (hour == 9) {
            new_headers.push({ text: day, value: day});
          }

          obj["hours"] = hour + '.00';
          var filtered = days[day].filter(function(el) {
            return el != null;
          });
          obj[day] = filtered.join("<br>");
        }
        new_data.push(obj);
      }

      if (data_type == "ai") {
        this.ai_headers = new_headers;
        this.ai_data = new_data;
      } else if (data_type == "manual") {
        this.manual_headers = new_headers;
        this.manual_data = new_data;
      }
    },
    searchInData(data_type) {
        
      var data = null;
      var keyword = null;
      
      if (data_type == "ai") {
        data = _.cloneDeep(this.tmp_ai_data);
        keyword = this.ai_search;
      } else if (data_type == "manual") {
        data = _.cloneDeep(this.tmp_manual_data);
        keyword = this.manual_search;
      }

      for (var hour in data) {
        const days = data[hour];
        for (var day in days) {
          const exams = days[day];
          for (var exam in exams) {
            if (
              exams[exam].toLowerCase().indexOf(keyword.toLowerCase()) ===
              -1
            ) {
              delete data[hour][day][exam];
            }
          }
        }
      }
      this.preparingData(data, data_type);
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {}
  }
};
</script>
