<template>
  <div class="row mt-3 mx-3">
    <button class="btn btn-lg btn-warning" @click="selectTasksButton">
      {{ this.$store.state.isSelecting ? "Отменить выбор" : "Выбрать несколько задач" }}
    </button>
  </div>
  <div class="task row mt-3 mx-3" v-if="this.$store.state.isSelecting">
    <div class="task__body row  ms-1 me-1">
      <div class="col-8 col-sm-9 col-lg-10">
        <span class="task__text">Количество выбранных задач: {{ this.$store.state.selectedTasks.length }}</span>
      </div>
      <div class="task__icons-wrapper col-4 col-sm-3 col-lg-2">
        <span class="task__icon material-icons-outlined"
              data-bs-toggle="modal" data-bs-target="#modal">delete</span>
        <span class="task__icon material-icons-outlined" @click="markDone()"
              @touchstart="markDone()">check_circle</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDoListMultipleChoiceButton",
  methods: {
    selectTasksButton() {
      this.$store.commit('selectTasksButton');
    },
    markDone() {
      this.$store.state.selectedTasks.forEach((task) => {
        let checkbox = document.getElementById('checkbox__' + task);
        checkbox.checked = !checkbox.checked;
      })
      this.$store.commit('multipleMarkDone');
    },

  }
}
</script>

<style>

</style>