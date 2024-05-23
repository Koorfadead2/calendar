import s from "./CardDay.module.css"
import React from "react";
import CardTag from "./CardTag/CardTag";
const CardDayItem = ({ day, currentMonth, currentYear, noteData, toggleModal, id }) => {

    const isToday = () => {
        return day === new Date().getDate()
            && currentMonth === new Date().getMonth()
            && currentYear === new Date().getFullYear();
    }
    console.log(id);
    //console.log([...noteData]);
    return (
        <>
            <div onClick={()=>toggleModal(id)} className={`${s.card} ${isToday() ? `${s.cardActive}` : ""}`}>
                <div className={s.cardItem}>
                    <div>
                        { day }
                    </div>
                    {noteData.map(note=>note.id === id ? <div key={id} className={s.noteInfo}>
                        <b>{note.title}</b>
                        <div>{note.description.toString().length > 11 ? note.description.toString().substring(0,12) + "..." : note.description }</div>
                        <div>{note.startTime + "-" + note.endTime}</div>
                        <div><CardTag key={id} importance={note.importance} id={id}/></div>
                    </div> 
                    : <></>)}
                </div>
            </div>
        </>
    )
}

export default CardDayItem;