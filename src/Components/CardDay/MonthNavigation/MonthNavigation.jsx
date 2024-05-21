import s from "./MonthNavigation.module.css"

const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]

const MonthNavigation = ({onNextMonth, onPreviousMonth, currentMonth, currentYear}) => {
    return (
        <div className={s.navigatorWrapper}>
            <div className={s.prevAndNextButtons}>
                <button onClick={onPreviousMonth}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645"/></svg></button>
            </div>
            <div>
                <b>
                { monthNames[currentMonth] } 
                —
                { currentYear }
                </b>
            </div>           
            <div className={s.prevAndNextButtons}>
                <button onClick={onNextMonth}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886"/></svg></button>
            </div>
        </div>
    )
}

export default MonthNavigation;