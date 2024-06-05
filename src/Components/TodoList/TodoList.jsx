import { useSelector } from 'react-redux'
import s from './TodoList.module.css'
import TodoListItem from './TodoListItem/TodoListItem'
import { selectAllTodos } from '../../Redux/Slicers/todoSlice'

const TodoList = ({id}) => {
  const todos = useSelector(selectAllTodos);
  console.log(todos);
  return (
    <div className={s.todoWrapper}>
      <div><button>Добавить Todo</button></div>
      <TodoListItem todos={todos} id={id}/>
    </div>
  )
}

export default TodoList