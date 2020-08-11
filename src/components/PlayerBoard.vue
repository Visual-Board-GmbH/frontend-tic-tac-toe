<template>
  <b-container class="shadow bg-white rounded">
    <b-row>
      <b-col class="p-2 rounded text-center" :class="{active: activePlayer === host}">{{ this.host }}</b-col>
      <b-col class="p-2 rounded text-center" :class="{active: activePlayer === guest}">{{ this.guest }}</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "PlayerBoard",
  props: ["host", "guest", "activePlayer"]
}
</script>
<style scoped>
.active {
  background-color: darkgray;
}
</style>