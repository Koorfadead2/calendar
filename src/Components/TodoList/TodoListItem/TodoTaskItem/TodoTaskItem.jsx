import s from "./../TodoListItem.module.css"
import {EditableSpan} from '../../EditableSpan/EditableSpan'
import React, { useCallback, useState } from "react"

export const TodoTaskItem = React.memo(function({ taskName, todoId, taskId, taskIsCompleted, onTaskDelete, onCompleted, onTaskNameChange, onDrop }) {
    const [currentTodo, setCurrentTodo] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);

    const onDragOverHandler = (e) => {
        e.preventDefault();
        if (e.target.classList.contains("li"))
            e.target.style.boxShadow = "0 4px 2px gray"
    }
    const onDragLeaveHandler = (e) => {
        e.target.style.boxShadow = "none"
    }
    const onDragStartHandler = (e) => {
        setCurrentTodo(todoId);
        setCurrentTask(taskId);
    }
    const onDragEndHandler = (e) => {
        e.target.style.boxShadow = "none"
    }
    const onDropHandler = (e) => {
        e.preventDefault();
        e.target.style.boxShadow = "none"
        if (currentTodo !== null && currentTask !== null) {
            onDrop(currentTodo, currentTask);
        }
        setCurrentTodo(null);
        setCurrentTask(null);
    }
    
    const onTaskDeleteHandler = useCallback(() => {onTaskDelete(todoId, taskId)},[onTaskDelete, todoId, taskId]);
    const onCompletedHandler = useCallback(() => {onCompleted(todoId, taskId)},[onCompleted, todoId, taskId]);
    const onNameChangeHandler = useCallback((name) => {onTaskNameChange(taskId, name)},[onTaskNameChange, taskId]);

    return (
        <li className={`li ${s.taskItem} ${taskIsCompleted ? s.completedTask : ""}`}
            draggable={true}
            onDragOver={onDragOverHandler}
            onDragLeave={onDragLeaveHandler}
            onDragStart={onDragStartHandler}
            onDragEnd={onDragEndHandler}
            onDrop={onDropHandler}>
            <input type='checkbox' checked={taskIsCompleted} onChange={onCompletedHandler} />
            <EditableSpan name={taskName} onNameChange={onNameChangeHandler} />
            <button type='button' onClick={onTaskDeleteHandler} className={s.deleteButton}>❌</button>
        </li>
    )
})