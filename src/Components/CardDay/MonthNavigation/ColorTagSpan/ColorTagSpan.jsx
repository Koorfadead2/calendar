import { useState } from "react";
import s from "./ColorTagSpan.module.css"
import { useDispatch, useSelector } from "react-redux";
import { filterNotesByTagColor } from "../../../../Redux/Slicers/notesSlice";

function ColorTagSpan({ color }) {
    const [isActive, setActive] = useState(true);
    const dispatch = useDispatch();
    const filterNotes = (importance) => dispatch(filterNotesByTagColor(importance));
    const toggleActive = () => {
        switch(color){
            case "Red":{filterNotes({importance:'0'}); break}
            case "Green":{filterNotes({importance:'1'}); break}
            case "Blue":{filterNotes({importance:'2'}); break}
        }
        setActive(prevActive => !prevActive);
    }
    return (
        <span onClick={toggleActive} className={isActive ? s[`isActive${color}`] : s.isInActive}></span>
    )
}

export default ColorTagSpan;