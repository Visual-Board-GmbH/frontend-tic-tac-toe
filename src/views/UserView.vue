<template>
  <b-container class="shadow p-3 mb-5 mt-5 bg-white rounded">
    <h3>Profil </h3>
    <b-form @submit.prevent="updateUser">
      <b-form-group
          id="input-group-1"
          label="Name:"
          label-for="input-1"
          label-align="left"
      >
        <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-2"
          label="Benutzername:"
          label-for="input-1"
          label-align="left"
      >
        <b-form-input
            id="input-2"
            v-model="form.userName"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-3"
          label="Nickname:"
          label-for="input-1"
          label-align="left"
      >
        <b-form-input
            id="input-3"
            v-model="form.nickname"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-4"
          label="Passwort:"
          label-for="input-2"
          label-align="left"
      >
        <b-form-input
            id="input-4"
            v-model="form.password"
            required
            type="password"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-5"
          label="Tic Tac Toe Zeichen:"
          label-for="input-2"
          label-align="left"
      >
        <b-form-file
            id="input-5"
            v-model="form.tileImageX"
            placeholder="Wählen Sie eine Datei aus oder ziehen Sie hier hin."
            drop-placeholder="Ziehen Sie eine Datei hier hin."
        ></b-form-file>
        <div class="mt-3">X-Zeichen: {{ form.tileImageX }}</div>
        <b-form-file
            id="input-5"
            v-model="form.tileImageO"
            placeholder="Wählen Sie eine Datei aus oder ziehen Sie hier hin."
            drop-placeholder="Ziehen Sie eine Datei hier hin."
        ></b-form-file>
        <div class="mt-3">O-Zeichen: {{ form.tileImageX}}</div>
      </b-form-group>

      <b-button block type="submit" variant="primary">Anmelden</b-button>
      <small>Besitzen Sie noch keinen Account. Erstellen Sie einen
        <router-link :to="{name: 'Register'}">hier</router-link>
      </small>
    </b-form>
  </b-container>
</template>

<script>
import ticTacToeApi from "@/mixins/ticTacToeAPI";
export default {
  name: "UserView",
  data: () => {
    return {
      form: {
        name: "",
        userName: "",
        nickname: "",
        password: "",
        tileImageX: null,
        tileImageO: null
      }
    }
  },
  methods: {
    updateUser: function () {

      let userData = {
        name: this.form.name,
        username: this.form.userName,
        nickname: this.form.nickname,
        password: this.form.password
      },
          authenticatedUser = this.$store.getters.authenticatedUser;

      ticTacToeApi({
        url: "http://localhost:8081/v1/player/" + authenticatedUser.id,
        data: userData,
        method: "POST",
        headers: {'Content-Type': 'application/json'}
      }).then(resp => {
        console.log(resp);
      }).catch(err => {
        console.log(err);
      })
      console.log(JSON.stringify(this.form));
    }
  },
  components: {}
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.fade-leave-to {
  opacity: 1;
}
</style>
