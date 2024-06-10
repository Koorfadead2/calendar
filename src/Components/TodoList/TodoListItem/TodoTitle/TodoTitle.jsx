import s from "./../TodoListItem.module.css"
import EditableSpan from '../../EditableSpan/EditableSpan'

const TodoTitle = ({todoTitle, onNameChange, onTodoDeleteHandler, isDeletedTodo}) => {
    return (
        <h3>
            <EditableSpan name={todoTitle} onNameChange={onNameChange} />
            <button type="button" onClick={onTodoDeleteHandler} className={s.deleteButton} disabled={isDeletedTodo}>❌</button>
        </h3>
    )
}

export default TodoTitle