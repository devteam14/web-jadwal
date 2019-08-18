<template>
  <v-container fluid fill-height>
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
            <v-btn outlined color="primary" dark v-on="on">
              <v-icon>save_alt</v-icon>Export
            </v-btn>
          </v-card-title>
          <v-data-table multi-sort :search="search" :headers="headers" :items="data" :loading="tableLoading" loading-text="Loading... Please wait">
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  <v-btn :to="{name: 'student', params: {id: item.id}}" text small color="primary">{{ item.name }}</v-btn>
                </td>
                <td>{{ item.class }}</td>
                <td>{{ item.exam_count }}</td>
              </tr>
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
export default {
  data: function() {
    return {
      tableLoading: true,
      elevation: 0,
      on: false,
      raised: false,
      search: "",
      snack: false,
      snackColor: "",
      snackText: "",
      headers: [
        {
          text: "Student",
          value: "name"
        },
        {
          text: "Student Class",
          value: "class"
        },
        {
          text: "Exam Count",
          value: "exam_count"
        }
      ],
      data: []
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get(utils.apiBaseUrl + "students")
        .then(resp => {
          this.data = resp.data.data;
          this.tableLoading = false;
        })
        .catch(err => {
          this.snack = true;
          this.snackColor = "error";
          this.snackText = "Opps! Something went wrong when getting data.";
        });
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
