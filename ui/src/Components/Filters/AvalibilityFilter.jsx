import style from "./Filters.module.scss";
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function AvailabilityFilter({filter}) {

    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox color="main_text_color" value={filter.options.inStock.value}/>} label={
                <div className={style.filter_label_wrapper}>
                    <span className={style.filter_text}>{filter.options.inStock.name}</span>
                    <span className={style.filter_qty}>35</span>
                </div>
            }/>
            <FormControlLabel control={<Checkbox color="main_text_color" value={filter.options.outOfStock.value}/>} label={
                <div className={style.filter_label_wrapper}>
                    <span className={style.filter_text}>{filter.options.outOfStock.name}</span>
                    <span className={style.filter_qty}>3</span>
                </div>
            }/>
        </FormGroup>
    )
}