<template>
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Удаление задачи</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Вы действительно хотите удалить
          {{ this.$store.state.isSelecting ? this.$store.state.selectedTasks.length + ' задач?' : 'задачу?' }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                  @click="deleteTasks">Да, удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {


  name: "ToDoListModalWindow",
  methods: {
    deleteTasks() {
      if (this.$store.state.isSelecting) {
        this.$store.commit('multipleDeleteTasks');
      } else if (this.$store.state.updatingTask.id === this.$store.state.idDeletingTask) {
        this.$store.commit('deleteUpdatingTask', this.$store.state.idDeletingTask);
      } else {
        this.$store.commit('deleteTask', this.$store.state.idDeletingTask);
      }
    },
  }
}
</script>

<style>

</style>