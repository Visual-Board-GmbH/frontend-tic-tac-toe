<template>
  <b-container class="shadow bg-white rounded">
    <b-row>
      <b-col class="p-2 rounded text-center" :class="{active: activePlayer === 'HOST', 'bg-success': winner === 'HOST'}">{{ this.host }}</b-col>
      <b-col class="p-2 rounded text-center" :class="{active: activePlayer === 'GUEST', 'bg-success': winner === 'GUEST'}">{{ this.guest === 0 ? "Warten auf Spieler" : this.guest }}</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "PlayerBoard",
  props: ["host", "guest", "activePlayer", "winner"]
}
</script>
<style scoped>
.active {
  background-color: darkgray;
}
</style>