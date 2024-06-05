import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./Slicers/notesSlice";
import currentDateReducer from "./Slicers/currentDateSlice";
import todoReducer from "./Slicers/todoSlice"

export default configureStore({
    reducer: {
        currentDate: currentDateReducer,
        notes: notesReducer,
        todos: todoReducer,
    },
});
