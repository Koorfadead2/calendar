import NoteInfo from "./NoteInfo";
import s from "./Notes.module.css";
import { NavLink } from "react-router-dom";

const Notes = (props) => {
    return (
        <div className={s.notesWrapper}>
            <span className={s.backButton}><NavLink to="/"><button type="button">Обратно на календарь</button></NavLink></span>
            <NoteInfo />
        </div>
    )
}

export default Notes;