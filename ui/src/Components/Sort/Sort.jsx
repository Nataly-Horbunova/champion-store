import style from "./Sort.module.scss";
import SortIcon from '@mui/icons-material/Sort';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {getSortData} from "../../data/dataFunctions";
import {useSelector} from "react-redux";
import {useSearchParamsActions, useUpdateProducts} from "../../core/hooks";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";

export function Sort({className}) {
    const products = useSelector(state => state.shop.products);
    const sort = getSortData();
    const category = useSelector(state => state.filters.category);
    const subcategory = useSelector(state => state.filters.subcategory);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);

    const {updateProducts} = useUpdateProducts(category, subcategory, searchParamsStr);
    const {handleChangeSortSearchParams} = useSearchParamsActions();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        updateProducts();
    }, [flag])

    return (
        <div className={`${style.Sort} ${className}`}>
            <SortIcon fontSize="medium"/>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="sort" color="main_text_color">
                    {sort.tittle}
                </InputLabel>
                <NativeSelect
                    color="main_text_color"
                    inputProps={{
                        name: 'sort',
                        id: 'sort',
                    }}
                    onChange={(e) => {
                        const sortValue = e.target.options[e.target.selectedIndex].getAttribute('data-sort');
                        const orderValue = e.target.options[e.target.selectedIndex].getAttribute('data-order');
                        handleChangeSortSearchParams("_sort", "_order", sortValue, orderValue);
                        setFlag(uuidv4());
                    }}
                >
                    {
                        sort.options.map(item => {
                            return (
                                <option
                                    value={item.value}
                                    key={item.id}
                                    data-sort={item.sortValue}
                                    data-order={item.orderValue}
                                >{item.name}</option>
                            )
                        })
                    }
                </NativeSelect>
            </FormControl>
            <div className={style.product_qty_wrapper}>
                <span>{products.length}</span>
                <span>{sort.totalText}</span>
            </div>
        </div>
    )
}