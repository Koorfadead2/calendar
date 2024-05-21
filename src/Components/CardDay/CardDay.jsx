import { useEffect, useMemo, useState } from 'react';
import s from './CardDay.module.css'
import CardDayItem from './CardDayItem';
import MonthNavigation from './MonthNavigation/MonthNavigation';
const getPrevDays = (month, year) => {
    const prevDate = new Date(year, month, 0);
    const prevDays = [];
    const dayOfWeekCurrentMonth = new Date(year, month, 1);
    if (dayOfWeekCurrentMonth.getDay() !== 1) {
        const numberForPreviousDays = 7 - (Math.abs(dayOfWeekCurrentMonth.getDay() - 7) + 1);
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

const getDaysInMonth = (month = new Date().getMonth(), year = new Date().getFullYear()) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}
const dayOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

const CardDay = () => {
    const [daysInMonth, setDays] = useState(getDaysInMonth());
    const [currentMonth, setMonth] = useState(new Date().getMonth());
    const [currentYear, setYear] = useState(new Date().getFullYear());
    const nextDays = getNextDays(currentMonth, currentYear);
    const prevDays = getPrevDays(currentMonth, currentYear);
    const onNextMonth = () => {
        if (currentMonth >= 11) {
            setMonth(-1);
            setYear(currentYear + 1);
        }
        setMonth(currentMonth => currentMonth + 1);
    }
    const onPreviousMonth = () => {
        if (currentMonth <= 0) {
            setMonth(12);
            setYear(currentYear - 1);
        }
        setMonth(currentMonth => currentMonth - 1);
    }
    useMemo(() => {
        setDays(getDaysInMonth(currentMonth, currentYear));
    }, [currentMonth])
    const prevCardElements = prevDays.map(day=><div className={`${s.daysOfNotCurrentMonth}`}>{day.getDate()}</div> );
    const nextCardElements = nextDays.map(day=><div className={`${s.daysOfNotCurrentMonth}`}>{day.getDate()}</div> );
    const cardDayElements = daysInMonth.map(currentDay => <CardDayItem key={currentDay} day={currentDay.getDate()} currentMonth={currentMonth} currentYear={currentYear} />)
    return (
        <div className={s.cardWrapper}>
            <MonthNavigation currentMonth={currentMonth} currentYear={currentYear} onNextMonth={onNextMonth} onPreviousMonth={onPreviousMonth} />
            <div className={s.cardWrapperContent}>
                    { dayOfWeek.map(day => <div className={s.day}>{ day }</div>) }
                    { prevCardElements }
                    { cardDayElements }
                    { nextCardElements } 
            </div>
        </div>
    );
}

export default CardDay;