import NoteInfo from "./NoteInfo";
import s from "./Notes.module.css";
import { NavLink, useNavigate } from "react-router-dom";

function getLastItem(path){
    return path.substring(path.lastIndexOf('/') + 1);
}
const Notes = ({noteData}) => {
    const navigate = useNavigate();
    const id = getLastItem(window.location.href);
    function onDelete(){
        const path = "/";
        const index = noteData.map(note => {return note.id}).indexOf(id);
        noteData.splice(index, 1);
        navigate(path);
    }
    return (
        <div className={s.notesWrapper}>
            <span className={s.backButton}><NavLink to="/"><button type="button">Обратно на календарь</button></NavLink></span>
            <span><button onClick={onDelete} type="button">Удалить заметку</button></span>
            <NoteInfo noteData={noteData} id={id}/>
        </div>
    )
}

export default Notes;