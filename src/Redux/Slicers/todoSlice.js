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
            errorOnTodoCount:false,
        },
        {
            id:nanoid(),
            title:"Title2",
            tasks:[{id:nanoid(), name:"task2", isCompleted: false}],
            noteId:"552024",
            filter:"all",
            errorOnTodoCount:false,
        },
    ],
    },
    reducers:{
        //CRUD for todo and task
        addTodoAction(state, action){
            const todo = state.todos.filter((todo)=>todo.noteId === action.payload.noteId);
            if(todo.length >= 4){
                todo.map((todo)=>todo.errorOnTodoCount = true);
            }
            else{
                state.todos.push({id:nanoid(),title:"Новый TODO",tasks:[],noteId:action.payload.noteId, filter:"all", errorOnTodoCount:false});
            }
            console.log(current(state));
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
            const todo = state.todos.filter(todo => todo.noteId === action.payload.noteId);
            todo.map((todo)=>todo.errorOnTodoCount = false);
            state.todos = state.todos.filter(todo => todo.id !== action.payload.todoId);
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
        onDropRemoveTaskFromTodo(state, action) {
            const { sourceTodoId, destinationTodoId, taskId } = action.payload;
            const sourceTodo = state.todos.find(todo => todo.id === sourceTodoId);
            const destinationTodo = state.todos.find(todo => todo.id === destinationTodoId);
        
            if (!sourceTodo || !destinationTodo) {
                return state;
            }
        
            const taskToMove = sourceTodo.tasks.find(task => task.id === taskId);
        
            if (!taskToMove) {
                return state;
            }
        
            const updatedSourceTasks = sourceTodo.tasks.filter(task => task.id !== taskId);
            const updatedDestinationTasks = [taskToMove, ...destinationTodo.tasks];
        
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === sourceTodoId) {
                    return { ...todo, tasks: updatedSourceTasks };
                }
                if (todo.id === destinationTodoId) {
                    return { ...todo, tasks: updatedDestinationTasks };
                }
                return todo;
            });
        
            return {
                todos: updatedTodos
            };
        },
        //Error
        onCloseErrorMessage(state,action){
            state.errorOnTodoCount = !state.errorOnTodoCount;
        },
    }
})

export const selectAllTodos = (state) => state.todos.todos;

export const {addTodoAction, addTaskAction, removeTodoAction,
              removeTaskAction, onCompletedAction, setFilterAciton,
              onTaskNameChangeAction, onTodoNameChangeAction, onCloseErrorMessage,
              onDropRemoveTaskFromTodo,} = todoSlice.actions;

export default todoSlice.reducer;