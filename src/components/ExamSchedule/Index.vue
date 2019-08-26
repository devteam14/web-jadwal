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
          <v-data-table
            show-expand
            :expanded.sync="expanded"
            item-key="exam"
            multi-sort
            :search="search"
            :headers="headers"
            :items="data"
            :loading="tableLoading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td
                class="pa-5"
                :colspan="headers.length"
                v-if="item.description"
                v-html="item.description"
              >{{ item.description }}</td>
            </template>
          </v-data-table>
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
      expanded: [],
      elevation: 0,
      on: false,
      raised: true,
      search: "",
      headers: [
        {
          text: "Exam",
          value: "exam"
        },
        {
          text: "Day",
          value: "ai_day"
        },
        {
          text: "Start Time",
          value: "ai_start_time"
        },
        {
          text: "End Time",
          value: "ai_end_time"
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
      this.tableLoading = true;
      this.$http
        .get(utils.apiBaseUrl + "exam-schedules")
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
  }
};
</script>
