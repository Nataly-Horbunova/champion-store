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
import {useState} from "react";
import {useSelector} from "react-redux";


export function Filters({category, className}) {
    const filters = getFiltersData();
    const filteredProducts = useSelector(state => state.filters.filteredProducts);


    const [searchParams, setSearchParams] = useSearchParams();

    function handleFilterChange(filter, value, checked) {
        const currentValues = searchParams.getAll(filter);
        let updatedValues;

        if (checked) {
            updatedValues = [...currentValues, value];
        } else {
            updatedValues = currentValues.filter(v => v !== value);
        }

        setSearchParams({...searchParams, [filter]: updatedValues});
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
            <Accordion className={style.filter_accordion} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={style.filter_tittle}>{filters.availability.tittle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AvailabilityFilter filter={filters.availability}/>
                </AccordionDetails>
            </Accordion>

            {/* ----------------- Categories filter -------------- */}
            <CategoriesFilter filter={filters.productType} handleFilterChange={handleFilterChange}
                              categoriesFilters={categoriesFilters}/>

            {/* ------------------ Color filter -------------------- */}
            {
                (filters.color.categories[category] || !category) &&
                <Accordion className={style.filter_accordion} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={style.filter_tittle}>{filters.color.tittle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ColorFilter filter={filters.color}/>
                    </AccordionDetails>
                </Accordion>
            }


        </div>
    )
}