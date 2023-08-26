import style from './Header.module.scss';
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../data/redux/reducers/filtersSlice";
import {useSearchParamsActions} from "../../core/hooks";
import { searchUrl } from '../../core/api';

export const ProductsSearch = ({scrollDown}) => {
    const theme = useTheme();
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const {handleChangeSearchValueParams} = useSearchParamsActions();
    const handleSearchOnEnter = (e) => {
        if (e.keyCode === 13) {
            setActive(false);
        }
    }
    const handleSearchOnChange = (e) => {
        handleChangeSearchValueParams(searchUrl, e.target.value);
        e.target.value ? dispatch(setSearchValue(e.target.value)) : dispatch(setSearchValue(''));
    }

    return (
        <div className={style.icon_wrapper}>
            {active ? <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    color={scrollDown ? "main_text_color" : "color_accent_2"}
                    autoFocus={true}
                    InputProps={{
                        style: {
                            color: scrollDown ? theme.palette.main_text_color.main : theme.palette.color_accent_2.main
                        }
                    }}
                    onBlur={() => {
                        setActive(false);
                        dispatch(setSearchValue(''));
                    }}
                    onKeyDown={handleSearchOnEnter}
                    onChange={handleSearchOnChange}
                /> :
                <SearchIcon
                    className={`${style.icon} ${scrollDown ? style.scroll : ""}`}
                    onClick={() => setActive(true)}
                />}
        </div>
    )
}