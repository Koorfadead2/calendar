import s from "./Header.module.css"

function Header(){
    return(
        <div className={s.headerWrapper}>
            <img src="./../../assets/logo.jpg" alt="logo"/>
            <div className={s.header}>
                <button title="login" type="button">Login</button>
            </div>
        </div>
    )
}

export default Header;