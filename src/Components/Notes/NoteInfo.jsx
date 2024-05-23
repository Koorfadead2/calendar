import s from "./Notes.module.css";

const NoteInfo = ({ noteData, id }) => {
    console.log(noteData);
    console.log(id);
    return (
        <>
            <div className={s.noteInfo}>
                {noteData.map(note => note && note.id === id &&
                    <div key={note.id}>
                        <b>{note.title}</b>
                        <div>{note.description}</div>
                        <div>{note.startTime + "-" + note.endTime}</div>
                        <div>{note.importance}</div>
                    </div>
                )}
            </div>
        </>

    )
}

export default NoteInfo;