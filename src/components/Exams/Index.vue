<template>
  <v-container fluid fill-height>
    <v-dialog v-model="loading" persistent width="400">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-layout>
      <v-flex>
        <v-card :raised="raised" :elevation="elevation">
          <v-card-title class="py-4">
            <v-flex xs12 sm6 md3>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                outlined
                hide-details
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <input
              name="examDurationFile"
              id="examDurationFile"
              type="file"
              ref="examDurationFile"
              accept="application/json"
              class="d-none"
              :v-model="examDurationFile"
              v-validate="'required'"
              @change="uploadExamDurationFile"
            />
            <v-btn
              name="examDurationFile"
              outlined
              color="primary"
              dark
              @click="pickExamDurationFile"
              :error-messages="errors.collect('examDurationFile')"
            >
              <v-icon>save_alt</v-icon>Import Duration Data
            </v-btn>
            <v-flex xs12 md2>
              <v-btn @click="submit">import</v-btn>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" dark>
              <v-icon>save</v-icon>Export
            </v-btn>
          </v-card-title>
          <v-data-table
            show-expand
            :expanded.sync="expanded"
            item-key="name"
            multi-sort
            :search="search"
            :headers="headers"
            :items="data"
            :loading="tableLoading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item.duration="props">
              <v-edit-dialog
                :return-value.sync="props.item.duration"
                large
                persistent
                @save="save(props.item, 'duration')"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                <div>{{ props.item.duration }}</div>
                <template v-slot:input>
                  <div class="mt-4 title">Update Duration</div>
                </template>
                <template v-slot:input>
                  <v-text-field
                    v-model="props.item.duration"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                    autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.allowed_days="props">
              <v-edit-dialog
                :return-value.sync="props.item.allowed_days"
                large
                persistent
                @save="save(props.item, 'allowed_days')"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                <div><span v-if="props.item.allowed_days.length">{{ props.item.allowed_days.join(',') }}</span></div>
                <template v-slot:input>
                  <div class="mt-4 title">Update Allowed Days</div>
                </template>
                <template v-slot:input>
                  <v-checkbox
                    hide-details
                    v-for="day in allowed_days"
                    v-bind:key="day"
                    v-model="props.item.allowed_days"
                    :label="`${day}`"
                    :value="day"
                    class="ma-0"
                  ></v-checkbox>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.allowed_hours="props">
              <v-edit-dialog
                :return-value.sync="props.item.allowed_hours"
                large
                persistent
                @save="save(props.item, 'allowed_hours')"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                <div><span v-if="props.item.allowed_hours.length">{{ props.item.allowed_hours.join(',') }}</span></div>
                <template v-slot:input>
                  <div class="mt-4 title">Update Allowed Hours</div>
                </template>
                <template v-slot:input>
                  <v-checkbox
                    hide-details
                    v-for="hour in allowed_hours"
                    v-bind:key="hour"
                    v-model="props.item.allowed_hours"
                    :label="`${hour}`"
                    :value="hour"
                    class="ma-0"
                  ></v-checkbox>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td class="pa-5" :colspan="headers.length" v-if="item.exam_students">
                <b>STUDENTS</b>
                <v-list-item
                  v-for="(exam, index) in item.exam_students"
                  :key="index"
                  :to="{name: 'student', params: {id: exam.student.id}}"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ exam.student.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </td>
            </template>
          </v-data-table>
          <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

var _ = require('lodash');

export default {
  data: function() {
    return {
      tableLoading: true,
      expanded: [],
      elevation: 0,
      raised: true,
      on: false,
      search: "",
      snack: false,
      snackColor: "",
      examDurationFile: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      loading: false,
      allowed_days: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      allowed_hours: [9, 11, 13, 15, 17, 19],
      headers: [
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Lecturer",
          value: "lecturer.name"
        },
        {
          text: "Room",
          value: "room.name"
        },
        {
          text: "Manual Day",
          value: "textual_day"
        },
        {
          text: "Manual Start Time",
          value: "textual_start_time"
        },
        {
          text: "Manual End Time",
          value: "textual_end_time"
        },
        {
          text: "Duration",
          value: "duration"
        },
        {
          text: "Allowed Days",
          value: "allowed_days"
        },
        {
          text: "Allowed Hours",
          value: "allowed_hours"
        }
      ],
      data: []
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    pickExamDurationFile() {
      this.$refs.examDurationFile.click();
    },
    uploadExamDurationFile: function(e) {
      this.examDurationFile = e.target.files[0];
    },
    getData() {
      this.tableLoading = true;
      this.$http
        .get(utils.apiBaseUrl + "exams")
        .then(resp => {
          this.data = resp.data.data;
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.snack = true;
          this.snackColor = "error";
          this.snackText = "Opps! Something went wrong when getting data.";
        });
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
          this.loading = true;
          let formData = new FormData();
          formData.append("file", this.examDurationFile);

          this.$http
            .post(utils.apiBaseUrl + "exam-duration-import", formData)
            .then(resp => {
              this.loading = false;
              if (resp.status) {
                this.data = [];
                this.getData();
                this.snack = true;
                this.snackColor = "success";
                this.snackText = "Exam Duratins Saved Successfully";
              } else {
                this.snack = true;
                this.snackColor = "error";
                this.snackText = resp.mssage;
              }
            })
            .catch(err => {
              this.loading = false;
              this.snack = true;
              this.snackColor = "error";
              this.snackText = "Error";
            });
        }
      });
    },
    save(item, field) {
      console.log(item);
      var data = {
        _method: 'PUT', 
        field: field, 
        value: item[field]
      };

      this.$http
        .post(utils.apiBaseUrl + "exams/" + item.id, data)
        .then(resp => {
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Data saved";
        })
        .catch(err => {
          console.log(err);
          this.snack = true;
          this.snackColor = "error";
          this.snackText = "Opps! Something went wrong when getting data.";
        });
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
