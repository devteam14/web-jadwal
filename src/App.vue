<template>
  <v-app>
    <v-dialog v-model="loading" persistent width="400">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snack" :timeout="2000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav class="py-0">
        <v-list-item two-line>
          <img src="./assets/jadwal-logo.svg" />
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{username}}</v-list-item-title>
            <v-list-item-subtitle>Admin User</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" :to="{name: item.route}">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app height="100">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <input
              name="examFile"
              id="examFile"
              type="file"
              ref="file"
              accept="application/json"
              class="d-none"
              :v-model="examFile"
              v-validate="'required'"
              @change="fileUpload"
            >
            <v-btn
              name="examFile"
              outlined
              color="primary"
              dark
              @click="pickFile"
              :error-messages="errors.collect('examFile')"
            ><v-icon>save_alt</v-icon>Import Exam Data
            </v-btn>
            <v-btn @click="submit">import</v-btn>

      <v-spacer></v-spacer>
      <v-btn primary color="primary" dark>Generate Schedule</v-btn>
      <v-btn v-if="isLoggedIn" @click="this.logout" color="error" class="ml-5" outlined small>Logout</v-btn>
    </v-app-bar>
    <v-content>
      <div class="mt-5 ml-5">{{ currentRoute }}</div>
      <v-container fluid pl-0 pr-0 fill-height>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    snack: false,
    snackColor: '',
    snackText: '',
    examFile: [],
    color: "primary",
    drawer: true,
    mini: true,
    breadcrumbs: [],
    currentRoute: null,
    username: "",
    loading: false,
    items: [
      {
        icon: "dashboard",
        title: "Dashboard",
        route: "dashboard"
      },
      {
        icon: "date_range",
        title: "Exams",
        route: "exams"
      },
      {
        icon: "date_range",
        title: "Exam Schedule",
        route: "exam_schedule"
      },
      {
        icon: "date_range",
        title: "Exam Schedule Calendar",
        route: "exam_schedule_calendar"
      },
      {
        icon: "person",
        title: "Academic Staff Lists",
        route: "academic_staff_lists"
      },
      // {
      //     icon: "list_alt",
      //     title: "Fulfillment List",
      //     route: "fulfillment_list"
      // },
      {
        icon: "meeting_room",
        title: "Rooms",
        route: "rooms"
      },
      // {
      //     icon: "library_books",
      //     title: "Lessons",
      //     route: "lessons"
      // },
      // {
      //     icon: "domain",
      //     title: "Organization",
      //     route: "organization"
      // },
      {
        icon: "face",
        title: "Students",
        route: "students"
      }
    ]
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    $route() {
      this.breadcrumbs = this.$route.meta.breadcrumb;
      this.currentRoute = this.$route.name
        .toUpperCase()
        .replace("_", " ")
        .replace("_", " ");
    }
  },
  created() {
    this.username = localStorage.getItem("username");
    this.currentRoute = this.$route.name
      .toUpperCase()
      .replace("_", " ")
      .replace("_", " ");
    this.breadcrumbs = this.$route.meta.breadcrumb;
    this.$http.interceptors.response.use(
      undefined,
      err =>
        new Promise(() => {
          if (
            err.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.$store.dispatch("logout");
          }
          throw err;
        })
    );
  },
  methods: {
    pickFile() {
      this.$refs.file.click();
    },
    fileUpload: function(e) {
      this.examFile = e.target.files[0];
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        window.location.href = "/login";
      });
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
          this.loading = true;
          let formData = new FormData();
          formData.append("file", this.examFile);
          this.$http
            .post(utils.apiBaseUrl + "exam-import", formData)
            .then(resp => {
              console.log(resp);
              this.loading = false;
              if (resp.status) {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Exam Data Saved Successfully'
                setTimeout(() => window.location.href = '/exams', 2000);
              } else {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = resp.message
              }
            })
            .catch(err => {
              this.loading = false;
              this.snack = true
              this.snackColor = 'error'
              this.snackText = 'Error'
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "app.scss";
</style>
