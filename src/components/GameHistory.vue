<template>
  <b-container class="w-25 shadow bg-white rounded">
    <b-row
        v-for="move in this.moves"
        :key="move.count"
        @click="changeMove"
        >
      {{ move.player }}
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "GameHistory",
  props: ["moves"],
  methods: {
    changeMove: function () {
      this.$emit("updateMoves", this.moves);
    }
  }
}
</script>

<style scoped>

</style>