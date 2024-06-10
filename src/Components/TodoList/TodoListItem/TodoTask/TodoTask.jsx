import s from "./../TodoListItem.module.css"
import EditableSpan from '../../EditableSpan/EditableSpan'

const onDragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("taskItem"))
        e.target.style.boxShadow = "0 4px 2px gray"
}
const onDragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none"
}
const onDragStartHandler = (e) => {

}
const onDragEndHandler = (e) => {
    e.target.style.boxShadow = "none"
}
const onDropHandler = (e) => {
    e.preventDefault();
    e.target.style.boxShadow = "none"
}

const TodoTask = ({ taskName, taskIsCompleted, onTaskDeleteHandler, onCompletedHandler, onNameChange }) => {
    return (
        <li className={`taskItem ${taskIsCompleted ? s.completedTask : ""}`}
            draggable={true}
            onDragOver={onDragOverHandler}
            onDragLeave={onDragLeaveHandler}
            onDragStart={onDragStartHandler}
            onDragEnd={onDragEndHandler}
            onDrop={onDropHandler}>
            <input type='checkbox' checked={taskIsCompleted} onChange={onCompletedHandler} />
            <EditableSpan name={taskName} onNameChange={onNameChange} />
            <button type='button' onClick={onTaskDeleteHandler} className={s.deleteButton}>🚽</button>
        </li>
    )
}

export default TodoTask