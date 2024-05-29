import { useMemo, useRef, useState } from 'react';
import s from './CardDay.module.css'
import CardDayItem from './CardDayItem';
import MonthNavigation from './MonthNavigation/MonthNavigation';
import NoteModal from '../Modal/NoteModal';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteAction } from '../../Redux/Slicers/notesSlice';
import { getDaysInMonth, onNextMonthAction, onPreviousMonthAction } from '../../Redux/Slicers/currentDateSlice';
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

const CardDay = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(state=>state.currentDate);
    //const [daysInMonth, setDays] = useState(getDaysInMonth());
    // const [currentMonth, setMonth] = useState(new Date().getMonth());
    // const [currentYear, setYear] = useState(new Date().getFullYear());
    const [id, setId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dialog = useRef();
    const currentMonth = currentDate.currentMonth;
    const currentYear = currentDate.currentYear;
    const nextDays = getNextDays(currentMonth, currentYear);
    const prevDays = getPrevDays(currentMonth, currentYear);
    const setDays = (currentMonth, currentYear) => dispatch(getDaysInMonth(currentMonth, currentYear));
    const daysInMonth = currentDate.daysInMonth;
    //console.log(daysInMonth);
    const addNote = (note) => dispatch(addNoteAction({note}));
    const onPreviousMonth = ()=>dispatch(onPreviousMonthAction());
    const onNextMonth = ()=>dispatch(onNextMonthAction());
    const toggleModal = ((id) => {
        setId(id);
        if(!isOpen)
            dialog.current.showModal();
        else
            dialog.current.close();
        setIsOpen(!isOpen);
    });

    useMemo(() => {
        setDays(currentMonth, currentYear);
    }, [currentMonth])

    const prevCardElements = prevDays.map(day=><div key={crypto.randomUUID()} className={`${s.daysOfNotCurrentMonth}`}>{day.getDate()}</div> );
    const nextCardElements = nextDays.map(day=><div key={crypto.randomUUID()} className={`${s.daysOfNotCurrentMonth}`}>{day.getDate()}</div> );
    const cardDayElements = daysInMonth.map(currentDay => 
    <CardDayItem key={currentDay.toString() + currentMonth.toString() + currentYear.toString()} id={currentDay.toString() + currentMonth.toString() + currentYear.toString()}
                 day={currentDay} toggleModal={toggleModal}
                 currentMonth={currentMonth} currentYear={currentYear}
                  />)
    return (
        <div className={s.cardWrapper}>
            <MonthNavigation onNextMonth={onNextMonth} onPreviousMonth={onPreviousMonth} currentMonth={currentMonth} currentYear={currentYear} />
            <div className={s.cardWrapperContent}>
                    { dayOfWeek.map(day => <div key={day} className={s.day}>{ day }</div>) }
                    { prevCardElements }
                    { cardDayElements }
                    { nextCardElements } 
                    <NoteModal dialog={dialog} addNote={addNote} id={id} isOpen={isOpen} toggleModal={toggleModal}/>
            </div>
        </div>
    );
}

export default CardDay;