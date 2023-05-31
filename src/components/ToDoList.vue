<template>
  <div class="container todo-list py-3 px-0">
    <div class="form">
      <div v-if="!isUpdate()">
        <ToDoListAddTaskForm/>
        <ToDoListMultipleChoiceButton/>
      </div>
      <ToDoListUpdateTaskForm v-else/>
    </div>

    <div class="mt-3" v-if="tasks.length === 0">
      Список задач пуст
    </div>
    <div class="task-list px-3" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent v-else>
      <ToDoListElement v-for="task in tasks" :key="task.id" :id="'task__'+task.id" :task=task
                       @dragstart="startDrag($event,task)" @touchstart.prevent="touchstartDrag($event)
      " @touchmove="touchmoveDrag" @touchend="touchendDrag"></ToDoListElement>
    </div>
    <ToDoListModalWindow/>


  </div>
</template>

<script>
import ToDoListAddTaskForm from "@/components/ToDoListAddTaskForm";
import ToDoListUpdateTaskForm from "@/components/ToDoListUpdateTaskForm";
import ToDoListElement from "@/components/ToDoListElement";
import ToDoListMultipleChoiceButton from "@/components/ToDoListMultipleChoiceButton";
import ToDoListModalWindow from "@/components/ToDoListModalWindow";

export default {
  name: "ToDoList",
  components: {
    ToDoListModalWindow,
    ToDoListMultipleChoiceButton,
    ToDoListUpdateTaskForm,
    ToDoListElement,
    ToDoListAddTaskForm
  },
  data() {
    return {
      touchX: 0,
      touchY: 0,
      taskID: 0
    }
  },
  computed: {
    tasks: {
      get() {
        return this.$store.state.tasks;
      }
    }
  },
  methods: {
    updateCheckboxes() {
      this.$store.state.selectedTasks.forEach((task) => {
        let checkbox = document.getElementById('checkbox__' + task);
        checkbox.checked = !checkbox.checked;
      })
    },
    isUpdate() {
      return this.$store.state.isUpdate;
    },
    startDrag(evt, task) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('taskID', task.id)
    },
    onDrop(evt) {
      evt.stopPropagation();
      const taskID = Number(evt.dataTransfer.getData('taskID'))
      const draggableElement = document.getElementById('task__' + taskID);
      const dropzone = evt.currentTarget;
      const closest = evt.target.closest('.task');
      const replaceID = Number(closest.id.replace('task__', ''))
      const indexTask = this.$store.state.tasks.findIndex(task => task.id === taskID)
      const indexTaskToReplace = this.$store.state.tasks.findIndex(task => task.id === replaceID)
      if (indexTask < indexTaskToReplace) {
        dropzone.insertBefore(draggableElement, closest.nextSibling);
      } else {
        dropzone.insertBefore(draggableElement, closest);
      }
      this.$store.commit('dragAndDropTask', {taskID: taskID, replaceID: replaceID});
    },
    touchstartDrag(evt) {
      if (evt.target.className !== 'task__icon material-icons-outlined' && !this.isUpdate() &&
          evt.target.className !== 'checkbox' && evt.target.className !== 'checkbox__input'
      ) {
        this.taskID = evt.target.closest('.task').id.replace('task__', '')
      }
    },
    touchmoveDrag(evt) {

      if (evt.target.className !== 'task__icon material-icons-outlined' && !this.isUpdate() &&
          evt.target.className !== 'checkbox' && evt.target.className !== 'checkbox__input'
      ) {

        const taskToMove = document.getElementById('task__' + this.taskID)
        const top = evt.touches[0].pageY;
        taskToMove.style.position = 'absolute';
        taskToMove.style.width = '100%';
        taskToMove.style.paddingRight = '1.5rem';
        taskToMove.style.top = top + 'px';

        this.touchX = evt.touches[0].pageX
        this.touchY = evt.touches[0].pageY
      }
    },
    touchendDrag(evt) {
      if (evt.target.className !== 'task__icon material-icons-outlined' && !this.isUpdate() &&
          evt.target.className !== 'checkbox' && evt.target.className !== 'checkbox__input'
      ) {
        const taskToMove = document.getElementById('task__' + this.taskID)
        taskToMove.style.position = '';
        taskToMove.style.width = '';
        taskToMove.style.top = '';
        taskToMove.style.paddingRight = '';
        if (document.elementFromPoint(this.touchX, this.touchY).closest('.task-list') !== null) {
          const taskID = Number(this.taskID)
          const draggableElement = document.getElementById('task__' + taskID);
          const dropzone = evt.target.closest('.task-list');
          const closest = document.elementFromPoint(this.touchX, this.touchY).closest('.task');
          const replaceID = Number(closest.id.replace('task__', ''))
          const indexTask = this.$store.state.tasks.findIndex(task => task.id === taskID)
          const indexTaskToReplace = this.$store.state.tasks.findIndex(task => task.id === replaceID)
          if (indexTask < indexTaskToReplace) {
            dropzone.insertBefore(draggableElement, closest.nextSibling);
          } else {
            dropzone.insertBefore(draggableElement, closest);
          }
          this.$store.commit('dragAndDropTask', {taskID: taskID, replaceID: replaceID});
        }
      }
    },
  },
  mounted() {
    this.updateCheckboxes()
  }
}
</script>

<style lang="scss">

.form {
  background: var(--tg-theme-bg-color);
  position: sticky;
  width: 100%;
  height: auto;
  z-index: 10;
  top: 0;
}

.task-list {
  height: 100%;
}
</style>