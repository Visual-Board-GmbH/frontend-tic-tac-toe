<template>
  <div>
    <div>PlayView</div>
    <GameBoard></GameBoard>
  </div>
</template>

<script>

  import GameBoard from "@/components/GameBoard";
  export default {
    name: "PlayView",
    components: {
      GameBoard
    }
  }
</script>

<style scoped>

</style>
