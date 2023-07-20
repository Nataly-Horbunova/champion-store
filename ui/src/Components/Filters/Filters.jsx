import style from "./Filters.module.scss";
import {PriceFilter} from "./PriceFilter";
import {AvailabilityFilter} from "./AvalibilityFilter";
import {ColorFilter} from "./ColorFilter";
import {CategoriesFilter} from "./CategoriesFilter";
import {getFiltersData} from "../../data/dataFunctions";
import * as React from 'react';
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useSearchParamsActions, useUpdateProducts} from "../../core/hooks";


export function Filters({className}) {
    // console.log('filters')
    const filters = getFiltersData();
    const [searchParams, setSearchParams] = useSearchParams();
    const category = useSelector(state => state.filters.category);
    const subcategory = useSelector(state => state.filters.subcategory);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);
    const pageNumber = useSelector(state => state.filters.pageNumber);

    const categoriesFilters = searchParams.get('categories_like')?.split(',') ?? [];
    const availabilityFilters = searchParams.get('available')?.split(',') ?? [];
    const colorsFilters = searchParams.get('colors_like')?.split(',') ?? [];

    const {handleChangeSearchParams, handleChangePriceSearchParams} = useSearchParamsActions();
    const {updateAllProducts, updateProductsPerPage} = useUpdateProducts();

    return (
        <div className={`${style.Filters} ${className}`}>
            <h2 className={style.filters_tittle}>{filters.tittle}</h2>
            <PriceFilter filter={filters.price}
                         handleChangePriceSearchParams={handleChangePriceSearchParams}
                         updateProducts={() => {
                             updateProductsPerPage(category, subcategory, searchParamsStr, pageNumber);
                             return updateAllProducts(category, subcategory, searchParamsStr);
                         }}
            />
            <AvailabilityFilter filter={filters.availability}
                                handleChangeSearchParams={handleChangeSearchParams}
                                updateProducts={() => {
                                    updateProductsPerPage(category, subcategory, searchParamsStr, pageNumber);
                                    return updateAllProducts(category, subcategory, searchParamsStr);
                                }}
                                availabilityFilters={availabilityFilters}/>
            <CategoriesFilter filter={filters.productType}
                              handleChangeSearchParams={handleChangeSearchParams}
                              updateProducts={() => {
                                  updateProductsPerPage(category, subcategory, searchParamsStr, pageNumber);
                                  return updateAllProducts(category, subcategory, searchParamsStr);
                              }}
                              categoriesFilters={categoriesFilters}/>
            <ColorFilter filter={filters.color}
                         handleChangeSearchParams={handleChangeSearchParams}
                         updateProducts={() => {
                             updateProductsPerPage(category, subcategory, searchParamsStr, pageNumber);
                             return updateAllProducts(category, subcategory, searchParamsStr);
                         }}
                         colorsFilters={colorsFilters}/>
        </div>
    )
}