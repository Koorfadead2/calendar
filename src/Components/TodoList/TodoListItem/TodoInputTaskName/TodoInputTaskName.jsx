import s from "./../TodoListItem.module.css"

const TodoInputTaskName = ({nameForTask, onChangeHandler, onKeyUpHandler, onAddTaskHandler, error}) => {
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
}

export default TodoInputTaskName