import style from "./Filters.module.scss"
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";

export function ProductTypeFilter({filter}) {
    return(
        <FormGroup>
            <FormControlLabel control={<Checkbox color="main_text_color" value={filter.options.earbuds.value}/>} label={
                <div className={style.filter_label_wrapper}>
                    <span className={style.filter_text}>{filter.options.earbuds.name}</span>
                    <span className={style.filter_qty}>6</span>
                </div>
            }/>
            <FormControlLabel control={<Checkbox color="main_text_color"value={filter.options.headphones.value}/>} label={
                <div className={style.filter_label_wrapper}>
                    <span className={style.filter_text}>{filter.options.headphones.name}</span>
                    <span className={style.filter_qty}>21</span>
                </div>
            }/>
            <FormControlLabel control={<Checkbox color="main_text_color"value={filter.options.speakers.value}/>} label={
                <div className={style.filter_label_wrapper}>
                    <span className={style.filter_text}>{filter.options.speakers.name}</span>
                    <span className={style.filter_qty}>10</span>
                </div>
            }/>
        </FormGroup>
    )
};
