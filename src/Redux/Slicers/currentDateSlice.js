import { createSlice } from "@reduxjs/toolkit";

const currentDateSlice = createSlice({
    name: 'currentDate',
    initialState: {
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
            if (state.currentMonth >= 11) {
                state.currentMonth = -1 ;
                state.currentYear += 1;
            }
            else
                state.currentMonth += 1;
            state.currentDateTimestamp = Date.now();
        },
        onPreviousMonthAction (state,action) {
            if (state.currentMonth <= 0) {
                state.currentMonth = 12;
                state.currentYear -= 1;
            }
            else
                state.currentMonth -= 1;
            state.currentDateTimestamp = Date.now();
        }
    },
})

export const {getDaysInMonth,onNextMonthAction,onPreviousMonthAction} = currentDateSlice.actions;

export default currentDateSlice.reducer;