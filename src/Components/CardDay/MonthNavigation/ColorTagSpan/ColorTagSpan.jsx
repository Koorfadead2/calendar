import React, { useCallback, useState } from "react";
import s from "./ColorTagSpan.module.css"
import { useDispatch } from "react-redux";
import { filterNotesByTagColorAction } from "../../../../Redux/Slicers/notesSlice";

export const ColorTagSpan = React.memo(function({ color }) {
    const [isActive, setActive] = useState(true);
    const dispatch = useDispatch();
    const filterNotes = useCallback((importance) => dispatch(filterNotesByTagColorAction(importance)),[dispatch]);
    const toggleActive = () => {
        switch(color){
            case "Red":{filterNotes({importance:'0'}); break}
            case "Green":{filterNotes({importance:'1'}); break}
            case "Orange":{filterNotes({importance:'2'}); break}
        }
        setActive(prevActive => !prevActive);
    }
    return (
        <span onClick={toggleActive} className={isActive ? s[`isActive${color}`] : s.isInActive}></span>
    )
})