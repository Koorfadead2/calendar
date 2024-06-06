import { useState } from 'react';
import s from './TodoListItem.module.css'
import { nanoid } from '@reduxjs/toolkit';

const TodoListItem = ({ todos, id, onTaskDelete, onTodoDelete, addTask, onCompleted }) => {
    const [filter, setFilter] = useState("all");
    const [nameForTask, setNameForTask] = useState({});
    const [toggleEditTodoTitle, setToggleEditTodoTitle] = useState(false);
    const [error, setError] = useState("");
    let filteredTasks = todos.map(todo => todo.tasks);
    if (filter === "isCompleted") {
        filteredTasks = todos.map(todo => todo.tasks.filter(task => { task.isCompleted === true; return task }));
    }
    if (filter === "inProgress") {
        filteredTasks = todos.map(todo => todo.tasks.filter(task => { task.isCompleted === false; return task }));
    }
    console.log(todos);
    const onChangeHandler = (e, todoId) => {
        const { value } = e.target;
        setNameForTask(prevState => ({
            ...prevState,
            [todoId]: value
        }));
    }
    const onKeyUpHandler = (e, todoId) => {
        setError("");
        if (e.key === "Enter") {
            if (nameForTask[todoId]) {
                addTask({ id: nanoid(), name: nameForTask[todoId].trim(), isCompleted: false }, { todoId });
                setNameForTask(prevState => ({ ...prevState, [todoId]: "" }));
            }
            else {
                setError("OnKeyUpError");
            }
        }
    }
    const onAddTaskHandler = (todoId) => {
        if (nameForTask[todoId]) {
            addTask({ id: nanoid(), name: nameForTask[todoId].trim(), isCompleted: false }, { todoId });
            setNameForTask(prevState => ({ ...prevState, [todoId]: "" }));
        }
        else {
            setError("OnAddTaskError");
        }
    }

    const onDoubleClickHandler = () => { setToggleEditTodoTitle(!toggleEditTodoTitle) }

    const onAllClickHandler = () => { setFilter("all") }
    const onInProgressClickHandler = () => { setFilter("inProgress") }
    const onIsCompletedClickHandler = () => { setFilter("isCompleted") }
    return (
        <>
            {todos.map((todo) => todo.noteId === id &&
                <div className={s.todoItem} key={todo.id}>
                    {!toggleEditTodoTitle ? <><h3 onDoubleClick={onDoubleClickHandler}>{todo.title} <button type="button" onClick={() => onTodoDelete(todo.id)} className={s.deleteButton}>❌</button></h3>
                    <div>
                        <input type='text' placeholder='Напиши что-нибудь'
                            value={nameForTask[todo.id] || ""}
                            onChange={(e) => onChangeHandler(e, todo.id)}
                            onKeyUp={(e) => onKeyUpHandler(e, todo.id)}
                            className={error ? s.error : ""} />

                        <button type='button' onClick={() => onAddTaskHandler(todo.id)}>➕</button>
                        {error && <div className={s.errorMessage}>{error}</div>}
                    </div></>: <><input type='text' value={todo.title} /><button type='button'>✔</button><button type='button'>❌</button></>}
                    <ul>
                        {todo.tasks.length <= 0 ? <li>Здесь Ваши Todo</li> : todo.tasks.map((task) => {
                            const onTaskDeleteHandler = () => onTaskDelete(task.id);
                            const onCompletedHandler = () => onCompleted(task.id);
                            return <li draggable={true} key={task.id} className={task.isCompleted ? s.completedTask : ""}>
                                <input type='checkbox' checked={task.isCompleted} onChange={onCompletedHandler} />
                                <span>{task.name}</span>
                                <button type='button' onClick={onTaskDeleteHandler} className={s.deleteButton}>🚽</button>
                            </li>
                        })}
                    </ul>
                    <div className={s.filterButtonGroup}>
                        <button type='button' onClick={onAllClickHandler}>All</button>
                        <button type='button' onClick={onInProgressClickHandler}>In progress</button>
                        <button type='button' onClick={onIsCompletedClickHandler}>Completed</button>
                    </div>
                </div>)}
        </>
    )
}

export default TodoListItem