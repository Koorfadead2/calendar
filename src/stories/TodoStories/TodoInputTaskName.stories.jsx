import { TodoInputTaskName } from "../../Components/TodoList/TodoListItem/TodoInputTaskName/TodoInputTaskName"
import { action } from "@storybook/addon-actions"
import '../TodoListItem.module.css'

export default {
    title: "TodoInputTaskName Component",
    component: TodoInputTaskName,
}

const changeValue = action("Value changed");

export const TodoInputTaskNameExample = () => {
    return (
        <>
            <div><b></b></div>
            <hr />
            <TodoInputTaskName addTask={changeValue} todoId={"1"} />
        </>
    )
}