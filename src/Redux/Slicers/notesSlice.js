import { createSlice, current } from "@reduxjs/toolkit";
const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notesData:[{id:"552024", title:"sad",description:"as",startTime:"09:00",endTime:"10:00",importance:"1"}],
        importanceNotes:['0','1','2'],
    },
    reducers:{
        //CRUD for notes
        addNoteAction(state,action){
            state.notesData.push(action.payload.note);
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
        },
        removeNoteAction(state, action){
            const confirmDelete = confirm("Вы уверены, что хотите удалить заметку?");
            if(confirmDelete){
                state.notesData = state.notesData.filter(note => note.id !== action.payload.id);
                window.location.href="/";
            }
        },
        //Filter
        setNotesFilterAction(state,action){
            if(state.importanceNotes.find((importance) => importance === action.payload.importanceToRemove))
                state.importanceNotes = state.importanceNotes.filter((importance)=> importance !== action.payload.importanceToRemove);
            else
                state.importanceNotes.push(action.payload.importanceToRemove);
        },
    },
})

export const selectAllNotes = (state) => state.notes.notesData;
export const selectImportanceNotes = (state) => state.notes.importanceNotes;

export const {addNoteAction, removeNoteAction, changeNoteAction, setNotesFilterAction} = notesSlice.actions;

export default notesSlice.reducer;