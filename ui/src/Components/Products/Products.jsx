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
    setSearchParamsStr, setSearchValue, setSortValue,
    setSubcategory
} from "../../data/redux/reducers/filtersSlice";
import {useUpdateProducts} from "../../core/hooks";
import {getMaxPrice, getMinPrice} from "../../core/utils";
import {ProductPagination} from "./ProductPagination";
import { ProductsPreloader} from "../Preloaders/ProductsPreloader";

export const Products = () => {
    const {searchParamsStr, pageNumber, sortValue, searchValue} = useSelector(state => state.filters);
    const {productsPerPage, loading, error} = useSelector(state => state.shop);

    const dispatch = useDispatch();
    const {collection} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const subcategories = getSubCategoriesData();
    const categories = getCategoriesData();
    const category = categories.find(item => item.value === collection) ? collection : "";
    const subcategory = subcategories.find(item => item.value === collection) ? collection : "";
    const {updateAllProducts, updateProductsPerPage} = useUpdateProducts();
    // console.log(searchValue)

    const updateFilters = (products) => {
        if (!products) return;

        dispatch(setColorsCount(products));
        dispatch(setCategoriesCount(products));
        dispatch(setAvailabilityCount(products));
        dispatch(setCategoryColors(products));
        const minPrice = products.length > 0 ? getMinPrice(products) : 0;
        const maxPrice = products.length > 0 ? getMaxPrice(products) : 0;
        dispatch(setMinPrice(minPrice));
        dispatch(setMaxPrice(maxPrice));
        dispatch(setPriceRange([minPrice, maxPrice]));
    }

    const resetProductsAndFilters = () => {
        updateProductsPerPage(category, subcategory, "", pageNumber);
        return updateAllProducts(category, subcategory, "")
            .then(resp => {
                updateFilters(resp);
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
        if (searchValue) return;
        dispatch(setSearchValue(''));
        // console.log('products collection');
        dispatch(setCategory(category));
        dispatch(setSubcategory(category));
        setSearchParams("");
        dispatch(setPageNumber(1));
        dispatch(setSortValue(""));
        resetProductsAndFilters();
    }, [collection]);


    useEffect(() => {
        // console.log('products search');
        if (searchValue) {
            updateProductsPerPage(category, subcategory, searchParamsStr, pageNumber);
            updateAllProducts(category, subcategory, searchParamsStr)
                .then(resp => {
                    updateFilters(resp);
                });
            dispatch(clearAllFilters());
            dispatch(setPageNumber(1));
            dispatch(setSortValue(""));
        }
    }, [searchValue]);

    useEffect(() => {

        if (searchParams.size === 0) {
            // console.log('products search params')
            dispatch(clearAllFilters());
            dispatch(setSearchParamsStr(""));
            resetProductsAndFilters();
        }
    }, [searchParams]);

    return (

        <div className={style.Products}>
            {loading ? (
                <ProductsPreloader/>
            ) : error ? (
                    <div>{error}</div>
                ) : (
                <>
                    <ul className={style.products_list}>
                        {productsPerPage.map((product) => (
                            <ProductCard currentProduct={product} key={product.id}/>
                        ))}
                    </ul>
                    <ProductPagination/>
                </>
                )}
        </div>
    )
}