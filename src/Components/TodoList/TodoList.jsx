import { useDispatch, useSelector } from 'react-redux'
import s from './TodoList.module.css'
import TodoListItem from './TodoListItem/TodoListItem'
import { addTaskAction, addTodoAction, onCompletedAction, removeTaskAction, removeTodoAction, selectAllTodos, setFilterAciton, onTaskNameChangeAction, onTodoNameChangeAction } from '../../Redux/Slicers/todoSlice'

const TodoList = ({ id }) => {
  const dispatch = useDispatch()
  const onTaskDelete = (taskId) => { dispatch(removeTaskAction({ taskId })) }
  const onTodoDelete = (todoId) => { dispatch(removeTodoAction({ todoId })) }
  const addTodo = (noteId) => { dispatch(addTodoAction({ noteId })) }
  const addTask = (task, todoId) => { dispatch(addTaskAction({ task, todoId })) }
  const onCompleted = (taskId) => { dispatch(onCompletedAction({ taskId })) }
  const onTaskNameChange = (taskId, name) => { dispatch(onTaskNameChangeAction({ taskId, name })) }
  const onTodoNameChange = (todoId, title) => { dispatch(onTodoNameChangeAction({ todoId, title })) }
  const setFilterTasks = (filterValue, todoId) => { dispatch(setFilterAciton({ filterValue, todoId })) }
  const todos = useSelector(selectAllTodos);
  return (
    <>
      <div className={s.todoAddButton}><button type='button' onClick={() => addTodo(id)}>Добавить Todo</button></div>
      <div className={s.todoWrapper}>
        {todos.map((todo) => {
          let filteredTasks = todo.tasks;
          if (todo.filter === "isCompleted")
            filteredTasks = todo.tasks.filter(task => task.isCompleted === true);
          if (todo.filter === "inProgress")
            filteredTasks = todo.tasks.filter(task => task.isCompleted === false);
          return <TodoListItem key={todo.id}
            todo={todo} id={id} filteredTasks={filteredTasks}
            onTaskDelete={onTaskDelete} onTodoDelete={onTodoDelete}
            addTask={addTask} onCompleted={onCompleted} setFilterTasks={setFilterTasks}
            onTaskNameChange={onTaskNameChange} onTodoNameChange={onTodoNameChange} />
        })
        }
      </div>
    </>
  )
}

export default TodoList