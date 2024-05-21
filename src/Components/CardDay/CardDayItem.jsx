import { NavLink } from "react-router-dom";
import s from "./CardDay.module.css"
import React from "react";
import NoteModal from "../Notes/Modal/NoteModal";
import { useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const CardDayItem = ({ day, currentMonth, currentYear }) => {
    const id = day.toString() + currentMonth.toString() + currentYear.toString();
    const [noteData, setNoteData] = useState([{
        id: id,
        title: null,
        description: null,
        startTime: null,
        endTime: null
    }],[]);
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = (() => {
        setIsOpen(!isOpen);
    });

    const addNote = (note) =>{
        console.log(note);
        setNoteData(note);
    }

    const isToday = () => {
        return day === new Date().getDate()
            && currentMonth === new Date().getMonth()
            && currentYear === new Date().getFullYear();
    }
    console.log(noteData);
    return (
        <>
            <div onClick={toggleModal} className={`${s.card} ${isToday() ? `${s.cardActive}` : ""}`}>
                <div className={s.cardItem}>
                    <div>
                        {day}
                    </div>
                    {noteData && noteData.startTime !== undefined ? <div className={s.noteInfo}>
                        <b>{noteData.title}</b>
                        <div>{noteData.description}</div>
                        <div>{noteData.startTime + "-" + noteData.endTime}</div>
                    </div> : <></>}
                </div>
                {noteData.title ? 
                <NavLink to={'/note/' + id}>
                    <div className={s.cardNameTag}>
                        Tag
                    </div>
                </NavLink> : <></>}
            </div>
            <NoteModal id={id} setNoteData={addNote} isOpen={isOpen} toggleModal={toggleModal}/>
            { noteData.id ? <DropdownMenu /> : <></>}
        </>
    )
}

export default CardDayItem;