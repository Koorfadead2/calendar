import s from "./Header.module.css"

export const Header = function({}){
    return(
        <div className={s.headerWrapper}>
            <img src="./../../assets/logo.jpg" alt="logo" loading="lazy" priority="low"/>
        </div>
    )
}