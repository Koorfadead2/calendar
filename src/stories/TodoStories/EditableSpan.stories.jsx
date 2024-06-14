import { EditableSpan } from "../../Components/TodoList/EditableSpan/EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan,
}

export const EditableSpanExample = () => {
    return (
        <>
            <div><b>Double click to interact</b></div>
            <hr />
            <EditableSpan onNameChange={(title) => { alert(title) }} name={"name"} />
        </>
    )
}