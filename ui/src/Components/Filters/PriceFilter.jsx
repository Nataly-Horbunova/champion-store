import style from "./Filters.module.scss";
import {Slider} from "@mui/material";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export function PriceFilter({filter}) {

        return(
            <div className={style.PriceFilter}>
                <Slider
                    className={style.Slider}
                    size="small"
                    defaultValue={[0, 420]}
                    min={0}
                    max={420}
                    valueLabelDisplay="auto"
                    color="main_text_color"
                />
                <FormControl fullWidth sx={{ m: 1 }} color="main_text_color" size="small">
                    <InputLabel htmlFor="from">{filter.fromText}</InputLabel>
                    <OutlinedInput
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label={filter.fromText}
                        placeholder="0"
                        id="from"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} color="main_text_color" size="small">
                    <InputLabel htmlFor="to">{filter.toText}</InputLabel>
                    <OutlinedInput
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label={filter.toText}
                        placeholder="420"
                        id="to"
                    />
                </FormControl>
            </div>


    )
}