import style from "./Filters.module.scss";
import {Slider} from "@mui/material";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {useDispatch, useSelector} from "react-redux";
import {
    setAvailabilityCount, setCategoriesCount,
    setColorsCount, setPageNumber,
    setPriceFilter,
    setPriceRange
} from "../../data/redux/reducers/filtersSlice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {v4 as uuidv4} from "uuid";
import {useEffect, useState} from "react";
import {maxPriceUrl, minPriceUrl} from "../../core/api";

export function PriceFilter({filter, handleChangePriceSearchParams, updateProducts }) {
    const minPrice = useSelector(state => state.filters.minPrice);
    const maxPrice = useSelector(state => state.filters.maxPrice);
    const priceRange = useSelector(state => state.filters.priceRange) || [minPrice, maxPrice];
    const pageNumber = useSelector(state => state.filters.pageNumber);
    const dispatch = useDispatch();
    const [productsFlag, setProductsFlag] = useState(false);
    const [priceRangeFlag, setPriceRangeFlag] = useState(false);

    useEffect(() => {
        if (priceRangeFlag) {
            handleChangePriceSearchParams(minPriceUrl, maxPriceUrl, priceRange);
            setProductsFlag(uuidv4());
        }
    }, [priceRangeFlag]);

    useEffect(() => {
        productsFlag && updateProducts()
            .then(resp => {
                // console.log('price');
                dispatch(setColorsCount(resp));
                dispatch(setAvailabilityCount(resp));
                dispatch(setCategoriesCount(resp));
            });
    }, [productsFlag]);

    const handlePriceRangeChange = (event, newValue) => {
        dispatch(setPriceFilter(newValue));
        dispatch(setPriceRange(newValue));
    }

    return (
        <Accordion className={style.filter_accordion} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={style.filter_tittle}>{filter.tittle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={style.PriceFilter}>
                    <Slider
                        className={style.Slider}
                        size="small"
                        value={priceRange}
                        min={minPrice}
                        max={maxPrice}
                        valueLabelDisplay="auto"
                        color="main_text_color"
                        onChange={(e, newValue) => {
                            pageNumber > 1 && dispatch(setPageNumber(1));
                            handlePriceRangeChange(e, newValue);
                            setPriceRangeFlag(priceRange);
                        }}
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
                            onChange={(e) => {
                                pageNumber > 1 && dispatch(setPageNumber(1));
                                const newMinPrice = Number(e.target.value);
                                const newValue = [newMinPrice, priceRange[1]];
                                handlePriceRangeChange(e, newValue);
                                setPriceRangeFlag(priceRange);
                            }}
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
                            onChange={(e) => {
                                pageNumber > 1 && dispatch(setPageNumber(1));
                                const newMaxPrice = Number(e.target.value);
                                const newValue = [priceRange[0], newMaxPrice];
                                handlePriceRangeChange(e, newValue);
                                setPriceRangeFlag(priceRange);
                            }}
                        />
                    </FormControl>
                </div>
            </AccordionDetails>
        </Accordion>


    )
}