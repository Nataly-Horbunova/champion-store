import style from "./Filters.module.scss";
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {useEffect, useState} from "react";
import {
    setAvailabilityCount,
    setCategoriesCount,
    setColorsCount
} from "../../data/redux/reducers/filtersSlice";



export function AvailabilityFilter({filter, handleChangeSearchParams, handleUpdateProducts, availabilityFilters}) {
    const availabilityCount = useSelector(state => state.filters.availabilityCount);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);
    const [availabilityFlag, setAvailabilityFlag] = useState(false);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        availabilityFlag && handleFilterByAvailability();

    }, [availabilityFlag, checked ]);

    const handleFilterByAvailability = () => {

        handleUpdateProducts()
            .then(resp => {
                dispatch(setColorsCount(resp));
                dispatch(setCategoriesCount(resp));
                !checked && availabilityFilters.length === 0 && dispatch(setAvailabilityCount(resp));
            })
    }

    return (
        <Accordion className={style.filter_accordion} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={style.filter_tittle}>{filter.tittle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {filter.options.map(item => {
                        const count = availabilityCount[item.value];

                        return (
                            <FormControlLabel key={uuidv4()} control={
                                <Checkbox
                                    color="main_text_color"
                                    value={item.value}
                                    checked={availabilityFilters.includes(item.searchParamValue)}
                                    disabled={!count && !availabilityFilters.includes(item.searchParamValue)}
                                    onChange={(e) => {
                                        handleChangeSearchParams("available", item.searchParamValue, e.target.checked, availabilityFilters);
                                        setAvailabilityFlag(uuidv4());
                                        setChecked(e.target.checked);
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
                    })}

                </FormGroup>
            </AccordionDetails>
        </Accordion>


    )
}