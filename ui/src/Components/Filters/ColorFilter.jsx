import style from "./Filters.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";

export function ColorFilter({filter}) {
    return (
        <FormGroup>
            {
                filter.options.map(item => {
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
                            />
                        } label={
                            <div className={style.filter_label_wrapper}>
                                <span className={style.filter_text}>{item.name}</span>
                                <span className={style.filter_qty}>4</span>
                            </div>
                        }/>
                    )
                })
            }
        </FormGroup>
    )
}