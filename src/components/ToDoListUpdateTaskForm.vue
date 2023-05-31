<template>
  <div class="form__update-task px-3">
    <div class="mb-3" >
      <div class="col">
        <input type="text" v-model="title" class="form-control form-control-lg form__update-task-input"/>
      </div>
    </div>
    <div class="row mx-0 form__update-task-buttons">
      <button class="btn btn-lg btn-warning me-4 form__update-task-update-button" @click="updateTask()">
        Обновить
      </button>
      <button class="mt-3 btn btn-lg btn-danger form__update-task-cancel-button" @click="cancelUpdate()">
        Отменить
      </button>
    </div>
  </div>

</template>

<script>
let updatedTitle = '';
export default {
  name: "ToDoListUpdateTaskForm",
  computed: {
    title: {
      get() {
        return this.$store.state.updatingTask.title;
      },
      set(value) {
        updatedTitle = value;
      }
    }
  },
  methods: {
    updateTask() {
      if (updatedTitle !== '') {
        this.$store.commit('updateTask', updatedTitle)
      }
    },
    cancelUpdate() {
      this.title = '';
      this.$store.commit('cancelUpdateTask')
    }
  }
}
</script>

<style>

</style>