import s from './TodoListItem.module.css'

const TodoListItem = ({todos, id}) => {
    return (
        <>
            {todos.map((todo) => todo.noteId === id &&
            <div className={s.todoItem} key={todo.id}>
                <h3>{todo.title}</h3>
                <div>
                    <input type='text' placeholder='Напиши что-нибудь'/>
                    <button type='button'>+</button>
                </div>
                <ul>
                    {todo.tasks.map((task)=><li>
                        <input type='checkbox' checked={task.isCompleted}/>
                        <span>{task.name}</span>
                        <button type='button'>X</button>
                        </li>)}
                </ul>
                <div>
                    <button type='button'>All</button>    
                    <button type='button'>Active</button>    
                    <button type='button'>Completed</button>    
                </div> 
            </div>)}
        </>
    )
}

export default TodoListItem