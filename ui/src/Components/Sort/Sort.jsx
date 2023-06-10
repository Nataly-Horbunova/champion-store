import style from "./Sort.module.scss";
import SortIcon from '@mui/icons-material/Sort';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {getSortData} from "../../data/dataFunctions";

export function Sort({className, total}) {
    const sort = getSortData();

    return (
        <div className={`${style.Sort} ${className}`}>
            <SortIcon fontSize="medium"/>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="sort" color="main_text_color">
                    {sort.tittle}
                </InputLabel>
                <NativeSelect
                    color="main_text_color"
                    defaultValue={30}
                    inputProps={{
                        name: 'sort',
                        id: 'sort',
                    }}
                >
                    {
                        sort.options.map(item => {
                            return (
                                <option value={item.value} key={item.id}>{item.name}</option>
                            )
                        })
                    }
                </NativeSelect>
            </FormControl>
            <div className={style.product_qty_wrapper}>
                <span>{total}</span>
                <span>{sort.totalText}</span>
            </div>
        </div>
    )
}