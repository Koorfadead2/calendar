import { useForm } from "react-hook-form";
import s from "./NoteModal.module.css"
import { useEffect, useState } from "react";

const NoteModal = ({ addNote, changeNote, toggleModal, notesData, id, dialog }) => {
    const { register, handleSubmit, reset, formState:{errors} } = useForm({
        mode: "onSubmit",
    });
    const [noteData, setNoteData] = useState();
    useEffect(()=>{
        setNoteData(notesData.find(note => note.id === id));
    },[toggleModal])

    const onSubmit = (data) => {
        const note = { ...data, id };
        if(noteData?.id !== id)
            addNote(note);
        else
            changeNote(note);
        closeAddNoteModal();
    }
    const closeAddNoteModal = () => {
        toggleModal();
        reset();
    }
    const onSelect = (e) =>{
        e.preventDefault();
        setNoteData({...noteData, importance:e.target.value});
    }
    const title="Важная - обозначена красным (Когда хотите не забыть о своей задаче и получать оповещения) \nОбычная - обозначена зелёным (Стандартная задача) \nНизкая - обозначена оранжевым"
    const [startTime,setStartTime] = useState("09:00");
    const [endTime,setEndTime] = useState("10:00");
    return (
        <>
            <dialog ref={dialog} className={s.favDialog} >
                <div><button onClick={ closeAddNoteModal } className={s.backButton}>Назад</button></div>
                <hr />
                <div className={s.favDialogClass}>
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                        <div><input {...register("title",{required:"Поле обязательно"})} type="text" placeholder={noteData?.title || "Заголовок*"} /></div>
                        <div>{errors?.title && <p>{errors?.title?.message}</p>}</div>

                        <div><textarea {...register("description",{required:"Поле обязательно"})} placeholder={noteData?.description || "Описание заметки*"} /></div>
                        <div>{errors?.description && <p>{errors?.description?.message}</p>}</div>

                        <div><b>Начало</b></div>
                        <div><input onInput={(e)=>setStartTime(e.target.value)} value={startTime} {...register("startTime", {validate: (value) => value && !(value > endTime) || "Начальное время не должно превышать конечное"})} type="time" aria-label="startTimeLabel"/></div>
                        
                        <div><b>Конец</b></div>
                        <div><input onInput={(e)=>setEndTime(e.target.value)} value={endTime} {...register("endTime", {validate: (value) => value && value > startTime || "Начальное время не должно превышать конечное"})} type="time" aria-label="endTimeLabel"/></div>
                        <div>{errors?.endTime && <p>{errors?.endTime?.message}</p> || errors?.startTime && <p>{errors?.startTime?.message}</p>}</div>
                        
                        <div>
                            <div>
                                <b>Важность заметки</b>
                            </div>
                            <select {...register("importance")} defaultValue={'1'} value={noteData?.importance} onChange={(e)=>onSelect(e)} aria-label="ImportanceSelector">
                                <option value='0'>Важная</option>
                                <option value='1'>Обычная</option>
                                <option value='2'>Низкая</option>
                            </select>
                            <span className={s.tagHelp} title={title}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M140 180a12 12 0 1 1-12-12a12 12 0 0 1 12 12M128 72c-22.06 0-40 16.15-40 36v4a8 8 0 0 0 16 0v-4c0-11 10.77-20 24-20s24 9 24 20s-10.77 20-24 20a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-.72c18.24-3.35 32-17.9 32-35.28c0-19.85-17.94-36-40-36m104 56A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></svg></span>
                        </div>                    
                        
                        <div>{noteData?.id !== id ? <button type="submit" className={s.addButton}>Добавить</button> : <button type="submit" className={s.changeButton}>Изменить</button>}</div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
export default NoteModal;