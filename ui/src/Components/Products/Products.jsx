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
    setColorsCount,
    setSearchParamsStr,
    setSubcategory
} from "../../data/redux/reducers/filtersSlice";
import {useUpdateProducts} from "../../core/hooks";


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
        updateProducts()
            .then(resp => {
                dispatch(setColorsCount(resp));
                dispatch(setCategoriesCount(resp));
                dispatch(setAvailabilityCount(resp));
                dispatch(setCategoryColors(resp));
            });
    }


    useEffect(() => {
        dispatch(setCategory(category));
        dispatch(setSubcategory(category));
        setSearchParams("");
        updateProductsAndFilters();

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