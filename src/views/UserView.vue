<template>
  <transition name="fade">
  <div>
    <div>UserView</div>
  </div>
  </transition>
</template>

<script>

  export default {
    name: "UserView",
    components: {
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade-leave-to {
    opacity: 1;
  }
</style>
