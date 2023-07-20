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
    setColorsCount, setMaxPrice, setMinPrice, setPageNumber, setPriceRange,
    setSearchParamsStr, setSortValue,
    setSubcategory
} from "../../data/redux/reducers/filtersSlice";
import {useUpdateProducts} from "../../core/hooks";
import {getMaxPrice, getMinPrice} from "../../core/utils";
import {ProductPagination} from "./ProductPagination";

export const Products = () => {
    console.log('products')
    const productsPerPage = useSelector(state => state.shop.productPerPage);
    const pageNumber = useSelector(state => state.filters.pageNumber);

    const dispatch = useDispatch();
    const {collection} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const subcategories = getSubCategoriesData();
    const categories = getCategoriesData();

    const category = categories.find(item => item.value === collection) ? collection : "";
    const subcategory = subcategories.find(item => item.value === collection) ? collection : "";
    const sortValue = useSelector(state => state.filters.sortValue);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);
    const {updateAllProducts, updateProductsPerPage} = useUpdateProducts();
    const updateProductsAndFilters = () => {
        updateProductsPerPage(category, subcategory, "", pageNumber);
        return updateAllProducts(category, subcategory, "")
            .then(resp => {
                dispatch(setColorsCount(resp));
                dispatch(setCategoriesCount(resp));
                dispatch(setAvailabilityCount(resp));
                dispatch(setCategoryColors(resp));
                return resp;
            });
    }

    useEffect(() => {
        if (sortValue) {
            updateProductsPerPage(category, subcategory, searchParamsStr, pageNumber);
            updateAllProducts(category, subcategory, searchParamsStr);
        }
    }, [sortValue]);

    useEffect(() => {
        updateProductsPerPage(category, subcategory, searchParamsStr, pageNumber);
    }, [pageNumber])


    useEffect(() => {
        dispatch(setCategory(category));
        dispatch(setSubcategory(category));
        setSearchParams("");
        updateProductsAndFilters()
            .then(resp => {
                dispatch(setPageNumber(1));
                const minPrice = getMinPrice(resp);
                const maxPrice = getMaxPrice(resp);
                dispatch(setMinPrice(minPrice));
                dispatch(setMaxPrice(maxPrice));
                dispatch(setPriceRange([minPrice, maxPrice]));
                dispatch(setSortValue(""));
            });
    }, [collection]);

    useEffect(() => {
        if (searchParams.size === 0) {
            dispatch(clearAllFilters());
            dispatch(setSearchParamsStr(""));
            updateProductsAndFilters();
        }
    }, [searchParams]);

    return (
        <>
            <ul className={style.Products}>
                {
                    productsPerPage.map(product => <ProductCard currentProduct={product} key={product.id}/>)
                }
            </ul>
            <ProductPagination/>
        </>
    )
}