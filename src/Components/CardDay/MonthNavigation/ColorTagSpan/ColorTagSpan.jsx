import React, { useCallback, useState } from "react";
import s from "./ColorTagSpan.module.css"

export const ColorTagSpan = React.memo(function ({ color, setFilterNotes }) {
    const [isActive, setActive] = useState(true);
    const toggleActive = useCallback(() => {
        switch (color) {
            case "Red": { setFilterNotes({ importanceToRemove: '0' }); break }
            case "Green": { setFilterNotes({ importanceToRemove: '1' }); break }
            case "Orange": { setFilterNotes({ importanceToRemove: '2' }); break }
        }
        setActive(prevActive => !prevActive);
    },[setFilterNotes])
    return (
        <div className={s.filterByColorTag}>
            <span onClick={toggleActive} className={isActive ? s[`isActive${color}`] : s.isInActive}></span>
        </div>
    )
})