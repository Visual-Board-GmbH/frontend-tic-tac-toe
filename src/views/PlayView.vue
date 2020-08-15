<template>
  <b-container>
    <!-- <router-link to="/new_game" class="new-game"><i class="fas fa-plus"></i><span class="ml-2">Neues Spiel</router-link></span>-->
    <button class="btn" v-b-modal.modal-new-game><i class="fas fa-plus"></i><span class="ml-2">Neues Spiel</span>
    </button>
    <b-modal
        id="modal-new-game"
        title="Neues Spiel"
        hide-footer
    >
      <b-form @submit.prevent="newGame">
        <b-form-group
            id="input-group-1"
            label="Spielname:"
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
        <b-button block type="submit" variant="primary">Erstellen</b-button>
      </b-form>
    </b-modal>
    <h3>Meine Spiele</h3>
    <GameList :games="myGames" :items="myGameItems"></GameList>
    <h3>Offene Spiele</h3>
    <GameList :games="openGames" :items="openGameItems"></GameList>
  </b-container>
</template>

<script>
import GameList from "@/components/GameList";
import {BUILD_ACTIVE_GAME_LIST, NEW_GAME} from "@/store/actions/game";

export default {
  name: "PlayView",
  data() {
    return {
      form: {
        name: ""
      },
      myGames: {
        fields: [
          {
            key: "gameId",
            class: "d-none"
          },
          {
            key: "name"
          },
          {
            label: "Status",
            key: "state"
          },
          {
            label: "Host",
            key: "gameData.host"
          },
          {
            label: "Guest",
            key: "gameData.guest"
          },
          {
            key: "lastModified"
          },
        ],
        items: []
      },
      openGames: {
        fields: [
          {
            key: "gameId",
            class: "d-none"
          },
          {
            key: "name"
          },
          {
            label: "Status",
            key: "state"
          },
          {
            key: "host"
          },
          {
            key: "guest"
          },
          {
            key: "lastModified"
          },
          {
            key: "matrixId",
            class: "d-none"
          },
          {
            key: "gameData",
            class: "d-none"
          }
        ],
        items: []
      }
    }

  },
  computed: {
    myGameItems: function () {
      return this.$store.getters.myGames;
    },
    openGameItems: function () {
      return this.$store.getters.openGames;
    }
  },
  created: function () {

    this.$mqtt.on('message', (topic, message) => {

      // message is Buffer
      if (topic === "ttt/new_game") {
        // let activeRequest = sessionStorage.getItem("activeRequest") ? JSON.parse(sessionStorage.getItem("activeRequest")) : [],
        let resp = JSON.parse(message);
        // activeRequest = activeRequest.splice(activeRequest.indexOf(resp.requestId), 1);


        // sessionStorage.setItem("activeRequest", JSON.stringify(activeRequest));

        if (resp.serverResponse == true && resp.statusCode === 200) {
          console.log("message: " + resp);
          // if (Array.isArray(activeRequest) && activeRequest.indexOf(resp.requestId) !== -1) {
          this.$bvToast.toast("Neues Spiel mit dem Namen " + resp.name + " wurde erstellt.", {
            title: "Neues Spiel erstellt",
            variant: "success",
            solid: true,
            appendToast: true
          });
          // }

          //modify newGame to display host and guest
          resp.host = resp.gameData.host;
          resp.guest = resp.gameData.guest;
        }
      }

      if (topic === "ttt/all_games") {
        let resp = JSON.parse(message);

        this.$store.dispatch(BUILD_ACTIVE_GAME_LIST, resp);
      }
    });
  },
  components: {
    GameList
  },
  methods: {
    newGame: function () {
            // if (Array.isArray(activeRequest)) {
      //   activeRequest.push(requestId)
      //   sessionStorage.setItem("activeRequest", JSON.stringify(activeRequest));
      // }
      this.$store.dispatch(NEW_GAME, this.form.name);

      //this.$mqtt.publish("ttt/new_game", JSON.stringify(newGame))
      this.$root.$emit("bv::hide::modal", "modal-new-game");

    }
  }
}
</script>

<style scoped>
.new-game {
  color: black;
  text-decoration: none;
}

</style>
