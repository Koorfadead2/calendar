import React, { useCallback, useState } from "react";
import s from "./../TodoListItem.module.css"
import { nanoid } from "@reduxjs/toolkit";

export const TodoInputTaskName = React.memo(function({addTask, todoId}){
    const [nameForTask, setNameForTask] = useState("");
    const [error, setError] = useState("");
    const onChangeHandler = useCallback((e) => {
        setNameForTask(e.target.value);
    },[nameForTask])
    const onKeyUpHandler = useCallback((e) => {
        setError("");
        if (e.key === "Enter") {
            if (nameForTask) {
                addTask({ id: nanoid(), name: nameForTask.trim(), isCompleted: false }, todoId );
                setNameForTask("");
            }
            else {
                setError("OnKeyUpError");
            }
        }
    },[addTask, nameForTask])
    const onAddTaskHandler = useCallback(() => {
        if (nameForTask) {
            addTask({ id: nanoid(), name: nameForTask.trim(), isCompleted: false }, todoId );
            setNameForTask("");
        }
        else {
            setError("OnAddTaskError");
        }
    },[addTask, nameForTask])
    return (
        <div>
            <input type='text' placeholder='Напиши что-нибудь'
                value={nameForTask}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
                className={error ? s.error : ""} />

            <button type='button' onClick={onAddTaskHandler}>➕</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
})