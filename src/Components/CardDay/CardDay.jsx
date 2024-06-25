import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './CardDay.module.css'
import { CardDayItem } from './CardDayItem/CardDayItem';
import { MonthNavigation } from './MonthNavigation/MonthNavigation';
import { NoteModal } from '../Modal/NoteModal';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteAction, changeNoteAction, selectAllNotes, selectImportanceNotes, setNotesFilterAction } from '../../Redux/Slicers/notesSlice';
import { getDaysInMonth, onNextMonthAction, onPreviousMonthAction, selectAllDays } from '../../Redux/Slicers/currentDateSlice';

const dayOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

export const CardDay = React.memo(function () {
    const dispatch = useDispatch();
    const currentDate = useSelector(state => state.currentDate);
    const notesData = useSelector(selectAllNotes);
    const importanceNote = useSelector(selectImportanceNotes);
    const daysInMonth = useSelector(selectAllDays);

    const isOpen = useRef(false);
    const dialog = useRef(null);
    const refId = useRef(null);

    const currentMonth = currentDate.currentMonth;
    const currentYear = currentDate.currentYear;

    const addNote = useCallback((note) => dispatch(addNoteAction({ note })), [dispatch]);
    const changeNote = useCallback((note) => dispatch(changeNoteAction({ note })), [dispatch]);
    const onPreviousMonth = useCallback(() => dispatch(onPreviousMonthAction()), [dispatch]);
    const onNextMonth = useCallback(() => dispatch(onNextMonthAction()), [dispatch]);
    const setFilterNotes = useCallback((importanceToRemove) => dispatch(setNotesFilterAction(importanceToRemove)), [dispatch]);
    const setDays = useCallback((currentMonth, currentYear) => dispatch(getDaysInMonth({ currentMonth, currentYear })), [dispatch, getDaysInMonth, currentMonth, currentYear]);
    useEffect(() => {
        setDays(currentMonth, currentYear);
    }, [setDays, currentMonth, currentYear]);
    const toggleModal = ((id) => {
        if (!isOpen.current) {
            refId.current = id;
            console.log(id);
            dialog.current.showModal();
        }
        else
            dialog.current.close();
        isOpen.current = !isOpen.current;
    });

    return (
        <div className={s.cardWrapper}>

            <NoteModal dialog={dialog}
                addNote={addNote} changeNote={changeNote} notesData={notesData}
                id={refId} isOpen={isOpen} toggleModal={toggleModal} />

            <MonthNavigation currentMonth={currentMonth} currentYear={currentYear}
                onPreviousMonth={onPreviousMonth} onNextMonth={onNextMonth}
                setFilterNotes={setFilterNotes} />

            <div className={s.cardWrapperContent}>
                {dayOfWeek.map(day => <div key={day} className={s.day}>{day}</div>)}
                {daysInMonth && daysInMonth.map(currentDay =>
                    <CardDayItem key={currentDay.dayId} id={currentDay.dayId} importanceNote={importanceNote}
                        day={currentDay.day} toggleModal={toggleModal} notesData={notesData}
                        currentMonth={currentDay.month} checkMonth={currentMonth} currentYear={currentYear} />)}
            </div>
        </div>
    );
})