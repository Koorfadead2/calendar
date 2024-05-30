import { useSelector } from "react-redux";
import s from "./Notes.module.css";

const NoteInfo = ({ id }) => {
    const notesData = useSelector(state => state.notes.notesData);
    return (
        <>
            <div className={s.noteInfo}>
                {notesData.map(note => note && note.id === id &&
                    <div key={note.id}>
                        <b>{note.title}</b>
                        <div>{note.description}</div>
                        <div>{note.startTime + "-" + note.endTime}</div>
                        <div>{note.importance}</div>
                    </div>
                )}
            </div>
            <div className={s.todoWrapper}>
                TODO
            </div>
        </>

    )
}

export default NoteInfo;