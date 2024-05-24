import { useForm } from "react-hook-form";
import s from "./NoteModal.module.css"
import { useState } from "react";

const NoteModal = ({ setNoteData, toggleModal, id, dialog }) => {
    const { register, handleSubmit, reset, formState:{errors} } = useForm();

    const onSubmit = (data) => {
        const merged = { id , ...data };
        setNoteData(merged);
        toggleModal();
        reset();
    }
    const closeAddNoteModal = () => {
        toggleModal();
        reset();
    }
    const title="Важная - красный (Когда хотите не забыть о своей задаче и получать оповещения) \nОбычная - зелёный (Стандартная задача) \nНизкая - голубой"
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:00');
    const onStartTimeChange = (e) => {
        e.preventDefault();
        setStartTime(e.target.value);
        if(startTime < endTime)
            {
                console.log("Начальное время не должно превышать конечное");
            }
        
    }
    const onEndTimeChange = (e) =>{
        //e.preventDefault();
        console.log(startTime);
        console.log(endTime);
        setEndTime(e.target.value);
        console.log(startTime<endTime);
        //нужен парс часов и минут
        if(startTime < endTime)
            {
                console.log("Начальное время не должно превышать конечное");
            }
        
    }
    return (
        <>
            <dialog ref={dialog} className={s.favDialog}>
                <div><button onClick={ closeAddNoteModal } className={s.backButton}>Назад</button></div>
                <hr />
                <div className={s.favDialogClass}>
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                        <div><input {...register("title")} type="text" placeholder="Заголовок" /></div>
                        <div><textarea {...register("description")} placeholder="Описание заметки" /></div>
                        <div><b>Начало</b></div>
                        <div><input onInput={(e)=>onStartTimeChange(e)} value={startTime} {...register("startTime")} type="time" aria-label="startTimeLabel"/></div>
                        <div><b>Конец</b></div>
                        <div><input onInput={(e)=>onEndTimeChange(e)} value={endTime} {...register("endTime")} type="time" aria-label="endTimeLabel"/></div>
                        <div>
                            <div>
                                <b>Важность заметки</b>
                            </div>
                            <select {...register("importance")} defaultValue={'1'} aria-label="ImportanceSelector">
                                <option value='0'>Важная</option>
                                <option value='1'>Обычная</option>
                                <option value='2'>Низкая</option>
                            </select>
                            <span className={s.tagHelp} title={title}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M140 180a12 12 0 1 1-12-12a12 12 0 0 1 12 12M128 72c-22.06 0-40 16.15-40 36v4a8 8 0 0 0 16 0v-4c0-11 10.77-20 24-20s24 9 24 20s-10.77 20-24 20a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-.72c18.24-3.35 32-17.9 32-35.28c0-19.85-17.94-36-40-36m104 56A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></svg></span>
                        </div>
                        <div><button type="submit">Добавить</button></div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
export default NoteModal;