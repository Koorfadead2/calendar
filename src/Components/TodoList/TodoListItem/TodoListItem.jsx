import React, { useCallback, useState } from 'react';
import s from './TodoListItem.module.css'
import {TodoTaskItem} from './TodoTaskItem/TodoTaskItem';
import {TodoFilterButtons} from './TodoFilterButtons/TodoFilterButtons';
import {TodoTitle} from './TodoTitle/TodoTitle';
import {TodoInputTaskName} from './TodoInputTaskName/TodoInputTaskName';

export const TodoListItem = React.memo(function({ todo, id, onTaskDelete, onTodoDelete, addTask, 
    onCompleted, setFilterTasks, tasksForTodo, onTaskNameChange, onTodoNameChange,
    onDrop }) {
    const [isDeletedTodo, setIsDeletedTodo] = useState(false);
    const titleWhenNoTodo = "Здесь Ваши Todo";
    const titleWhenNoFilteredTodo = "Таких заданий ещё нет";

    const onNameChange = useCallback((title) => { 
        onTodoNameChange(todo.id, title)
    },[onTodoNameChange, todo.id])

    const onTodoDeleteHandler = useCallback(() => {
        setIsDeletedTodo(true); 
        //Должна проиграться анимация 
        setTimeout(()=> onTodoDelete(todo.id), 300) 
    },[todo.id])

    const onAllClickHandler = useCallback(() => { setFilterTasks("all", todo.id) },[setFilterTasks, todo.id])
    const onInProgressClickHandler = useCallback(() => { setFilterTasks("inProgress", todo.id) },[setFilterTasks, todo.id])
    const onIsCompletedClickHandler = useCallback( () => { setFilterTasks("isCompleted", todo.id) },[setFilterTasks, todo.id])

    let filteredTasks = tasksForTodo;
    if (todo.filter === "isCompleted")
        filteredTasks = tasksForTodo.filter(task => task.isCompleted === true);
    if (todo.filter === "inProgress")
        filteredTasks = tasksForTodo.filter(task => task.isCompleted === false);

    return (
        <>
            {todo.noteId === id &&
                <div className={`${s.todoItem} ${isDeletedTodo ? s.todoItemDelete : ""}`}>
                    <TodoTitle todoTitle={todo.title} onNameChange={onNameChange} onTodoDeleteHandler={onTodoDeleteHandler} isDeletedTodo={isDeletedTodo}/>
                    <TodoInputTaskName addTask={addTask} todoId={todo.id}/>
                    <ul>
                        {tasksForTodo.length <= 0 ? <li>{titleWhenNoTodo}</li> : filteredTasks.length <= 0 ? <li>{titleWhenNoFilteredTodo}</li> : 
                            filteredTasks.map((task) => {
                            return <TodoTaskItem key={task.id} todoId={todo.id} taskId={task.id}
                             taskName={task.name} taskIsCompleted={task.isCompleted} onDrop={onDrop}
                             onTaskDelete={onTaskDelete} onCompleted={onCompleted} 
                            onTaskNameChange={onTaskNameChange}/>
                        })}
                    </ul>
                        <TodoFilterButtons todoFilter={todo.filter} 
                        onAllClickHandler={onAllClickHandler}
                        onInProgressClickHandler={onInProgressClickHandler}
                        onIsCompletedClickHandler={onIsCompletedClickHandler}/>
                </div>}
        </>
    )
})