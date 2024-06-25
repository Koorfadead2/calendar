import { useDispatch } from "react-redux";
import { NoteInfo } from "./NoteInfo";
import s from "./Notes.module.css";
import { NavLink } from "react-router-dom";
import { removeNoteAction } from "../../Redux/Slicers/notesSlice";
import { TodoList } from "../TodoList/TodoList";
import { useSelector } from "react-redux";
import { selectAllNotes } from "../../Redux/Slicers/notesSlice";
import React from "react";

function getLastItem(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

export const Notes = React.memo(function () {
    const dispatch = useDispatch();
    const notesData = useSelector(selectAllNotes);
    const id = getLastItem(window.location.href);
    return (
        <div className={s.notesWrapper}>
            <span className={s.backButton}><NavLink to="/"><button type="button">Обратно на календарь</button></NavLink></span>
            <span><button onClick={() => dispatch(removeNoteAction({ id }))} type="button">Удалить заметку</button></span>
            <span className={s.noteInfoWrapper}>
                {notesData.map((note) => note && note.id === id &&
                    <NoteInfo key={note.id} noteId = {note.id} noteTitle={note.title} noteDescription = {note.description} 
                    noteStartTime = {note.startTime} noteEndTime = {note.endTime} noteImportance = {note.importance}/>
                )}
            </span>
            <TodoList id={id} />
        </div>
    )
})