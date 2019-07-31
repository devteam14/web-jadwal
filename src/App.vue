<template>
<v-app>
    <v-navigation-drawer v-model="drawer" app>
        <v-list dense nav class="py-0">
            <v-list-item two-line>
                <img src="./assets/jadwal-logo.svg" />
            </v-list-item>
            <v-list-item two-line>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{user.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{user.title}}</v-list-item-subtitle>
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
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ currentRoute }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn primary color="primary" dark>
            Generate Schedule
        </v-btn>
    </v-app-bar>
    <!-- <v-toolbar color="white" app fixed :clipped-left="$vuetify.breakpoint.mdAndUp">
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">
        <img src="./assets/logo.png" height="40">
      </span>
      <v-list-item-title v-if="isLoggedIn" @click="this.logout" class="grey--text">Logout</v-list-item-title>
      <v-breadcrumbs :items="this.breadcrumbs">
      <template v-slot:item="props">
        <router-link :to="props.item.to ? props.item.to : ':;'" :class="[props.item.disabled && 'disabled']">{{ props.item.text.toUpperCase() }}</router-link>
      </template>
    </v-breadcrumbs>
      <v-spacer></v-spacer>
    </v-toolbar> -->
    <v-content>
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
        color: 'primary',
        drawer: true,
        mini: true,
        breadcrumbs: [],
        currentRoute: null,
        user: {
            name: "Name Surname",
            title: "Admin User"
        },

        items: [{
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
            this.currentRoute = this.$route.name.toUpperCase().replace('_', ' ').replace('_', ' ');
        }
    },
    created() {
        this.currentRoute = this.$route.name.toUpperCase().replace('_', ' ').replace('_', ' ');
        this.breadcrumbs = this.$route.meta.breadcrumb;
        this.$http.interceptors.response.use(
            undefined,
            err =>
            new Promise((resolve, reject) => {
                if (
                    err.status === 401 &&
                    err.config &&
                    !err.config.__isRetryRequest
                ) {
                    this.$store.dispatch(logout);
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
        }
    }
};
</script>

<style lang="scss">
@import "app.scss";
</style>
