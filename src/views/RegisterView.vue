<template>
  <div class="registerView">
    <h1>Tic-Tac-Toe</h1>
    <b-card>
      <h3>Registrieren</h3>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
            label-for="input-2"
            label-align="left"
            description="Name für das Benutzerlogin"
        >
          <b-form-input
              id="input-2"
              v-model="form.username"
              required
              type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-3"
            label="Nickname:"
            label-for="input-3"
            label-align="left"
            description="Spielername, wird anderen Spielern angezeigt"
        >
          <b-form-input
              id="input-3"
              v-model="form.nickname"
              required
              type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-4"
            label="Passwort:"
            label-for="input-4"
            label-align="left"
        >
          <b-form-input
              id="input-4"
              v-model="form.password"
              required
              type="password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5">
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
            <b-form-checkbox value="terms">Datenschutzbestimmungen</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Registrieren</b-button>
      </b-form>
    </b-card>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "RegisterView",
    data() {
      return {
        form: {
          name: '',
          username: '',
          nickname: '',
          password: '',
          checked: []
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style scoped>
  .registerView {
    margin-top: 10%;
    margin-left: 20%;
    margin-right: 20%;
  }
</style>
