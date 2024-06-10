import { useState } from 'react';
import s from './TodoListItem.module.css'
import { nanoid } from '@reduxjs/toolkit';
import TodoTask from './TodoTask/TodoTask';
import TodoFilterButtons from './TodoFilterButtons/TodoFilterButtons';
import TodoTitle from './TodoTitle/TodoTitle';
import TodoInputTaskName from './TodoInputTaskName/TodoInputTaskName';

const TodoListItem = ({ todo, id, onTaskDelete, onTodoDelete, addTask, onCompleted, setFilterTasks, filteredTasks, onTaskNameChange, onTodoNameChange }) => {
    const [nameForTask, setNameForTask] = useState();
    const [isDeletedTodo, setIsDeletedTodo] = useState(false);
    const [error, setError] = useState("");
    const titleWhenNoTodo = "Здесь Ваши Todo";
    const titleWhenNoFilteredTodo = "Таких заданий ещё нет";
    console.log(todo);
    const onChangeHandler = (e) => {
        setNameForTask(e.target.value)
    }
    const onKeyUpHandler = (e) => {
        setError("");
        if (e.key === "Enter") {
            if (nameForTask) {
                addTask({ id: nanoid(), name: nameForTask.trim(), isCompleted: false }, todo.id );
                setNameForTask("");
            }
            else {
                setError("OnKeyUpError");
            }
        }
    }
    const onAddTaskHandler = () => {
        if (nameForTask) {
            addTask({ id: nanoid(), name: nameForTask.trim(), isCompleted: false }, todo.id );
            setNameForTask("");
        }
        else {
            setError("OnAddTaskError");
        }
    }
    const onNameChange = (title) => { onTodoNameChange(todo.id, title) }

    const onTodoDeleteHandler = () => {setIsDeletedTodo(true); setTimeout(()=> onTodoDelete(todo.id), 300) }

    const onAllClickHandler = () => { setFilterTasks("all", todo.id) }
    const onInProgressClickHandler = () => { setFilterTasks("inProgress", todo.id) }
    const onIsCompletedClickHandler = () => { setFilterTasks("isCompleted", todo.id) }
    return (
        <>
            {todo.noteId === id &&
                <div className={`${s.todoItem} ${isDeletedTodo ? s.todoItemDelete : ""}`}>
                    <TodoTitle todoTitle={todo.title} onNameChange={onNameChange} onTodoDeleteHandler={onTodoDeleteHandler}/>
                    <TodoInputTaskName nameForTask={nameForTask} error={error} onChangeHandler={onChangeHandler} onKeyUpHandler={onKeyUpHandler} onAddTaskHandler={onAddTaskHandler}/>
                    <ul>
                        {todo.tasks.length <= 0 ? <li>{titleWhenNoTodo}</li> : filteredTasks.length <= 0 ? <li>{titleWhenNoFilteredTodo}</li> : 
                            filteredTasks.map((task) => {
                            const onTaskDeleteHandler = () => onTaskDelete(task.id);
                            const onCompletedHandler = () => onCompleted(task.id);
                            const onNameChange = (name) => { onTaskNameChange(task.id, name) }
                            return <TodoTask key={task.id} taskName={task.name} taskIsCompleted={task.isCompleted} 
                            onTaskDeleteHandler={onTaskDeleteHandler} onCompletedHandler={onCompletedHandler} 
                            onNameChange={onNameChange}/>
                        })}
                    </ul>
                        <TodoFilterButtons todoFilter={todo.filter} 
                        onAllClickHandler={onAllClickHandler}
                        onInProgressClickHandler={onInProgressClickHandler}
                        onIsCompletedClickHandler={onIsCompletedClickHandler}/>
                </div>}
        </>
    )
}

export default TodoListItem