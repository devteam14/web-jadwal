<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="pa-5">
                <v-card-text>
                  <v-flex text-center pb-5 width="150">
                    <img :src="logo" />
                  </v-flex>
                  <v-form>
                    <v-text-field
                      name="email"
                      label="Email"
                      type="text"
                      outlined
                      v-model="form.email"
                      v-validate="'required|email'"
                      :error-messages="errors.collect('email')"
                    ></v-text-field>

                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                      outlined
                      v-model="form.password"
                      v-validate="'required|min:6'"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :error-messages="errors.collect('password')"
                    ></v-text-field>
                  </v-form>
                  <v-alert type="error" v-if="error">{{ error }}</v-alert>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn large block color="primary" @click="login">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

export default {
  data: function() {
    return {
      show1: false,
      logo: require("@/assets/jadwal-logo-portrait.svg"),
      form: {
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    login: function() {
      this.$validator.validate().then(result => {
        if (result) {

          let email = this.form.email;
          let password = this.form.password;
          
          this.$store
            .dispatch("login", { email, password })
            .catch(
              err => (this.error = "Authentication Failed. Please check your credentials")
            );
        }
      });
    }
  }
};
</script>
