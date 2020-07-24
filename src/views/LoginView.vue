<template>
  <div class="loginView">
    <h1>Tic-Tac-Toe</h1>
    <b-card>
      <h3>Login</h3>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

        <b-button block type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-card>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "LoginVue",
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
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
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
  .loginView {
    margin-top: 10%;
    margin-left: 20%;
    margin-right: 20%;
  }

</style>
