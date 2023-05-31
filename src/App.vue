<template>
  <ToDoList/>
</template>

<script>

import ToDoList from "@/components/ToDoList";

export default {
  name: 'App',
  components: {
    ToDoList
  }
}
</script>

<style lang="scss">
#app {
  background-color: var(--tg-theme-bg-color);
  min-height: 100vh;
  text-align: center;
  font-size: calc(10px + 2vmin);
  color: var(--tg-theme-text-color);
}
</style>
