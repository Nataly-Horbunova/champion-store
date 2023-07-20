import style from "./Sort.module.scss";
import SortIcon from '@mui/icons-material/Sort';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {getSortData} from "../../data/dataFunctions";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParamsActions} from "../../core/hooks";
import {setPageNumber, setSortValue} from "../../data/redux/reducers/filtersSlice";

export function Sort({className}) {
    const products = useSelector(state => state.shop.products);
    const pageNumber = useSelector(state => state.filters.pageNumber);
    const sort = getSortData();
    const {handleChangeSortSearchParams} = useSearchParamsActions();
    const dispatch = useDispatch();

    const sortValue = useSelector(state => state.filters.sortValue);

    return (
        <div className={`${style.Sort} ${className}`}>
            <SortIcon fontSize="medium"/>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="sort" color="main_text_color">
                    {sort.tittle}
                </InputLabel>
                <NativeSelect
                    value={sortValue === "" ? sort.options[0].value : sortValue}
                    color="main_text_color"
                    inputProps={{
                        name: 'sort',
                        id: 'sort',
                    }}
                    onChange={(e) => {
                        pageNumber > 1 && dispatch(setPageNumber(1));
                        const sortValue = e.target.options[e.target.selectedIndex].getAttribute('data-sort');
                        const orderValue = e.target.options[e.target.selectedIndex].getAttribute('data-order');
                        handleChangeSortSearchParams("_sort", "_order", sortValue, orderValue);
                        dispatch(setSortValue(e.target.value));
                    }}
                >
                    {
                        sort.options.map((item, i) => {
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