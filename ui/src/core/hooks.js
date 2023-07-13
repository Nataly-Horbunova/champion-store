import {setFilteredProducts, setSearchParamsStr} from "../data/redux/reducers/filtersSlice";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {getProducts} from "./api";
import {setProducts} from "../data/redux/reducers/shopSlice";

export const useSearchParamsActions = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);
    const handleChangeSearchParams = (filter, value, checked, currentValues) => {
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

    // const handleChangePriceSearchParams = (filter, value) => {
    //     const regex = new RegExp(`${filter}=\\d+&`);
    //     const currentParam = `${filter}=${value}&`;
    //     const isPresent = searchParamsStr.includes(filter);
    //     let updatedParams;
    //
    //     if (!isPresent) {
    //         updatedParams = searchParamsStr.concat(currentParam);
    //     } else {
    //         updatedParams = searchParamsStr.replace(regex, currentParam);
    //     }
    //
    //     console.log(currentParam);
    //     console.log(updatedParams);
    //
    //     dispatch(setSearchParamsStr(updatedParams));
    //     searchParams.set(filter, value);
    //     setSearchParams(searchParams, {
    //         replace: true,
    //     });
    // }

    const handleChangePriceSearchParams = (minPriceFilter, maxPriceFilter, priceRange) => {
        const minPriceRegex = new RegExp(`${minPriceFilter}=\\d+&`);
        const maxPriceRegex = new RegExp(`${maxPriceFilter}=\\d+&`);
        const currentMinPriceParam = `${minPriceFilter}=${priceRange[0]}&`;
        const currentMaxPriceParam = `${maxPriceFilter}=${priceRange[1]}&`;
        let updatedParams = searchParamsStr;

        const updateParam = (regex, param) => {
            const isPresent = searchParamsStr.match(regex);
            updatedParams = isPresent ? updatedParams.replace(regex, param) : updatedParams.concat(param);
        };

        updateParam(minPriceRegex, currentMinPriceParam);
        updateParam(maxPriceRegex, currentMaxPriceParam);

        dispatch(setSearchParamsStr(updatedParams));
        searchParams.set(minPriceFilter, priceRange[0]);
        searchParams.set(maxPriceFilter, priceRange[1]);
        setSearchParams(searchParams, { replace: true });
    }

    return {handleChangeSearchParams, handleChangePriceSearchParams};
}


export const useUpdateProducts = (category, subcategory, searchParamsStr) => {
    const dispatch = useDispatch();
    const updateProducts = () => {
        return getProducts(category, subcategory, searchParamsStr)
            .then(resp => {
                dispatch(setProducts(resp));
                dispatch(setFilteredProducts(resp));
                return resp;
            });
    }

    return {updateProducts}
}