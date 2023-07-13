import style from "./CurrentFilters.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {getFiltersData} from "../../data/dataFunctions";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {
    clearAllFilters, removeAvailabilityFilter,
    removeCategoriesFilter, removeColorFilter, removePriceFilter,
    setAvailabilityCount, setCategoriesCount,
    setColorsCount, setPriceRange
} from "../../data/redux/reducers/filtersSlice";
import {useSearchParamsActions, useUpdateProducts} from "../../core/hooks";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function ActiveFilters({className}) {
    const filters = getFiltersData();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const colorFilters = useSelector(state => state.filters.colorFilter);
    const categoriesFilters = useSelector(state => state.filters.categoriesFilter);
    const availabilityFilters = useSelector(state => state.filters.availabilityFilter);
    const priceFilter = useSelector(state => state.filters.priceFilter);

    const minPrice = useSelector(state => state.filters.minPrice);
    const maxPrice = useSelector(state => state.filters.maxPrice);

    const categoriesParamsFilters = searchParams.get('categories_like')?.split(',') ?? [];
    const availabilityParamsFilters = searchParams.get('available')?.split(',') ?? [];
    const colorsParamsFilters = searchParams.get('colors_like')?.split(',') ?? [];

    const category = useSelector(state => state.filters.category);
    const subcategory = useSelector(state => state.filters.subcategory);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);

    const {handleChangeSearchParams} = useSearchParamsActions();
    const {updateProducts} = useUpdateProducts(category, subcategory, searchParamsStr);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        flag && handleFilterProducts();
    }, [flag]);

    const handleFilterProducts = () => {
        updateProducts()
            .then(resp => {
                dispatch(setColorsCount(resp));
                dispatch(setAvailabilityCount(resp));
                dispatch(setCategoriesCount(resp));
            })
    }

    return (
        <div className={`${style.CurrentFilters} ${className}`}>
            {categoriesFilters.map(item => {
                return (
                    <button
                        className={style.current_filters_btn}
                        key={uuidv4()}
                        onClick={(e) => {
                            dispatch(removeCategoriesFilter(item));
                            handleChangeSearchParams("categories_like", item, false, categoriesParamsFilters);
                            setFlag(uuidv4());
                        }}
                    >
                        <span>{item}</span>
                        <CloseIcon fontSize="small"/>
                    </button>
                )
            })}
            {colorFilters.map(item => {
                return (
                    <button
                        className={style.current_filters_btn}
                        key={uuidv4()}
                        onClick={(e) => {
                            dispatch(removeColorFilter(item));
                            handleChangeSearchParams("colors_like", item.value, false, colorsParamsFilters);
                            setFlag(uuidv4());
                        }}
                    >
                        <CircleIcon color={item.value} fontSize="small"/>
                        <span>{item.name}</span>
                        <CloseIcon fontSize="small"/>
                    </button>
                )
            })}
            {availabilityFilters.map(item => {
                return (
                    <button
                        className={style.current_filters_btn}
                        key={uuidv4()}
                        onClick={(e) => {
                            dispatch(removeAvailabilityFilter(item));
                            handleChangeSearchParams("available", item.searchParamValue, false, availabilityParamsFilters);
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
                            dispatch(removePriceFilter());
                        }}
                    >
                        <span>{`$${priceFilter[0]} - $${priceFilter[1]}`}</span>
                        <CloseIcon fontSize="small"/>
                    </button>
                )
            }

            {(colorFilters.length > 0 || categoriesFilters.length > 0 || availabilityFilters.length > 0 || priceFilter.length > 0)  &&
                <button className={`${style.current_filters_btn} ${style.clear_btn}`}
                        onClick={() => {
                            dispatch(clearAllFilters());
                            dispatch(setPriceRange([minPrice, maxPrice]));
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