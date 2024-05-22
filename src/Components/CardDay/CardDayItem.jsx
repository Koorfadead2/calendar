import s from "./CardDay.module.css"
import React, { useEffect } from "react";
import NoteModal from "../Notes/Modal/NoteModal";
import { useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import CardTag from "./CardTag/CardTag";
const CardDayItem = ({ day, currentMonth, currentYear, noteData, setNoteData, id }) => {
    //const id = day.toString() + (currentMonth+1).toString() + currentYear.toString();
    // const [noteData, setNoteData] = useState([{
    //     id: null,
    //     title: null,
    //     description: null,
    //     startTime: null,
    //     endTime: null,
    //     importance: null
    // }],[]);
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = (() => {
        setIsOpen(!isOpen);
    });
    const addNote = (note) =>{
        setNoteData([...noteData, note]);
    }

    const isToday = () => {
        return day === new Date().getDate()
            && currentMonth === new Date().getMonth()
            && currentYear === new Date().getFullYear();
    }
    //console.log(id);
    console.log([...noteData]);
    return (
        <>
            <div onClick={()=>toggleModal(id)} className={`${s.card} ${isToday() ? `${s.cardActive}` : ""}`}>
                <div className={s.cardItem}>
                    <div>
                        {day}
                    </div>
                    {noteData.map(note=>note.startTime !== null && note.id === id ? <div className={s.noteInfo}>
                        <b>{note.title}</b>
                        <div>{note.description}</div>
                        <div>{note.startTime + "-" + note.endTime}</div>
                        <div>
                            <DropdownMenu />
                            <CardTag importance={note.importance} id={id}/>
                        </div>
                    </div> 
                    : <></>)}
                    {/* {noteData.map(note=>
                    <div>
                        <DropdownMenu />
                        <CardTag importance={note.importance} id={id}/>
                    </div>)} */}
                </div>
            </div>
            <NoteModal id={id} setNoteData={addNote} isOpen={isOpen} toggleModal={toggleModal}/>
        </>
    )
}

export default CardDayItem;