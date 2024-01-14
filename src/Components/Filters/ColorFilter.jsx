import style from "./Filters.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {
    removeColorFilter,
    setAvailabilityCount,
    setCategoriesCount,
    setColorFilter,
    setColorsCount, setPageNumber
} from "../../data/redux/reducers/filtersSlice";
import {colorsUrl} from "../../core/api";

export function ColorFilter({filter, colorsFilters, handleChangeSearchParams, updateProducts}) {
    const dispatch = useDispatch();
    const colorsCount = useSelector(state => state.filters.colorsCount);
    const categoryColors = useSelector(state => state.filters.categoryColors);
    const pageNumber = useSelector(state => state.filters.pageNumber);
    const [flag, setFlag] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        flag && handleFilterByColor();
    }, [flag, checked]);


    const handleFilterByColor = () => {
        updateProducts()
            .then(resp => {
                dispatch(setCategoriesCount(resp));
                dispatch(setAvailabilityCount(resp));
                !checked && colorsFilters.length === 0 && dispatch(setColorsCount(resp));
            })
    }

    return (
        <Accordion className={style.filter_accordion} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={style.filter_tittle}>{filter.tittle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {
                        filter.options.map(item => {
                            if(!categoryColors.includes(item.value)) return;
                            const count = colorsCount[item.value] ? colorsCount[item.value] : 0;

                            return (
                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            color="main_text_color"
                                            value={item.value}
                                            sx={{
                                                color: `${item.color}`,
                                                '&.Mui-checked': {
                                                    color: `${item.color}`,
                                                },
                                            }}
                                            checked={colorsFilters.includes(item.value)}
                                            disabled={!count && !colorsFilters.includes(item)}
                                            onChange={(e) => {
                                                pageNumber > 1 && dispatch(setPageNumber(1));
                                                handleChangeSearchParams(colorsUrl, item.value, e.target.checked, colorsFilters);
                                                setFlag(uuidv4());
                                                setChecked(e.target.checked);
                                                e.target.checked ? dispatch(setColorFilter(item)) : dispatch(removeColorFilter(item));
                                            }
                                            }
                                        />
                                    } label={
                                    <div className={style.filter_label_wrapper}>
                                        <span className={style.filter_text}>{item.name}</span>
                                        <span className={style.filter_qty}>{count}</span>
                                    </div>
                                }/>
                            )
                        })
                    }
                </FormGroup>
            </AccordionDetails>
        </Accordion>


    )
}