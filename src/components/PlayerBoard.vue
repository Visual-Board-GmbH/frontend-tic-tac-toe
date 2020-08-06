<template>
  <b-container class="shadow bg-white rounded">
    <b-row>
      <b-col class="p-2 rounded text-center" :class="{active: activePlayer.toLowerCase() === 'host'}">{{ this.host }}</b-col>
      <b-col class="p-2 rounded text-center" :class="{active: activePlayer.toLowerCase() === 'guest'}">{{ this.guest }}</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "PlayerBoard",
  props: {
    host: {
      type: String,
      default: "Host"
    },
    guest: {
      type: String,
      default: "Guest"
    },
    activePlayer: {
      type: String,
      default: "host"
    }
  },
}
</script>
<style scoped>
.active {
  background-color: darkgray;
}
</style>