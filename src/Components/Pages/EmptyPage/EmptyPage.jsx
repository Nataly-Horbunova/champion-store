import style from "./EmptyPage.module.scss";
import mainStyles from "../../../index.module.scss";
import {useNavigate} from "react-router-dom";

export function EmptyPage ({tittle, text, btn}) {
    const navigate = useNavigate();

    function handleNavigate() {
        navigate("/collections")
    }

    return(
        <main className={style.EmptyPage}>
            <div className={`${mainStyles.container} ${style.EmptyPage_container}`}>
                <p className={style.tittle}>{tittle}</p>
                <p className={style.text}>{text}</p>
                <button className={style.btn} onClick={handleNavigate}>{btn}</button>
            </div>
        </main>
    )
}