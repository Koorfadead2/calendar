import { useSelector } from "react-redux";
import s from "./Notes.module.css";
import { selectAllNotes } from "../../Redux/Slicers/notesSlice";

const importanceName = {"0":"Важный","1":"Обычный","2":"Низкий"}

const NoteInfo = ({ id }) => {
    const notesData = useSelector(selectAllNotes);
    return (
        <>
            <div className={s.noteInfo}>
                {notesData.map(note => note && note.id === id &&
                    <div key={note.id}>
                        <b>{note.title}</b>
                        <div>{note.description}</div>
                        <div>{note.startTime + "-" + note.endTime}</div>
                        <div>Приоритет задачи: {importanceName[note.importance]}</div>
                    </div>
                )}
            </div>

        </>

    )
}

export default NoteInfo;