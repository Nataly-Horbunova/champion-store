import style from "./CurrentFilters.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {getFiltersData} from "../../data/dataFunctions";

export function CurrentFilters({className}) {
    const filters = getFiltersData();

    return (
        <div className={`${style.CurrentFilters} ${className}`}>
            <button className={style.current_filters_btn}>
                <CircleIcon color="orange" fontSize="small"/>
                <span>Orange</span>
                <CloseIcon fontSize="small"/>
            </button>
            <button className={style.current_filters_btn}>
                <CircleIcon color="blue" fontSize="small"/>
                <span>Blue</span>
                <CloseIcon fontSize="small"/>
            </button>
            <button className={style.current_filters_btn}>
                <CircleIcon color="green" fontSize="small"/>
                <span>Green</span>
                <CloseIcon fontSize="small"/>
            </button>
            <button className={style.current_filters_btn}>
                <span>On Stock</span>
                <CloseIcon fontSize="small"/>
            </button>
            <button className={`${style.current_filters_btn} ${style.clear_btn}` }>
                <span>{filters.clearBtn}</span>
                <DeleteForeverIcon fontSize="small"/>
            </button>
        </div>
    )
}