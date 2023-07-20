import {setFilteredProducts, setSearchParamsStr} from "../data/redux/reducers/filtersSlice";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {getProducts} from "./api";
import {setProducts, setProductsPerPage} from "../data/redux/reducers/shopSlice";

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
        searchParams.delete("_page");
        setSearchParams(searchParams, {
            replace: true,
        });
    }

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
        searchParams.delete("_page");
        setSearchParams(searchParams, {replace: true});
    }

    const handleChangeSortSearchParams = (sortFilter, orderFilter, sortValue, orderValue) => {
        let updatedParams = searchParamsStr;
        const regex = /_sort=[^&]+&_order=[^&]+&/;
        const isPresent = searchParamsStr.match(regex);

        if (!sortValue && !isPresent) return;

        if (!sortValue && isPresent) {
            updatedParams = updatedParams.replace(regex, "");
            searchParams.delete(sortFilter);
            searchParams.delete(orderFilter);

        } else if (sortValue) {
            const currentSortParams = `${sortFilter}=${sortValue}&${orderFilter}=${orderValue}&`;
            updatedParams = isPresent ? updatedParams.replace(regex, currentSortParams) : updatedParams.concat(currentSortParams);
            searchParams.set(sortFilter, sortValue);
            searchParams.set(orderFilter, orderValue);
        }

        searchParams.delete("_page");
        setSearchParams(searchParams, {replace: true});
        dispatch(setSearchParamsStr(updatedParams));
    }

    return {handleChangeSearchParams, handleChangePriceSearchParams, handleChangeSortSearchParams};
}


export const useUpdateProducts = () => {

    const dispatch = useDispatch();

    const updateAllProducts = (category, subcategory, searchParamsStr) => {
        return getProducts(category, subcategory, searchParamsStr)
            .then(resp => {
                dispatch(setProducts(resp));
                return resp;
            });
    }

    const updateProductsPerPage = (category, subcategory, searchParamsStr, pageNumber) => {
        getProducts(category, subcategory, searchParamsStr, pageNumber)
            .then(resp => {
                dispatch(setProductsPerPage(resp));
            });
    }

    return {updateAllProducts, updateProductsPerPage}
}