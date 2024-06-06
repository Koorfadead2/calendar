import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:'todos',
    initialState:{
    todos:[
        {
            id:nanoid(),
            title:"Title",
            tasks:[{id:nanoid(), name:"task1", isCompleted: false},{id:nanoid(), name:"task2", isCompleted: true}],
            noteId:"552024"
        },
        {
            id:nanoid(),
            title:"Title2",
            tasks:[{id:nanoid(), name:"task2", isCompleted: false}],
            noteId:"552024"
        },
    ],
    todoCounter:0
    },
    reducers:{
        addTodoAction(state, action){
            if(state.todoCounter >= 10){
                console.log("Нельзя добавить больше 10")
            }
            else{
                state.todos.push({id:nanoid(),title:"Новый TODO",tasks:[],noteId:action.payload.noteId});
                state.todoCounter++;
            }
        },
        addTaskAction(state,action){
            const taskName = action.payload.task.name.trim();
            if(!taskName){
                return;
            }
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload.todoId.todoId){
                    todo.tasks.push(action.payload.task); 
                }
                return todo;
            });
        },
        removeTodoAction(state,action){
            state.todos = state.todos.filter(todo=> todo.id !== action.payload.todoId);
            state.todoCounter--;
        },
        removeTaskAction(state,action){
            state.todos = state.todos.map(todo => 
            {
                todo.tasks = todo.tasks.filter(task => task.id !== action.payload.taskId);
                return todo;
            });
        },
        onCompletedAction(state,action){
            console.log(action.payload);
            state.todos = state.todos.map(todo=>{
                todo.tasks = todo.tasks.map(task => {
                    if(task.id === action.payload.taskId) 
                        task.isCompleted = !task.isCompleted
                    return task;
                    });
                return todo;
            });
        },
    }
})

export const selectAllTodos = (state) => state.todos.todos;

export const {addTodoAction, addTaskAction, removeTodoAction, removeTaskAction, onCompletedAction} = todoSlice.actions;

export default todoSlice.reducer;