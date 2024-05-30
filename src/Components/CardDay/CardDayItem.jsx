import s from "./CardDay.module.css"
import React from "react";
import CardTag from "./CardTag/CardTag";
import { useSelector } from "react-redux";
const CardDayItem = ({ day, currentMonth, currentYear, toggleModal, id }) => {

    const filteredNotesData = useSelector(state => state.notes.filteredNotesData);

    const isToday = () => {
        const today = new Date();
        return day === today.getDate()
            && currentMonth === today.getMonth()
            && currentYear === today.getFullYear();
    }

    const isWeekend = () => {
        const weekend = new Date(currentYear, currentMonth, day).getDay();
        return weekend === 0 || weekend === 6;
    }

    return (
        <>
            <div onClick={()=>toggleModal(id)} className={`${s.card} ${isToday() ? `${s.cardActive}` : ""}`}>
                <div className={s.cardItem}>
                    <div className={isWeekend() ? s.weekend : ""}>
                        { day }
                    </div>
                    {filteredNotesData.map(note=>note.id === id ? <div key={note.id} className={s.noteInfo}>
                        <b>{note.title}</b>
                        <div>{note.description.toString().length > 11 ? note.description.toString().substring(0,12) + "..." : note.description }</div>
                        <div>{note.startTime + "-" + note.endTime}</div>
                        <div><CardTag key={note.id} importance={note.importance} id={note.id}/></div>
                    </div> 
                    : <div key={note.id}></div>)}
                </div>
            </div>
        </>
    )
}

export default CardDayItem;