import s from "./CardDayItem.module.css"
import React from "react";
import { CardTag } from "../CardTag/CardTag";
export const CardDayItem = React.memo(function(
    { day, notesData, currentMonth, currentYear, checkMonth, toggleModal, id, importanceNote }){

    let filteredNotesData = notesData;
    filteredNotesData = filteredNotesData.filter((note)=>importanceNote.find((importance)=>importance === note.importance));
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

    const isCurrentDateMonth = () =>{
        const month = new Date(currentYear, checkMonth, day).getMonth();
        return currentMonth !== month;
    }
    return (
        <>
            <div onClick={() => toggleModal(id)} className={`${s.card} ${isCurrentDateMonth() ? s.daysOfNotCurrentMonth : ""} ${isToday() ? `${s.cardActive}` : ""}`}>
                <div className={s.cardItem}>
                    <div className={`${currentMonth } ${isWeekend() ? s.weekend : ""}`}>
                        { day }
                    </div>
                    {filteredNotesData.map(note => note.id === id ?
                        <React.Fragment key={note.id}>
                            <div className={s.noteInfo}>
                                <b>{note.title.toString().length > 11 ? note.title.toString().substring(0, 12) + "..." : note.title}</b>
                                <div>{note.description.toString().length > 11 ? note.description.toString().substring(0, 12) + "..." : note.description}</div>
                                <div>{note.startTime + "-" + note.endTime}</div>
                            </div>
                            <CardTag importance={note.importance} id={note.id} />
                        </React.Fragment>
                        : null)}
                </div>
            </div>
        </>
    )
})