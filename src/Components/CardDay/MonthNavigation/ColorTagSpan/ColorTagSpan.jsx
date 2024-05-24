import { useState } from "react";
import s from "./../MonthNavigation.module.css"

function ColorTagSpan({color}){
    const [isActive, setActive] = useState(true);
    const toggleActive = () => {
        setActive(prevActive => !prevActive);
    }
    return <span onClick={toggleActive} className={isActive ? s[`isActive${color}`] : s.isInActive}></span>
}

export default ColorTagSpan;