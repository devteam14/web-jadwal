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
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 md8>
            <v-file-input
              label="Select Exam Data"
              name="examFile"
              accept="application/json"
              :error-messages="errors.collect('examFile')"
              v-validate="'required'"
              outlined
              v-model="examFile"
              class="mt-5"
            ></v-file-input>
          </v-flex>
          <v-flex xs12 md2>
            <v-btn @click="submit" class="mt-5">submit</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
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
        title: "Exam Schedule",
        route: "exam_schedule"
      },
      {
        icon: "person",
        title: "Academic Staff List",
        route: "academic_staff_list"
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
              this.loading = false;
              if (!resp.data.err) {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Exam Data Saved Successfully'
                setTimeout(() => window.location.href = '/', 2000);
              } else {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Error'
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
