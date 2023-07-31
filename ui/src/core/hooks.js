import {setSearchParamsStr} from "../data/redux/reducers/filtersSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getProducts, pageUrl} from "./api";
import {setProducts, setProductsPerPage} from "../data/redux/reducers/shopSlice";

export const useSearchParamsActions = () => {
    const navigate = useNavigate();
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
        searchParams.delete(pageUrl);
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

        if (priceRange[0] !== null && priceRange[1] !== null) {
            updateParam(minPriceRegex, currentMinPriceParam);
            updateParam(maxPriceRegex, currentMaxPriceParam);
            searchParams.set(minPriceFilter, priceRange[0]);
            searchParams.set(maxPriceFilter, priceRange[1]);
        } else {
            updateParam(minPriceRegex, "");
            updateParam(maxPriceRegex, "");
            searchParams.delete(minPriceFilter);
            searchParams.delete(maxPriceFilter);
        }

        dispatch(setSearchParamsStr(updatedParams));
        searchParams.delete(pageUrl);
        setSearchParams(searchParams, {replace: true});
    }

    const handleChangeSortSearchParams = (sortFilter, orderFilter, sortValue, orderValue) => {
        let updatedParams = searchParamsStr;
        const regex = new RegExp(`${sortFilter}=[^&]+&${orderFilter}=[^&]+&`);
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

        searchParams.delete(pageUrl);
        setSearchParams(searchParams, {replace: true});
        dispatch(setSearchParamsStr(updatedParams));
    }


    const handleChangeSearchValueParams = (searchFilter, searchValue) => {
        const value = searchValue.trim();
        const regex = new RegExp(`${searchFilter}=[^&]+&`);
        const isPresent = searchParamsStr.match(regex);

        if (!value && !isPresent) return;

        const updatedSearchParams = new URLSearchParams();

        if (value.length !== 0) {
            const currentSearchValueParams = `${searchFilter}=${searchValue}&`;
            updatedSearchParams.set(searchFilter, searchValue);
            dispatch(setSearchParamsStr(currentSearchValueParams));
        }

        setSearchParams(updatedSearchParams, {replace: true});
        navigate("collections?" + updatedSearchParams.toString());
    }

    return {
        handleChangeSearchParams,
        handleChangePriceSearchParams,
        handleChangeSortSearchParams,
        handleChangeSearchValueParams
    };
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