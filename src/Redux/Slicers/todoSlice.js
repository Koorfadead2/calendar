import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:'todos',
    initialState:[
        {
            id:1,
            title:"Title",
            tasks:[{id:1, name:"task1", isCompleted: false},{id:2, name:"task2", isCompleted: true}],
            completed:false,
            noteId:"552024"
        },
        {
            id:2,
            title:"Title2",
            tasks:[{id:3, name:"task2", isCompleted: false}],
            noteId:"552024"
        },
    ],
    reducers:{

    }
})

export const selectAllTodos = (state) => state.todos;

export default todoSlice.reducer;