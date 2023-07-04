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
import {getProducts} from "../../api/api";
import {setProducts} from "../../data/redux/reducers/shopSlice";
import {setFilteredProducts, setSearchParamsStr} from "../../data/redux/reducers/filtersSlice";


export function Filters({className}) {
    const filters = getFiltersData();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const category = useSelector(state => state.filters.category);
    const subcategory = useSelector(state => state.filters.subcategory);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);

    // const lowestPriceFilter = searchParams.get("price_gte");
    // const highestPriceFilter = searchParams.get("price_lte");
    // const colorsFilter = searchParams.get("colors_like");


    const categoriesFilters = searchParams.get('categories_like')?.split(',') ?? [];
    const availabilityFilters = searchParams.get('available')?.split(',') ?? [];


    function handleChangeSearchParams(filter, value, checked, currentValues) {
        const currentParam = `${filter}=${value}&`;
        const isPresent = searchParamsStr.includes(currentParam);
        let updatedValues;
        let updatedParams;

        if (checked && !isPresent) {
            updatedParams = searchParamsStr.concat(currentParam);
            updatedValues = [...currentValues, value];
        } else if (!checked && isPresent) {
            updatedParams = searchParamsStr.replace(currentParam, '');
            updatedValues = currentValues.filter(v => v !== value);
        }

        dispatch(setSearchParamsStr(updatedParams));
        updatedValues.length > 0 ? searchParams.set(filter, updatedValues.join(',')) : searchParams.delete(filter);
        setSearchParams(searchParams, {
            replace: true,
        });

    }


    const handleUpdateProducts = () => {

        return getProducts(category, subcategory, searchParamsStr)
            .then(resp => {
                dispatch(setProducts(resp));
                dispatch(setFilteredProducts(resp));
                return resp;
            });
    }


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
                                handleUpdateProducts={handleUpdateProducts}
                                availabilityFilters={availabilityFilters}/>

            <CategoriesFilter filter={filters.productType} handleChangeSearchParams={handleChangeSearchParams}
                              handleUpdateProducts={handleUpdateProducts}
                              categoriesFilters={categoriesFilters}/>

            <ColorFilter filter={filters.color}/>


        </div>
    )
}