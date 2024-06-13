import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:'todos',
    initialState:{
    todos:[
        {
            id:nanoid(),
            title:"Title",
            tasks:[{id:nanoid(), name:"task1", isCompleted: false},{id:nanoid(), name:"task2", isCompleted: true}],
            noteId:"552024",
            filter:"all",
        },
        {
            id:nanoid(),
            title:"Title2",
            tasks:[{id:nanoid(), name:"task2", isCompleted: false}],
            noteId:"552024",
            filter:"all",
        },
    ],
    errorOnTodoCount:false,
    },
    reducers:{
        //CRUD for todo and task
        addTodoAction(state, action){
            if(state.todos.length >= 12){
                state.errorOnTodoCount = true;
            }
            else{
                state.todos.push({id:nanoid(),title:"Новый TODO",tasks:[],noteId:action.payload.noteId, filter:"all"});
            }
        },
        addTaskAction(state,action){
            const taskName = action.payload.task.name.trim();
            if(!taskName){
                return;
            }
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload.todoId){
                    todo.tasks.push(action.payload.task); 
                }
                return todo;
            });
        },
        removeTodoAction(state,action){
            state.errorOnTodoCount = false;
            state.todos = state.todos.filter(todo=> todo.id !== action.payload.todoId);
        },
        removeTaskAction(state,action){
            const {todoId, taskId} = action.payload;
            state.todos = state.todos.map(todo => 
            {
                if(todo.id === todoId)
                    todo.tasks = todo.tasks.filter(task => task.id !== taskId);
                return todo;
            });
        },
        onTaskNameChangeAction(state,action){
            const {taskId, name} = action.payload;
            state.todos = state.todos.map(todo => 
            {
                todo.tasks.map(task =>
                    {
                        if(task.id === taskId) 
                            task.name = name;
                        return task;
                    }); 
                return todo;
            });
        },
        onTodoNameChangeAction(state,action){
            const {todoId, title} = action.payload;
            state.todos = state.todos.map(todo =>{
                if(todo.id === todoId)
                todo.title = title;
            return todo;
            })
            
        },
        //Utility
        setFilterAciton(state,action){
            const {todoId, filterValue} = action.payload;
            state.todos = state.todos.map(todo => {
                if(todo.id === todoId) 
                    todo.filter = filterValue; 
                return todo;
            });
        },
        onCompletedAction(state,action){
            const {todoId, taskId} = action.payload;
            state.todos = state.todos.map(todo=>{
                if(todo.id === todoId)
                todo.tasks = todo.tasks.map(task => {
                    if(task.id === taskId) 
                        task.isCompleted = !task.isCompleted
                    return task;
                    });
                return todo;
            });
        },
        onDropRemoveTaskFromTodo(state,action){
            console.log(action.payload);
            const { todoId, taskId } = action.payload;
            console.log(todoId,taskId);
        },
        //Error
        onCloseErrorMessage(state,action){
            state.errorOnTodoCount = !state.errorOnTodoCount;
        },
    }
})

export const selectAllTodos = (state) => state.todos.todos;
export const selectErrorMessage = (state) => state.todos.errorOnTodoCount;

export const {addTodoAction, addTaskAction, removeTodoAction,
              removeTaskAction, onCompletedAction, setFilterAciton,
              onTaskNameChangeAction, onTodoNameChangeAction, onCloseErrorMessage,
              onDropRemoveTaskFromTodo,} = todoSlice.actions;

export default todoSlice.reducer;