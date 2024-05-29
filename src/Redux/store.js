import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./Slicers/notesSlice";
import currentDateReducer from "./Slicers/currentDateSlice";
export default configureStore({
    reducer: {
        currentDate: currentDateReducer,
        notes: notesReducer,
    }
});