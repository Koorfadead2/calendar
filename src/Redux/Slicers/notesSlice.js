import { createSlice } from "@reduxjs/toolkit";
const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notesData:[{title:"sad",description:"as",startTime:"09:00",endTime:"10:00",importance:"1",id:"552024"}],
        filteredNotesData:[{title:"sad",description:"as",startTime:"09:00",endTime:"10:00",importance:"1",id:"552024"}],
        importanceColorId:["0","1","2"]
    },
    reducers:{
        addNoteAction(state,action) {
            state.notesData.push(action.payload.note);
            state.filteredNotesData.push(action.payload.note);
            state.filteredNotesData = state.notesData.filter(note => state.importanceColorId.includes(note.importance));
        },
        changeNoteAction(state,action){
            const updatedNotesData = state.notesData.map(note => {
                if (note.id === action.payload.note.id) {
                  return action.payload.note;
                }
                return note;
              });
            state.notesData = updatedNotesData;
            state.filteredNotesData = state.notesData;
            state.filteredNotesData = state.notesData.filter(note => state.importanceColorId.includes(note.importance));
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

export const selectAllNotes = (state) => state.notes.notesData;

export const {addNoteAction, removeNoteAction, changeNoteAction, filterNotesByTagColorAction} = notesSlice.actions;

export default notesSlice.reducer;