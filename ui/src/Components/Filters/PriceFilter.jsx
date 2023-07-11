import style from "./Filters.module.scss";
import {Slider} from "@mui/material";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {useDispatch, useSelector} from "react-redux";
import {setPriceRange} from "../../data/redux/reducers/filtersSlice";

export function PriceFilter({filter}) {
    const minPrice = useSelector(state => state.filters.minPrice);
    const maxPrice = useSelector(state => state.filters.maxPrice);
    const priceRange = useSelector(state => state.filters.priceRange);
    const dispatch = useDispatch();

    const handlePriceRangeChange = (event, newValue) => {
        dispatch(setPriceRange(newValue));
    }

    const handleMinPriceChange = (e) => {
        const newMinPrice = Number(e.target.value);
        dispatch(setPriceRange([newMinPrice, priceRange[1]]));
    }

    const handleMaxPriceChange = (e) => {
        const newMaxPrice = Number(e.target.value);
        dispatch(setPriceRange([priceRange[0], newMaxPrice]));
    }


    return (
        <div className={style.PriceFilter}>
            <Slider
                className={style.Slider}
                size="small"
                value={priceRange}
                min={minPrice}
                max={maxPrice}
                valueLabelDisplay="auto"
                color="main_text_color"
                onChange={handlePriceRangeChange}
            />
            <FormControl fullWidth sx={{m: 1}} color="main_text_color" size="small">
                <InputLabel htmlFor="from">{filter.fromText}</InputLabel>
                <OutlinedInput
                    type="number"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label={filter.fromText}
                    value={priceRange[0]}
                    id="from"
                    inputProps={{
                        min: minPrice,
                        max: maxPrice,
                    }}
                    onChange={handleMinPriceChange}
                />
            </FormControl>
            <FormControl fullWidth sx={{m: 1}} color="main_text_color" size="small">
                <InputLabel htmlFor="to">{filter.toText}</InputLabel>
                <OutlinedInput
                    type="number"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label={filter.toText}
                    value={priceRange[1]}
                    id="to"
                    inputProps={{
                        min: minPrice,
                        max: maxPrice,
                    }}
                    onChange={handleMaxPriceChange}
                />
            </FormControl>
        </div>


    )
}