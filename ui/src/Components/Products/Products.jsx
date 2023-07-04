import style from './Products.module.scss';
import {ProductCard} from "../ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import {getCategoriesData, getSubCategoriesData} from "../../data/dataFunctions";
import {useEffect} from "react";
import {
    setAvailabilityCount,
    setCategoriesCount,
    setCategory,
    setColorsCount,
    setFilteredProducts,
    setSubcategory
} from "../../data/redux/reducers/filtersSlice";
import {getProducts} from "../../api/api";
import {setProducts} from "../../data/redux/reducers/shopSlice";


export const Products = () => {
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
        <ul className={style.Products}>
            {
                products.map(product => <ProductCard currentProduct={product} key={product.id}/>)
            }
        </ul>
    )
}