import style from './FavouritesPage.module.scss';
import mainStyles from "../../../index.module.scss";
import {ProductCard} from '../../ProductCard/ProductCard'
import { useSelector } from 'react-redux';
import {useEffect} from "react";
import {useUpdateProducts} from "../../../core/hooks";
import {ProductsPreloader} from "../../Common/Preloaders/ProductsPreloader";
import {getFavouritesData} from "../../../data/dataFunctions";

export function FavouritesPage () {
const favouritesIds = useSelector(state => state.favourites.favouritesProducts);
const {products, loading} = useSelector(state => state.shop);
const favouritesProducts = products.filter(item => favouritesIds.includes(item.id));
const favouritesData = getFavouritesData();

const {updateAllProducts} = useUpdateProducts();

useEffect(() => {
    updateAllProducts();
}, []);


    return (
        <main className={style.FavouritesPage}>
            <div className={mainStyles.container}>
                <h1 className={style.favourites_title}>{favouritesData.title}</h1>
                {
                    loading ? (
                        <ProductsPreloader/>
                    ) : (
                        <ul className={style.favourites_list}>
                        {favouritesProducts.map(item => (
                            <ProductCard currentProduct={item} key={item.id}></ProductCard>
                        ))}
                    </ul>
                    )
                }
            </div>
        </main>
    )
}