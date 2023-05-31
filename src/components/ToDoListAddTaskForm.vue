<template>
  <div class="form__add-task px-3">
    <form @submit.prevent="addTask()">
      <div class="mb-3">
        <input type="text" v-model="title"
               class="form-control form-control-lg form__add-task-input"/>
      </div>
      <div class="row mx-0">
        <button class="btn btn-lg btn-success form__add-task-button">
          Добавить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "ToDoListAddTaskForm",
  data() {
    return {
      title: ''
    }
  },
  methods: {
    addTask() {
      if (this.title !== '') {
        store.commit('addTask', this.title)
        this.title = '';
      }
    }
  }
}
</script>

<style>

</style>