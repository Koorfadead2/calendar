import NoteInfo from "./NoteInfo";
import s from "./Notes.module.css";
import { NavLink, useNavigate } from "react-router-dom";

function getLastItem(path){
    return path.substring(path.lastIndexOf('/') + 1);
}
const Notes = ({noteData, setNoteData}) => {
    const navigate = useNavigate();
    const id = getLastItem(window.location.href);
    const removeNote = (noteId) => {
        const path = "/";
        setNoteData(noteData.filter(note => note.id !== noteId));
        navigate(path);
    }
    return (
        <div className={s.notesWrapper}>
            <span className={s.backButton}><NavLink to="/"><button type="button">Обратно на календарь</button></NavLink></span>
            <span><button onClick={()=>removeNote(id)} type="button">Удалить заметку</button></span>
            <NoteInfo noteData={noteData} id={id}/>
        </div>
    )
}

export default Notes;