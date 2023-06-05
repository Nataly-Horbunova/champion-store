import style from "./ProductsPage.module.scss";
import mainStyles from "../../index.module.scss";
import {useEffect} from "react";
import {getProducts} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {setProducts} from "../../data/redux/reducers/shopSlice";
import {Filters} from "../../Components/Filters/Filters";
import {ProductCard} from "../../Components/ProductCard/ProductCard";
import {Sort} from "../../Components/Sort/Sort";


export function ProductsPage() {
    const products = useSelector(state => state.shop.products);
    const dispatch = useDispatch();
    const {category} = useParams();
    const categoryUrl = category ? `?category=${category}` : "";

    useEffect(() => {
        getProducts(categoryUrl)
            .then(resp => dispatch(setProducts(resp)));
    }, [category]);


    return (
        <main className={style.ProductsPage}>
            <div className={`${mainStyles.container} ${style.productsPage_container}`}>
                <Filters category={category} className={style.filters}/>
                <Sort className={style.sort}/>
                <ul className={style.products_list}>
                    {
                        products.map(product => <ProductCard productData={product} key={product.id}/>)
                    }
                </ul>

            </div>
        </main>
    )
}