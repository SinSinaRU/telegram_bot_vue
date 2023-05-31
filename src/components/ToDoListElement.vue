<template>
  <div class="task row mx-1">
    <div class="task__body row ms-0 me-1 justify-content-between" draggable="true">
      <div :class="task.status ? 'col-6 col-sm-3 task__done' : 'col-6 col-sm-8'">
        <span class="task__text ">{{ task.title }}</span>
      </div>
      <div class="col-5 col-sm-3 col-md-3 col-lg-2 task__icons-wrapper" v-if="!this.$store.state.isSelecting">
        <span class="task__icon material-icons-outlined"
              @click="deleteTask()" @touchstart="deleteTask()">delete</span>
        <span class="task__icon material-icons-outlined" @click="updateTask()" @touchstart="updateTask()"
              v-if="idUpdatingTask!==task.id && !task.status">edit</span>
        <span class="task__icon material-icons-outlined" @click="markDone()" @touchstart="markDone()">{{
            task.status ? "cancel" : "check_circle"
          }}</span>
      </div>
      <div class="checkbox col-3 col-lg-1" @touchstart="touchChangeCheckbox" v-else>
        <input class="checkbox__input" type="checkbox" :id="'checkbox__'+this.task.id" :value=this.task.id
               @change="changeCheckbox()">
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from 'bootstrap';

export default {
  name: "ToDoListElement",
  props: ['task'],
  computed: {
    idUpdatingTask() {
      return this.$store.state.updatingTask.id;
    }
  },
  methods: {
    markDone() {
      this.$store.commit('markDone', this.task.id);
    },
    updateTask() {
      this.$store.commit('updatingTask', this.task.id)
    },
    deleteTask() {
      const modalToggle = document.getElementById('modal');
      const myModal = new Modal(document.getElementById('modal'))
      myModal.show(modalToggle)
      this.$store.commit('getIdDeletingTask', this.task.id);
    },
    isUpdate() {
      return this.$store.state.isUpdate;
    },
    touchChangeCheckbox() {
      const checkbox = document.getElementById('checkbox__' + this.task.id);
      checkbox.checked = !checkbox.checked;
      this.changeCheckbox();
    },
    changeCheckbox() {
      const checkbox = document.getElementById('checkbox__' + this.task.id);
      if (checkbox.checked) {
        this.$store.commit('selectTask', this.task.id)
      } else {
        this.$store.commit('unselectTask', this.task.id);
      }
    }
  }

}
</script>

<style lang="scss">
.task {
  &:first-of-type::before {
    content: ' ';
    display: block;
    height: 1rem;
  }

  &::after {
    content: ' ';
    display: block;
    height: 1rem;
  }

  &__body {
    cursor: pointer;
    background-color: var(--tg-theme-secondary-bg-color);
    padding: 10px 50px 10px 15px;
    text-align: left;
    position: relative;
    border-radius: 8px;
  }

  &__text {
    word-wrap: break-word;
  }

  &__done &__text {
    text-decoration: line-through;
    opacity: 0.3;
    flex: 1;
  }

  &__icons-wrapper {
    position: absolute;
    width: auto;
    text-align: right;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    display: inline-block;
  }

  &__icon {
    margin: 0px 5px;
    z-index: 6;
  }

  &__icon:hover {
    color: var(--tg-theme-bg-color);
    cursor: pointer;
  }


}

.checkbox{
  &__input{
    position: absolute;
    right: 2rem;
    top: 40%;
  }
}
</style>