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
import {setFilteredProducts} from "../../../data/redux/reducers/filtersSlice";


export function ProductsPage() {
    // const products = useSelector(state => state.shop.products);
    const products = useSelector(state => state.filters.filteredProducts);
    const dispatch = useDispatch();
    const {category} = useParams();
    const [searchParams] = useSearchParams();
    const paramsString = searchParams.toString();

    useEffect(() => {

        getProducts(category || "", paramsString)
            .then(resp => {
                dispatch(setProducts(resp)); // paginate
                dispatch(setFilteredProducts(resp));
            });

    }, [category]);


    return (
        <main className={style.ProductsPage}>
            <div className={`${mainStyles.container} ${style.productsPage_container}`}>
                <Filters category={category} className={style.filters}/>
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