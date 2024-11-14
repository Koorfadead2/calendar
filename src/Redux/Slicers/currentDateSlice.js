import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const currentDateSlice = createSlice({
    name: 'currentDate',
    initialState: {
    daysInMonth:[],
    currentDay:null,
    currentMonth:new Date().getMonth(),
    currentYear:new Date().getFullYear(),
    },
    reducers:{
        getDaysInMonth (state,action) {
            const prevDate = new Date(state.currentYear, state.currentMonth, 0);
            const nextDate = new Date(state.currentYear, state.currentMonth + 1, 1);
            const prevDays = [];
            const nextDays = [];
            const daysOfWeekCurrentMonth = new Date(state.currentYear, state.currentMonth, 1);
            if (daysOfWeekCurrentMonth.getDay() !== 1) {
                const numberForPreviousDays = daysOfWeekCurrentMonth.getDay() === 0 ? 7 - (Math.abs((daysOfWeekCurrentMonth.getDay() + 8) - 7)) : 7 - (Math.abs(daysOfWeekCurrentMonth.getDay() - 7) + 1);
                for (let i = 0; i < numberForPreviousDays; i++) {
                    prevDays.push(prevDate.getDate());
                    prevDate.setDate(prevDate.getDate() - 1);
                }
            }
            const daysOfWeekNextMonth = new Date(state.currentYear, state.currentMonth + 1, 0);
            if (daysOfWeekNextMonth.getDay() !== 0) {
                const numberForNextDays = Math.abs(daysOfWeekNextMonth.getDay() - 7);
                for (let i = 0; i < numberForNextDays; i++) {
                    nextDays.push(nextDate.getDate());
                    nextDate.setDate(nextDate.getDate() + 1);
                }
            }
            const date = new Date(state.currentYear, state.currentMonth, 1);
            const days = [];
            while (date.getMonth() === state.currentMonth) { 
                days.push({dayId:String(date.getDate())+String(date.getMonth())+String(date.getFullYear()),day:date.getDate(), month:date.getMonth()});
                date.setDate(date.getDate() + 1);
            }
            prevDays.map((day)=>days.unshift(
                {
                    dayId:String(day)+String(daysOfWeekNextMonth.getMonth()-1)+String(date.getFullYear()),
                    day:day,
                    month:daysOfWeekCurrentMonth.getMonth()-1
                }));
            nextDays.map((day)=>days.push(
                {
                    dayId:String(day)+String(daysOfWeekNextMonth.getMonth()+1)+String(date.getFullYear()),
                    day:day,
                    month:daysOfWeekNextMonth.getMonth()+1
                }));
            state.daysInMonth = days;
        },
        onNextMonthAction (state,action) {
            if (state.currentMonth >= 11) {
                state.currentMonth = 0 ;
                state.currentYear += 1;
            }
            else
                state.currentMonth += 1;
        },
        onPreviousMonthAction (state,action) {
            if (state.currentMonth <= 0) {
                state.currentYear -= 1;
                state.currentMonth = 11;
            }
            else
                state.currentMonth -= 1;
        },
        
    },
})

export const selectAllDays = (state) => state.currentDate.daysInMonth;

export const {getDaysInMonth,onNextMonthAction,onPreviousMonthAction, 
              getPrevDays, getNextDays} = currentDateSlice.actions;

export default currentDateSlice.reducer;