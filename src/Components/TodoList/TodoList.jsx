import { useDispatch, useSelector } from 'react-redux'
import s from './TodoList.module.css'
import TodoListItem from './TodoListItem/TodoListItem'
import { addTaskAction, addTodoAction, onCompletedAction, removeTaskAction, removeTodoAction, selectAllTodos } from '../../Redux/Slicers/todoSlice'

const TodoList = ({id}) => {
  const dispatch = useDispatch()
  const onTaskDelete = (taskId)=>{dispatch(removeTaskAction({taskId}))}
  const onTodoDelete = (todoId)=>{dispatch(removeTodoAction({todoId}))}
  const addTodo = (noteId)=>{dispatch(addTodoAction({noteId}))}
  const addTask = (task, todoId)=>{dispatch(addTaskAction({task, todoId}))}
  const onCompleted = (taskId)=>{dispatch(onCompletedAction({taskId}))}
  const todos = useSelector(selectAllTodos);
  return (
    <div className={s.todoWrapper}>
      <div><button type='button' onClick={()=>addTodo(id)}>Добавить Todo</button></div>
      <TodoListItem 
      todos={todos} id={id} 
      onTaskDelete={onTaskDelete} onTodoDelete={onTodoDelete} 
      addTask={addTask} onCompleted={onCompleted}/>
    </div>
  )
}

export default TodoList