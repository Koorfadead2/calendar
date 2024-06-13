import React from 'react'
import s from './../TodoListItem.module.css'

export const TodoFilterButtons = React.memo(function({todoFilter, onAllClickHandler, onInProgressClickHandler, onIsCompletedClickHandler}){
    return (
        <div className={s.filterButtonGroup}>
            <button type='button' className={todoFilter === "all" ? s.activeFilter : ""} onClick={onAllClickHandler}>Все</button>
            <button type='button' className={todoFilter === "inProgress" ? s.activeFilter : ""} onClick={onInProgressClickHandler}>В процессе</button>
            <button type='button' className={todoFilter === "isCompleted" ? s.activeFilter : ""} onClick={onIsCompletedClickHandler}>Выполненные</button>
        </div>
    )
})