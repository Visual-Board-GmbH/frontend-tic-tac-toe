<template>
  <b-container class="shadow p-3 mb-5 mt-5 bg-white rounded">
    <h3>Login</h3>
      <b-form @submit.prevent="login">
        <b-form-group
            id="input-group-1"
            label="Benutzername:"
            label-for="input-1"
            label-align="left"
        >
          <b-form-input
              id="input-1"
              v-model="form.username"
              type="text"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-2"
            label="Passwort:"
            label-for="input-2"
            label-align="left"
        >
          <b-form-input
              id="input-2"
              v-model="form.password"
              required
              type="password"
          ></b-form-input>
        </b-form-group>
        <b-button block type="submit" variant="primary">Anmelden</b-button>
        <small>Besitzen Sie noch keinen Account. Erstellen Sie einen <router-link :to="{name: 'Register'}">hier</router-link></small>
      </b-form>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-container>
</template>

<script>
  import { AUTH_REQUEST } from "@/store/actions/auth";

  export default {
    name: "LoginVue",
    components: {},
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      login: function() {

        this.$store.dispatch(AUTH_REQUEST, this.form).then(() => {
          this.$router.push("/play");
        });
      }
      /*async onSubmit(evt) {
        evt.preventDefault()
        let response = null;
        let error = null;
        console.log(this.form);
        try {
          response = await this.$axios({
            method: 'post',
            url: 'http://localhost:8081/v1/player/authenticate',
            data: this.form,
            headers: {'Content-Type': 'application/json'}
          })
        } catch (e) {
          error = e
        }

        if (error) {
          this.onReset(evt)
          return;
        }

        console.log(response)
        this.$root.userData = response.data;
        this.$root.isAuthorized = true;
        this.$router.push('/play')
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.username = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }*/
    }
  }
</script>

<style scoped>

</style>
