import style from "./Filters.module.scss";
import {PriceFilter} from "./PriceFilter";
import {AvailabilityFilter} from "./AvalibilityFilter";
import {ColorFilter} from "./ColorFilter";
import {CategoriesFilter} from "./CategoriesFilter";
import {getFiltersData} from "../../data/dataFunctions";
import * as React from 'react';
import {useSearchParams} from "react-router-dom";
import { useSelector} from "react-redux";
import {useSearchParamsActions, useUpdateProducts} from "../../core/hooks";


export function Filters({className}) {
    const filters = getFiltersData();
    const [searchParams, setSearchParams] = useSearchParams();
    const category = useSelector(state => state.filters.category);
    const subcategory = useSelector(state => state.filters.subcategory);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);

    const categoriesFilters = searchParams.get('categories_like')?.split(',') ?? [];
    const availabilityFilters = searchParams.get('available')?.split(',') ?? [];
    const colorsFilters = searchParams.get('colors_like')?.split(',') ?? [];

    const {handleChangeSearchParams, handleChangePriceSearchParams} = useSearchParamsActions();
    const {updateProducts} = useUpdateProducts(category, subcategory, searchParamsStr);

    return (
        <div className={`${style.Filters} ${className}`}>
            <h2 className={style.filters_tittle}>{filters.tittle}</h2>
            <PriceFilter filter={filters.price}
                         handleChangePriceSearchParams={handleChangePriceSearchParams}
                         updateProducts={updateProducts}
            />
            <AvailabilityFilter filter={filters.availability}
                                handleChangeSearchParams={handleChangeSearchParams}
                                updateProducts={updateProducts}
                                availabilityFilters={availabilityFilters}/>
            <CategoriesFilter filter={filters.productType}
                              handleChangeSearchParams={handleChangeSearchParams}
                              updateProducts={updateProducts}
                              categoriesFilters={categoriesFilters}/>
            <ColorFilter filter={filters.color}
                         handleChangeSearchParams={handleChangeSearchParams}
                         updateProducts={updateProducts}
                         colorsFilters={colorsFilters}/>
        </div>
    )
}