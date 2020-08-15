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
          },
          {
            key: "allData",
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
    //ToDo Recieve all games
    this.$mqtt.on('message', (topic, message) => {
      // message is Buffer
      if (topic === "ttt/new_game") {
        let activeRequest = sessionStorage.getItem("activeRequest") ? JSON.parse(sessionStorage.getItem("activeRequest")) : [],
            resp = JSON.parse(message.toString());
            activeRequest = activeRequest.splice(activeRequest.indexOf(resp.requestId), 1);



            sessionStorage.setItem("activeRequest", JSON.stringify(activeRequest));

        if (resp.serverResponse == true && resp.statusCode === 200) {
          console.log("message: " + message);
          if (Array.isArray(activeRequest) && activeRequest.indexOf(resp.requestId) !== -1) {
            this.$bvToast.toast("Neues Spiel mit dem Namen " + resp.name + " wurde erstellt.", {
              title: "Neues Spiel erstellt",
              variant: "success",
              solid: true,
              appendToast: true
            });
          }

          resp.allData = JSON.stringify(resp);
          //modify newGame to display host and guest
          resp.host = resp.gameData.host;
          resp.guest = resp.gameData.guest;


          this.myGames.items.push(resp);
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
          activeRequest = sessionStorage.getItem("activeRequest") ? JSON.parse(sessionStorage.getItem("activeRequest")) : [],
          newGame = {
            gameId: "",
            name: this.form.name,
            state: "OPEN",
            lastModified: new Date(),
            matrixIds: [],
            gameData: {
              host: this.$store.getters.authenticatedUser.id,
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
        sessionStorage.setItem("activeRequest", JSON.stringify(activeRequest));
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
