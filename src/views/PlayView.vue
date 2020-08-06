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
    <GameList :games="myGames"></GameList>
    <h3>Offene Spiele</h3>
    <GameList :games="openGames"></GameList>
  </b-container>
</template>

<script>
import GameList from "@/components/GameList";

export default {
  name: "PlayView",
  data: () => {
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
  created: function () {
    //ToDo Publish Message to Recieve all games
    this.$mqtt.on('message', (topic, message) => {
      // message is Buffer
      if (topic === "ttt/new_game") {

        let activeRequest = localStorage.getItem("activeRequest") ? JSON.parse(localStorage.getItem("activeRequest")) : [],
            newGame = JSON.parse(message.toString());
        activeRequest = activeRequest.splice(activeRequest.indexOf(newGame.requestId), 1);
        localStorage.setItem("activeRequest", JSON.stringify(activeRequest));
        console.log(newGame);
        if (Array.isArray(activeRequest) && activeRequest.indexOf(newGame.requestId) !== -1 && newGame.statusCode === 200 && newGame.serverResponse === true) {

          console.log(activeRequest + " - " + activeRequest.indexOf(newGame.requestId));
          this.$bvToast.toast("Neues Spiel mit dem Namen " + newGame.name + " wurde erstellt.", {
            title: "Neues Spiel erstellt",
            variant: "success",
            solid: true,
            appendToast: true
          });

          //modify newGame to display host and guest
          newGame.host = newGame.gameData.host;
          newGame.guest = newGame.gameData.guest;

          this.myGames.items.push(newGame);
          //ToDo Identify User Obect
          /*this.myGames.items = gameData.filter(game => (game.host === "1" || game.guest === "1"));
          this.openGames.items = gameData.filter(game => game.guest === "");*/
        }
      }
    });
  },
  components: {
    GameList
  },
  methods: {
    newGame: function () {
      let requestId = Math.round((Math.random() + 1) * 1000),
          activeRequest = localStorage.getItem("activeRequest") ? JSON.parse(localStorage.getItem("activeRequest")) : [],
          newGame = {
            gameId: "",
            name: this.form.name,
            state: "OPEN",
            lastModified: new Date(),
            matrixIds: [],
            gameData: {
              host: "2",//ToDo get dynamic id -> this.$store.getters.authenticatedUser.id,
              guest: 0,
              moves: [],
              winner: null
            },
            playerData: [],
            statusCode: 0,
            requestId: requestId,
            serverResponse: false
          }

      if (Array.isArray(activeRequest)) {
        activeRequest.push(requestId)
        localStorage.setItem("activeRequest", JSON.stringify(activeRequest));
      }

      this.$mqtt.publish("ttt/new_game", JSON.stringify(newGame))
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
