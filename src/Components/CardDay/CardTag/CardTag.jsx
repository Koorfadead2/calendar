import { NavLink } from "react-router-dom";
import s from "./../CardDay.module.css";
import "./CardTag.css";
export const CardTag = function({importance, id}){
    let tagImportance = "";
    switch(importance){
        case '0':{
            tagImportance = "important";
            break;
        }
        case '1':{
            tagImportance = "decent";
            break;
        }
        case '2':{
            tagImportance = "low";
            break;
        }
        default:
            tagImportance = "";
    }
    return(
        <> 
            {tagImportance &&
            <NavLink to={'/note/' + id} className={`${s.cardNameTag} ${tagImportance }`}>
                
            </NavLink> }
        </>
    )
}