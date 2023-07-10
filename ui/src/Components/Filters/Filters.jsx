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

import {useDispatch, useSelector} from "react-redux";
import {useSearchParamsActions, useUpdateProducts} from "../../core/hooks";


export function Filters({className}) {
    const filters = getFiltersData();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const category = useSelector(state => state.filters.category);
    const subcategory = useSelector(state => state.filters.subcategory);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);

    // const lowestPriceFilter = searchParams.get("price_gte");
    // const highestPriceFilter = searchParams.get("price_lte");

    const categoriesFilters = searchParams.get('categories_like')?.split(',') ?? [];
    const availabilityFilters = searchParams.get('available')?.split(',') ?? [];
    const colorsFilters = searchParams.get('colors_like')?.split(',') ?? [];
    const { handleChangeSearchParams } = useSearchParamsActions();
    const {updateProducts} = useUpdateProducts(category, subcategory, searchParamsStr);


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

            <AvailabilityFilter filter={filters.availability} handleChangeSearchParams={handleChangeSearchParams}
                                updateProducts={updateProducts}
                                availabilityFilters={availabilityFilters}/>

            <CategoriesFilter filter={filters.productType} handleChangeSearchParams={handleChangeSearchParams}
                              updateProducts={updateProducts}
                              categoriesFilters={categoriesFilters}/>

            <ColorFilter filter={filters.color} handleChangeSearchParams={handleChangeSearchParams}
                         updateProducts={updateProducts} colorsFilters={colorsFilters}/>


        </div>
    )
}