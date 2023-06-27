import style from "./ProductsPage.module.scss";
import mainStyles from "../../../index.module.scss";
import {useEffect} from "react";
import {getProducts} from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import {setProducts} from "../../../data/redux/reducers/shopSlice";
import {Filters} from "../../Filters/Filters";
import {ProductCard} from "../../ProductCard/ProductCard";
import {Sort} from "../../Sort/Sort";
import {CurrentFilters} from "../../CurrentFilters/CurrentFilters";
import {
    setAvailabilityCount,
    setCategoriesCount, setCategory,
    setColorsCount,
    setFilteredProducts, setSubcategory
} from "../../../data/redux/reducers/filtersSlice";
import {getCategoriesData, getSubCategoriesData} from "../../../data/dataFunctions";


export function ProductsPage() {
    // const products = useSelector(state => state.shop.products);
    const products = useSelector(state => state.filters.filteredProducts);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);
    const dispatch = useDispatch();
    const {collection} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();


    const subcategories = getSubCategoriesData();
    const categories = getCategoriesData();

    const category = categories.find(item => item.value === collection) ? collection : "";
    const subcategory = subcategories.find(item => item.value === collection) ? collection : "";


    useEffect(() => {
        dispatch(setCategory(category));
        dispatch(setSubcategory(category))
        console.log('products');

        getProducts(category, subcategory, searchParamsStr)
            .then(resp => {
                dispatch(setProducts(resp)); // paginate
                dispatch(setFilteredProducts(resp));
                dispatch(setColorsCount(resp));
                dispatch(setCategoriesCount(resp));
                dispatch(setAvailabilityCount(resp));
                !searchParamsStr && setSearchParams("");
            });

    }, [collection]);


    return (
        <main className={style.ProductsPage}>
            <div className={`${mainStyles.container} ${style.productsPage_container}`}>
                <Filters className={style.filters}/>
                <div className={style.sort_and_filters_wrapper}>
                    <CurrentFilters className={style.currentFilters}/>
                    <Sort className={style.sort} total={products.length}/>
                </div>
                <ul className={style.products_list}>
                    {
                        products.map(product => <ProductCard currentProduct={product} key={product.id}/>)
                    }
                </ul>

            </div>
        </main>
    )
}