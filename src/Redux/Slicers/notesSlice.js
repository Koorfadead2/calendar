import { createSlice } from "@reduxjs/toolkit";
const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notesData:[],
        filteredNotesData:[],
        importanceColorId:["0","1","2"]
    },
    reducers:{
        addNoteAction(state,action) {
            console.log(action.payload);
            state.notesData.push(action.payload.note);
            state.filteredNotesData.push(action.payload.note);
            state.filteredNotesData = state.notesData.filter(note => state.importanceColorId.includes(note.importance));
        },
        changeNoteAction(state,action){
            console.log(action.payload);
            const updatedNotesData = state.notesData.map(note => {
                if (note.id === action.payload.note.id) {
                  return action.payload.note;
                }
                return note;
              });
            state.notesData = updatedNotesData;
            state.filteredNotesData = state.notesData;
        },
        removeNoteAction(state, action) {
            const confirmDelete = confirm("Вы уверены, что хотите удалить заметку?");
            if(confirmDelete){
                state.notesData = state.notesData.filter(note => note.id !== action.payload.id);
                state.filteredNotesData = state.notesData;
                window.location.href="/";
            }
        },
        filterNotesByTagColorAction(state,action){
            if(state.importanceColorId.find(number => number === action.payload.importance)){
                const index = state.importanceColorId.indexOf(action.payload.importance);
                state.importanceColorId.splice(index, 1);
                state.filteredNotesData = state.notesData.filter(note => state.importanceColorId.includes(note.importance));
            }
            else{
                state.importanceColorId.push(action.payload.importance);
                state.filteredNotesData = state.notesData.filter(note => state.importanceColorId.includes(note.importance));
            }
        },
    },
})

export const {addNoteAction, removeNoteAction, changeNoteAction, filterNotesByTagColorAction} = notesSlice.actions;

export default notesSlice.reducer;