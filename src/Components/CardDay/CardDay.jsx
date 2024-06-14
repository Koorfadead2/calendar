import React, { useCallback, useEffect, useRef } from 'react';
import s from './CardDay.module.css'
import {CardDayItem} from './CardDayItem/CardDayItem';
import {MonthNavigation} from './MonthNavigation/MonthNavigation';
import {NoteModal} from '../Modal/NoteModal';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteAction, changeNoteAction, selectAllNotes } from '../../Redux/Slicers/notesSlice';
import { getDaysInMonth, setIdForModalAction } from '../../Redux/Slicers/currentDateSlice';

const getPrevDays = (month, year) => {
    const prevDate = new Date(year, month, 0);
    const prevDays = [];
    const dayOfWeekCurrentMonth = new Date(year, month, 1);
    if (dayOfWeekCurrentMonth.getDay() !== 1) {
        const numberForPreviousDays = dayOfWeekCurrentMonth.getDay() === 0 ? 7 - (Math.abs((dayOfWeekCurrentMonth.getDay() + 8) - 7)) : 7 - (Math.abs(dayOfWeekCurrentMonth.getDay() - 7) + 1);
        for (let i = 0; i < numberForPreviousDays; i++) {
            prevDays.push(new Date(prevDate));
            prevDate.setDate(prevDate.getDate() - 1);
        }
    }
    //reverse() необходим для верного отображения прошлых дней
    return prevDays.reverse();
}

const getNextDays = (month, year) => {
    const nextDate = new Date(year, month + 1, 1);
    const nextDays = [];
    const dayOfWeekCurrentMonth = new Date(year, month + 1, 0);
    if (dayOfWeekCurrentMonth.getDay() !== 0) {
        const numberForNextDays = Math.abs(dayOfWeekCurrentMonth.getDay() - 7);
        for (let i = 0; i < numberForNextDays; i++) {
            nextDays.push(new Date(nextDate));
            nextDate.setDate(nextDate.getDate() + 1);
        }
    }
    return nextDays;
}

const dayOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

export const CardDay = React.memo(function() {
    const dispatch = useDispatch();
    const currentDate = useSelector(state=>state.currentDate);
    const notesData = useSelector(selectAllNotes);

    const isOpen = useRef(false);
    const dialog = useRef(null);

    const currentMonth = currentDate.currentMonth;
    const currentYear = currentDate.currentYear;
    const id = currentDate.dayId;

    const nextDays = getNextDays(currentMonth, currentYear);
    const prevDays = getPrevDays(currentMonth, currentYear);

    const setDays = (currentMonth, currentYear) => dispatch(getDaysInMonth(currentMonth, currentYear));
    useEffect(() => {
        setDays(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    const daysInMonth = currentDate.daysInMonth;

    const addNote = useCallback((note) => dispatch(addNoteAction({note})),[dispatch]);
    const changeNote = useCallback((note) => dispatch(changeNoteAction({note})),[dispatch]);
    const setIdForModal = useCallback((id) => dispatch(setIdForModalAction({id})),[dispatch]);

    const toggleModal = ((id) => {
        if(!isOpen.current){
            setIdForModal(id);
            dialog.current.showModal();
        }
        else
            dialog.current.close();
        isOpen.current = !isOpen.current;
    });
    const prevCardElements = prevDays.map(day=><div key={crypto.randomUUID()} className={`${s.daysOfNotCurrentMonth}`}>{day.getDate()}</div> );
    const nextCardElements = nextDays.map(day=><div key={crypto.randomUUID()} className={`${s.daysOfNotCurrentMonth}`}>{day.getDate()}</div> );
    const cardDayElements = daysInMonth.map(currentDay => 
    <CardDayItem key={crypto.randomUUID()} id={currentDay.toString() + currentMonth.toString() + currentYear.toString()}
                 day={currentDay} toggleModal={toggleModal}
                 currentMonth={currentMonth} currentYear={currentYear}
                  />)
    return (
        <div className={s.cardWrapper}>
            <MonthNavigation currentMonth={currentMonth} currentYear={currentYear} />
            <div className={s.cardWrapperContent}>
                    { dayOfWeek.map(day => <div key={day} className={s.day}>{ day }</div>) }
                    { prevCardElements }
                    { cardDayElements }
                    { nextCardElements } 
                    <NoteModal dialog={dialog} addNote={addNote} changeNote={changeNote} notesData={notesData} id={id} isOpen={isOpen} toggleModal={toggleModal}/>
            </div>
        </div>
    );
})