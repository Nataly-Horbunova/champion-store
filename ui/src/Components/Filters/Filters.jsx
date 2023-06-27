import style from "./Filters.module.scss";
import {PriceFilter} from "./PriceFilter";
import {AvailabilityFilter} from "./AvalibilityFilter";
import {ColorFilter} from "./ColorFilter";
import {CategoriesFilter} from "./CategoriesFilter";
import {getFiltersData} from "../../data/dataFunctions";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../api/api";
import {setProducts} from "../../data/redux/reducers/shopSlice";
import {setFilteredProducts, setSearchParamsStr} from "../../data/redux/reducers/filtersSlice";


export function Filters({className}) {
    const filters = getFiltersData();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const category = useSelector(state => state.filters.category);
    const subcategory = useSelector(state => state.filters.subcategory);


    function handleChangeSearchParams(filter, value, checked) {
        console.log('searchParams')
        const currentValues = searchParams.getAll(filter);
        let updatedValues;

        if (checked) {
            updatedValues = [...currentValues, value];
        } else {
            updatedValues = currentValues.filter(v => v !== value);
        }

        setSearchParams({...searchParams, [filter]: updatedValues});

    }


    const handleUpdateProducts = () => {
        const paramsString = searchParams.toString();
        console.log('filters');

        return getProducts(category, subcategory, paramsString)
            .then(resp => {
                dispatch(setProducts(resp)); // paginate
                dispatch(setFilteredProducts(resp));
                dispatch(setSearchParamsStr(paramsString));
                                return resp;
            });
    }


    // const lowestPriceFilter = searchParams.get("price_gte");
    // const highestPriceFilter = searchParams.get("price_lte");
    // const onStockFilter = searchParams.get("onStock");
    // const outOfStockFilter = searchParams.get("onStock_ne");
    // const colorsFilter = searchParams.get("colors_like");
    // const categoriesFilter = searchParams.get("categories_like");

    const categoriesFilters = searchParams.getAll('categories_like');


    return (
        <div className={`${style.Filters} ${className}`}>
            <h2 className={style.filters_tittle}>{filters.tittle}</h2>

            {/*  ------------- Price filter ---------- */}
            <Accordion className={style.filter_accordion} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={style.filter_tittle}>{filters.price.tittle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PriceFilter filter={filters.price}/>
                </AccordionDetails>
            </Accordion>

            {/* ----------------- Availability filter ---------- */}
            <AvailabilityFilter filter={filters.availability}/>

            {/* ----------------- Categories filter -------------- */}
            <CategoriesFilter filter={filters.productType} handleChangeSearchParams={handleChangeSearchParams}
                              handleUpdateProducts={handleUpdateProducts}
                              categoriesFilters={categoriesFilters}/>

            {/* ------------------ Color filter -------------------- */}
            <ColorFilter filter={filters.color}/>


        </div>
    )
}