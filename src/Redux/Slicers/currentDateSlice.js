import { createSlice } from "@reduxjs/toolkit";

const currentDateSlice = createSlice({
    name: 'currentDate',
    initialState: {
        dayId:null,
        daysInMonth:[],
        currentDay:null,
        currentMonth:new Date().getMonth(),
        currentYear:new Date().getFullYear(),
        currentDateTimestamp: Date.now()
    },
    reducers:{
        getDaysInMonth (state,action) {
            const date = new Date(state.currentYear, state.currentMonth, 1);
            const days = [];
            while (date.getMonth() === state.currentMonth) {
                days.push(date.getDate());
                date.setDate(date.getDate() + 1);
            }
            state.daysInMonth = days;
        },
        onNextMonthAction (state,action) {
            if (state.currentMonth >= 10) {
                state.currentMonth = 0 ;
                state.currentYear += 1;
            }
            else
                state.currentMonth += 1;
            state.currentDateTimestamp = Date.now();
        },
        onPreviousMonthAction (state,action) {
            if (state.currentMonth <= 0) {
                state.currentYear -= 1;
                state.currentMonth = 11;
            }
            else
                state.currentMonth -= 1;
            state.currentDateTimestamp = Date.now();
        },
        setIdForModalAction (state,action){
            state.dayId = action.payload.id;
        }
    },
})

export const {getDaysInMonth,onNextMonthAction,onPreviousMonthAction, setIdForModalAction} = currentDateSlice.actions;

export default currentDateSlice.reducer;