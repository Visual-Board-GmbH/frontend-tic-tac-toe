<template>
  <div class="loginView">
    <b-card v-if="show">
      <b-form @submit="onSubmit" @reset="onReset">
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
    components: {},
    data() {
      return {
        form: {
          username: 'leo',
          password: 'leo'
        },
        show: true
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        let response = null;
        let error = null;

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
        this.show = false
        this.$router.push('/play/:data', response.data)
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
      }
    }
  }
</script>

<style scoped>
  .loginView {
    margin-left: 20%;
    margin-right: 20%;
  }

</style>
