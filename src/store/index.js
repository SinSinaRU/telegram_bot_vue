import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({isCompression: false});

export default createStore({
        state: {
            tasks: [],
            isUpdate: false,
            updatingTask: [],
            isSelecting: false,
            selectedTasks: [],
            idDeletingTask: 0
        },
        mutations: {
            addTask(state, title) {
                let id = 1;
                if (state.tasks.length !== 0) {
                    const ids = state.tasks.map(task => {
                        return task.id;
                    });
                    id = state.tasks.find(task => task.id === Math.max(...ids)).id + 1;
                }
                const newTask = {
                    id: id,
                    title: title,
                    status: false
                };
                state.tasks.push(newTask);
            },
            markDone(state, id) {
                const newTask = state.tasks.find(task => task.id === id);
                newTask.status = !newTask.status;
                const tasks = state.tasks.map(task => task.id === id ? newTask : task);
                state.tasks = tasks
            },
            updatingTask(state, id) {
                state.isUpdate = true;
                state.updatingTask = state.tasks.find(task => task.id === id);
            },
            updatingTitle(state, title) {
                state.updatingTask.title = title;
            },
            updateTask(state, title) {
                state.updatingTask.title = title;
                const indexTaskToUpdate = state.tasks.findIndex((task) => task.id === state.updatingTask.id);
                state.tasks.splice(indexTaskToUpdate, 1, state.updatingTask);
                state.isUpdate = false;
                state.updatingTask = [];
            },
            cancelUpdateTask(state) {
                state.isUpdate = false;
                state.updatingTask = [];
            },
            getIdDeletingTask(state, id){
                state.idDeletingTask = id;
            },
            deleteTask(state, id) {
                const indexTaskToDelete = state.tasks.findIndex((task) => task.id === id);
                state.tasks.splice(indexTaskToDelete, 1);
                state.idDeletingTask = 0
            },
            deleteUpdatingTask(state, id) {
                const indexTaskToDelete = state.tasks.findIndex(task => task.id === id);
                state.tasks.splice(indexTaskToDelete, 1);
                state.idDeletingTask = 0
                state.isUpdate = false;
                state.updatingTask = [];
            },
            dragAndDropTask(state, IDs) {
                const indexTask = state.tasks.findIndex(task => task.id === IDs.taskID)
                const indexTaskToReplace = state.tasks.findIndex(task => task.id === IDs.replaceID)
                const movedItem = state.tasks.find((item, index) => index === indexTask);
                const remainingItems = state.tasks.filter((item, index) => index !== indexTask);
                state.tasks = [
                    ...remainingItems.slice(0, indexTaskToReplace),
                    movedItem,
                    ...remainingItems.slice(indexTaskToReplace)
                ]
            },
            selectTasksButton(state) {
                state.isSelecting = !state.isSelecting
                if (!state.isSelecting) {
                    state.selectedTasks = []
                }
            },
            selectTask(state, id) {
                const isAlreadySelected = state.selectedTasks.find(idTask => idTask === id)
                if (!isAlreadySelected) {
                    state.selectedTasks.push(id)
                }
            },
            unselectTask(state, id) {
                const indexOfTask = state.selectedTasks.findIndex(idTask => id === idTask)
                state.selectedTasks.splice(indexOfTask, 1)
            },
            multipleDeleteTasks(state) {
                state.selectedTasks.forEach(idTask => {
                    const indexTaskToDelete = state.tasks.findIndex((task) => task.id === idTask);
                    state.tasks.splice(indexTaskToDelete, 1);
                });
                state.selectedTasks = []
            },
            multipleMarkDone(state) {
                state.selectedTasks.forEach(idTask => {
                    let newTask = state.tasks.find(task => task.id === idTask);
                    newTask.status = !newTask.status;
                    let tasks = state.tasks.map(task => task.id === idTask ? newTask : task);
                    state.tasks = tasks
                });
                state.selectedTasks = []
            },

        },
        plugins: [
            createPersistedState({
                storage: {
                    getItem: key => ls.get(key),
                    setItem: (key, value) => ls.set(key, value),
                    removeItem: key => ls.remove(key)
                }
            }),
        ],
    }
)