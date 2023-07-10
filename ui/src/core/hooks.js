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

    return {handleChangeSearchParams};
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