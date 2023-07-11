import style from './Products.module.scss';
import {ProductCard} from "../ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import {getCategoriesData, getSubCategoriesData} from "../../data/dataFunctions";
import {useEffect} from "react";
import {
    clearAllFilters,
    setAvailabilityCount,
    setCategoriesCount,
    setCategory, setCategoryColors,
    setColorsCount, setMaxPrice, setMinPrice, setPriceRange,
    setSearchParamsStr,
    setSubcategory
} from "../../data/redux/reducers/filtersSlice";
import {useUpdateProducts} from "../../core/hooks";
import {getMaxPrice, getMinPrice} from "../../core/utils";


export const Products = () => {
    const products = useSelector(state => state.filters.filteredProducts);
    const dispatch = useDispatch();
    const {collection} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const subcategories = getSubCategoriesData();
    const categories = getCategoriesData();

    const category = categories.find(item => item.value === collection) ? collection : "";
    const subcategory = subcategories.find(item => item.value === collection) ? collection : "";
    const {updateProducts} = useUpdateProducts(category, subcategory, "");
    const updateProductsAndFilters = () => {

        return updateProducts()
            .then(resp => {
                dispatch(setColorsCount(resp));
                dispatch(setCategoriesCount(resp));
                dispatch(setAvailabilityCount(resp));
                dispatch(setCategoryColors(resp));
                return resp;
            });
    }


    useEffect(() => {
        dispatch(setCategory(category));
        dispatch(setSubcategory(category));
        setSearchParams("");
        updateProductsAndFilters()
            .then(resp => {
                const minPrice = getMinPrice(resp);
                const maxPrice = getMaxPrice(resp);
                dispatch(setMinPrice(minPrice));
                dispatch(setMaxPrice(maxPrice));
                dispatch(setPriceRange([minPrice, maxPrice]));
            })

    }, [collection]);

    useEffect(() => {

        if (searchParams.size === 0) {
            dispatch(clearAllFilters());
            dispatch(setSearchParamsStr(""));
            updateProductsAndFilters();
        }
    }, [searchParams]);


    return (
        <ul className={style.Products}>
            {
                products.map(product => <ProductCard currentProduct={product} key={product.id}/>)
            }
        </ul>
    )
}