import s from "./Notes.module.css";
import React from "react";

const importanceName = {"0":"Важный","1":"Обычный","2":"Низкий"}

export const NoteInfo = React.memo(function({ noteId, noteTitle, noteDescription, noteStartTime, noteEndTime, noteImportance }) {
    return (
        <>
            <div className={s.noteInfo}>
                <div key={noteId}>
                    <b>{noteTitle}</b>
                    <div>{noteDescription}</div>
                    <div>{noteStartTime + "-" + noteEndTime}</div>
                    <div>Приоритет задачи: {importanceName[noteImportance]}</div>
                </div>
            </div>

        </>

    )
})