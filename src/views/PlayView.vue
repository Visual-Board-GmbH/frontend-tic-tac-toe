<template>
  <b-container>
    <!-- <router-link to="/new_game" class="new-game"><i class="fas fa-plus"></i><span class="ml-2">Neues Spiel</router-link></span>-->
    <button class="btn" v-b-modal.modal-new-game><i class="fas fa-plus"></i><span class="ml-2">Neues Spiel</span></button>
    <b-modal
        id="modal-new-game"
        title="BootstrapVue"
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
      if (topic === "ttt/all_games") {
        let gameData = JSON.parse(message.toString());

        //ToDo Identify User Obect
        this.myGames.items = gameData.filter(game => (game.host === "1" || game.guest === "1"));
        this.openGames.items = gameData.filter(game => game.guest === "");
      }
    });
  },
  components: {
    GameList
  },
  methods: {
    newGame: function () {
      const newGame = {
        name: this.form.name,
        gameData: {
          host: "2"
        },
        playerData: [],
        requestId: Math.random().toString(16).substr(2, 8)
      }
      this.$mqtt.publish("ttt/new_game", JSON.stringify(newGame))
      //ToDo set values dynamically
      const testGame = [{
        gameId: "1",
        name: "Test1",
        state: "open",
        lastModified: "28.07.2020",
        matrixId: "",
        host: "2",
        guest: "",
        gameData: {
          "host": "2",
          "guest": "",
          "moves": [],
          "winner": ""
        }
      }];
      this.$mqtt.publish("ttt/all_games", JSON.stringify(testGame))
      this.$root.$emit("bv::hide::modal", "modal-new-game");
      this.$bvToast.toast("Neues Spiel mit dem Namen " + newGame.name + " wurde erstellt.", {
        title: "Neues Spiel erstellt",
        variant: "success",
        solid: true,
        appendToast: true
      });
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
