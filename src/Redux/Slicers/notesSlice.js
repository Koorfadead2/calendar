import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notesData:[]
    },
    reducers:{
        addNoteAction(state,action) {
            state.notesData.push(action.payload.note);
        },
        changeNoteAction(state,action){
            //state.notesData;
        },
        removeNoteAction(state, action) {
            state.notesData = state.notesData.filter(note => note.id !== action.payload.id);
            window.location.href="/";
        },
    },
})

export const {addNoteAction, removeNoteAction} = notesSlice.actions;

export default notesSlice.reducer;