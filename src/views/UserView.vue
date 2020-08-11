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
          label-for="input-5"
          label-align="left"
      >
        <b-form-row id="input-5">
          <b-col>
            <b-form-group
                id="input-group-6"
                label="X-Zeichen:"
                label-for="input-6"
                label-align="left"
            >
              <b-form-file
                  id="input-6"
                  v-model="form.tileImageX"
                  placeholder="Wählen Sie eine Datei aus oder ziehen Sie hier hin."
                  drop-placeholder="Ziehen Sie eine Datei hier hin."
                  @change="onTileImageXChange"
              ></b-form-file>
              <img v-if="form.tileImageXUrl" :src="form.tileImageXUrl">
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="input-group-7"
                label="O-Zeichen:"
                label-for="input-7"
                label-align="left"
            >
              <b-form-file
                  id="input-7"
                  v-model="form.tileImageO"
                  placeholder="Wählen Sie eine Datei aus oder ziehen Sie hier hin."
                  drop-placeholder="Ziehen Sie eine Datei hier hin."
                  @change="onTileImageOChange"
              ></b-form-file>
              <img v-if="form.tileImageOUrl" :src="form.tileImageOUrl">
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-form-group>

      <b-button block type="submit" variant="primary">Speichern</b-button>
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
        tileImageO: null,
        tileImageXUrl: null,
        tileImageOUrl: null
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
    },
    onTileImageXChange: function (e) {
      let file = e.target.files[0];
      this.form.tileImageXUrl = URL.createObjectURL(file);
    },
    onTileImageOChange: function (e) {
      let file = e.target.files[0];
      this.form.tileImageOUrl = URL.createObjectURL(file);
    }
  },
  created: function () {
    let authenticatedUser = this.$store.getters.authenticatedUser;
    this.form.name = authenticatedUser.name;
    this.form.userName = authenticatedUser.username;
    this.form.nickname = authenticatedUser.nickname;
  },
  components: {}
}
</script>

<style scoped>

</style>
