import style from "./ActiveFilters.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {getFiltersData} from "../../../data/dataFunctions";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {
    removeAvailabilityFilter,
    removeCategoriesFilter, removeColorFilter, removePriceFilter,
    setAvailabilityCount, setCategoriesCount,
    setColorsCount, setPageNumber, setPriceRange
} from "../../../data/redux/reducers/filtersSlice";
import {useSearchParamsActions, useUpdateProducts} from "../../../core/hooks";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {availabilityUrl, categoriesUrl, colorsUrl, maxPriceUrl, minPriceUrl} from "../../../core/api";

export function ActiveFilters({className}) {
    const filters = getFiltersData();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        category,
        subcategory,
        searchParamsStr,
        pageNumber,
        colorFilter,
        categoriesFilter,
        availabilityFilter,
        priceFilter,
        minPrice,
        maxPrice
    } = useSelector(state => state.filters);


    const categoriesParamsFilters = searchParams.get(categoriesUrl)?.split(',') ?? [];
    const availabilityParamsFilters = searchParams.get(availabilityUrl)?.split(',') ?? [];
    const colorsParamsFilters = searchParams.get(colorsUrl)?.split(',') ?? [];

    const {handleChangeSearchParams, handleChangePriceSearchParams} = useSearchParamsActions();
    const {updateAllProducts, updateProductsPerPage} = useUpdateProducts();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        flag && handleFilterProducts();
    }, [flag]);

    const handleFilterProducts = () => {
        updateProductsPerPage(category, subcategory, searchParamsStr, pageNumber);
        updateAllProducts(category, subcategory, searchParamsStr)
            .then(resp => {
                dispatch(setColorsCount(resp));
                dispatch(setAvailabilityCount(resp));
                dispatch(setCategoriesCount(resp));
            })
    }

    return (
        <div className={`${style.CurrentFilters} ${className}`}>
            {categoriesFilter.map(item => {
                return (
                    <button
                        className={style.current_filters_btn}
                        key={uuidv4()}
                        onClick={(e) => {
                            pageNumber > 1 && dispatch(setPageNumber(1));
                            dispatch(removeCategoriesFilter(item));
                            handleChangeSearchParams(categoriesUrl, item, false, categoriesParamsFilters);
                            setFlag(uuidv4());
                        }}
                    >
                        <span>{item}</span>
                        <CloseIcon fontSize="small"/>
                    </button>
                )
            })}
            {colorFilter.map(item => {
                return (
                    <button
                        className={style.current_filters_btn}
                        key={uuidv4()}
                        onClick={(e) => {
                            pageNumber > 1 && dispatch(setPageNumber(1));
                            dispatch(removeColorFilter(item));
                            handleChangeSearchParams(colorsUrl, item.value, false, colorsParamsFilters);
                            setFlag(uuidv4());
                        }}
                    >
                        <CircleIcon color={item.value} fontSize="small"/>
                        <span>{item.name}</span>
                        <CloseIcon fontSize="small"/>
                    </button>
                )
            })}
            {availabilityFilter.map(item => {
                return (
                    <button
                        className={style.current_filters_btn}
                        key={uuidv4()}
                        onClick={(e) => {
                            pageNumber > 1 && dispatch(setPageNumber(1));
                            dispatch(removeAvailabilityFilter(item));
                            handleChangeSearchParams(availabilityUrl, item.searchParamValue, false, availabilityParamsFilters);
                            setFlag(uuidv4());
                        }}
                    >
                        <span>{item.name}</span>
                        <CloseIcon fontSize="small"/>
                    </button>
                )
            })}

            {
                priceFilter.length > 0 && (
                    <button
                        className={style.current_filters_btn}
                        onClick={(e) => {
                            pageNumber > 1 && dispatch(setPageNumber(1));
                            dispatch(removePriceFilter());
                            dispatch(setPriceRange([minPrice, maxPrice]));
                            handleChangePriceSearchParams(minPriceUrl, maxPriceUrl, [null, null]);
                            setFlag(uuidv4());
                        }}
                    >
                        <span>{`$${priceFilter[0]} - $${priceFilter[1]}`}</span>
                        <CloseIcon fontSize="small"/>
                    </button>
                )
            }

            {(colorFilter.length > 0 || categoriesFilter.length > 0 || availabilityFilter.length > 0 || priceFilter.length > 0) &&
                <button className={`${style.current_filters_btn} ${style.clear_btn}`}
                        onClick={() => {
                            pageNumber > 1 && dispatch(setPageNumber(1));
                            setSearchParams("");
                        }}
                >
                    <span>{filters.clearBtn}</span>
                    <DeleteForeverIcon
                        fontSize="small"
                    />
                </button>
            }
        </div>
    )
}