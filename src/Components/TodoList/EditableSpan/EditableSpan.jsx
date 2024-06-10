import { useState } from 'react'

const EditableSpan = ({ name, onNameChange }) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("");
    const activateEditMode = () =>{
        setTitle(name);
        setEditMode(prevEdit => !prevEdit);
    }
    const activateViewMode = (e) => {
        setEditMode(false);
        onNameChange(title)
    };
    const onChangeTitleHandler = (e) => setTitle(e.target.value); 
    const onKeyUpHandler = (e) => {
        setTitle(e.target.value); 
        if(e.key === "Enter"){
            setEditMode(false); 
            onNameChange(title);
        }
    }
    return (
        editMode 
         ? <input value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler} onKeyUp={onKeyUpHandler}/>
         : <span onDoubleClick={activateEditMode}>{name}</span>
         
    )
}

export default EditableSpan