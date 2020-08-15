<template>
  <b-container class="shadow bg-white rounded">
    <b-row>
      <b-col class="p-2 rounded text-center" :class="{active: activePlayer === 'HOST', 'bg-success': winner === 'HOST'}">{{ playerData.find(p => p.player === "HOST").displayName }}</b-col>
      <b-col class="p-2 rounded text-center" :class="{active: activePlayer === 'GUEST', 'bg-success': winner === 'GUEST'}">{{ this.guest === 0 ? "Warten auf Spieler" : playerData.find(p => p.player === "GUEST").displayName }}</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "PlayerBoard",
  props: ["host", "guest", "activePlayer", "winner", "playerData"]
}
</script>
<style scoped>
.active {
  background-color: darkgray;
}
</style>