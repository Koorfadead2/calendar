import { NavLink } from "react-router-dom";
import s from "./CardDay.module.css"
import React from "react";
import NoteModal from "../Notes/Modal/NoteModal";
import { useState } from "react";

const CardDayItem = ({ day, currentMonth, currentYear }) => {
    const id = day.toString() + currentMonth.toString() + currentYear.toString();
    const [noteData, setNoteData] = useState({
        id: id,
        title: null,
        description: null,
        startTime: null,
        endTime: null
    },[]);
    // const openNoteModal = () => {
    //     const modal = document.querySelector("#favDialog");
    //     modal.showModal();
    // }

    const addNote = () =>{
        
    }

    const isToday = () => {
        return day === new Date().getDate()
            && currentMonth === new Date().getMonth()
            && currentYear === new Date().getFullYear();
    }
    console.log(noteData);
    return (
        <>
            <div className={`${s.card} ${isToday() ? `${s.cardActive}` : ""}`}>
                <div className={s.cardItem}>
                    <div>
                        { day }
                    </div>
                    {noteData.title ? <div>
                        <b>{noteData.title}</b>
                        <div>{noteData.description}</div>
                        <div>{noteData.startTime + "-" + noteData.endTime}</div>
                    </div> : <></>}
                </div>
                {noteData.id ? <NavLink to={'/note/' + id}>
                    <div className={s.cardNameTag}>
                        Tag
                    </div>
                </NavLink> : <></>}
            </div>
        </>
    )
}

export default CardDayItem;