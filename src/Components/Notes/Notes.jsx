import { useDispatch } from "react-redux";
import NoteInfo from "./NoteInfo";
import s from "./Notes.module.css";
import { NavLink } from "react-router-dom";
import { removeNoteAction } from "../../Redux/Slicers/notesSlice";

function getLastItem(path){
    return path.substring(path.lastIndexOf('/') + 1);
}

const Notes = () => {
    const dispatch = useDispatch();
    const id = getLastItem(window.location.href);
    return (
        <div className={s.notesWrapper}>
            <span className={s.backButton}><NavLink to="/"><button type="button">Обратно на календарь</button></NavLink></span>
            <span><button onClick={()=>dispatch(removeNoteAction({id}))} type="button">Удалить заметку</button></span>
            <NoteInfo id={id}/>
        </div>
    )
}

export default Notes;