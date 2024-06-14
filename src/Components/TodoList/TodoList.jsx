import { useDispatch, useSelector } from 'react-redux'
import s from './TodoList.module.css'
import { TodoListItem } from './TodoListItem/TodoListItem'
import { addTaskAction, addTodoAction, onCompletedAction, removeTaskAction, removeTodoAction, selectAllTodos, setFilterAciton, onTaskNameChangeAction, onTodoNameChangeAction, onCloseErrorMessage, selectErrorMessage, onDropRemoveTaskFromTodo } from '../../Redux/Slicers/todoSlice'
import React, { useCallback } from 'react'

export const TodoList = React.memo(function({ id }){
  const dispatch = useDispatch();
  const onTaskDelete = useCallback((todoId, taskId) => { dispatch(removeTaskAction({ todoId, taskId })) },[dispatch]);
  const onTodoDelete = useCallback((todoId) => { dispatch(removeTodoAction({ todoId })) },[dispatch]);
  const addTodo = useCallback((noteId) => { dispatch(addTodoAction({ noteId })) },[dispatch]);
  const addTask = useCallback((task, todoId) => { dispatch(addTaskAction({ task, todoId })) },[dispatch]);
  const onCompleted = useCallback((todoId, taskId) => { dispatch(onCompletedAction({ todoId, taskId }))},[dispatch]);
  const onTaskNameChange = useCallback((taskId, name) => { dispatch(onTaskNameChangeAction({ taskId, name })) },[dispatch]);
  const onTodoNameChange = useCallback((todoId, title) => { dispatch(onTodoNameChangeAction({ todoId, title })) },[dispatch]);
  const setFilterTasks = useCallback( (filterValue, todoId) =>{ dispatch(setFilterAciton({ filterValue, todoId })) },[dispatch]);  
  const onDrop = useCallback((todoId,taskId) => {dispatch(onDropRemoveTaskFromTodo({todoId,taskId}))},[dispatch]);
  const onCloseHandler = useCallback(() => {dispatch(onCloseErrorMessage())},[dispatch]);
  const todos = useSelector(selectAllTodos);
  const errorOnTodoCount = useSelector(selectErrorMessage);
  const error = "Количество ToDo не может превышать 12";
  console.log(todos);
  return (
    <>
      <div className={s.todoAddButton}><button type='button' onClick={() => addTodo(id)}>Добавить Todo</button></div>
      {errorOnTodoCount &&<div className={s.todoCountError}><p>{error}</p><span onClick={onCloseHandler}>✖</span></div>}
      <div className={s.todoWrapper}>
        {todos.map((todo) => {
            return <TodoListItem key={todo.id}
            todo={todo} id={id} tasksForTodo={todo.tasks}
            onTaskDelete={onTaskDelete} onTodoDelete={onTodoDelete}
            addTask={addTask} onCompleted={onCompleted} setFilterTasks={setFilterTasks}
            onTaskNameChange={onTaskNameChange} onTodoNameChange={onTodoNameChange} onDrop={onDrop} />
        })
        }
      </div>
    </>
  )
})