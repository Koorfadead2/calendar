import s from "./Header.module.css"

function Header(){
    return(
        <div className={s.headerWrapper}>
            <img src="./../../assets/logo.jpg"/>
            <div className={s.header}>
                <button type="button">Login</button>
            </div>
        </div>
    )
}

export default Header;