import style from './FavouritesPage.module.scss';
import mainStyles from "../../../index.module.scss";
import { ProductCard } from '../../ProductCard/ProductCard'
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useUpdateProducts } from "../../../core/hooks";
import { ProductsPreloader } from "../../Common/Preloaders/ProductsPreloader";
import { getFavouritesData } from "../../../data/dataFunctions";
import { EmptyPage } from '../EmptyPage/EmptyPage';

export function FavouritesPage() {
    const favouritesIds = useSelector(state => state.favourites.favouritesProducts);
    const { products, loading } = useSelector(state => state.shop);
    const favouritesProducts = products.filter(item => favouritesIds.includes(item.id));
    const favouritesData = getFavouritesData();

    const { updateAllProducts } = useUpdateProducts();

    useEffect(() => {
    updateAllProducts();
    }, []);

    return (
    <>
        {loading ? (
            <main className={style.FavouritesPage}>
                <div className={mainStyles.container}>
                    <h1 className={style.favourites_title}>{favouritesData.title}</h1>
                    <ProductsPreloader />
                </div>
            </main>
        ) : (
        <>
            {favouritesProducts.length > 0 && (
            <main className={style.FavouritesPage}>
                <div className={mainStyles.container}>
                    <h1 className={style.favourites_title}>{favouritesData.title}</h1>
                    <ul className={style.favourites_list}>
                        {favouritesProducts.map(item => (
                        <ProductCard currentProduct={item} key={item.id}></ProductCard>
                        ))}
                    </ul>
                </div>
            </main>
            )}
            {favouritesProducts.length === 0 && (
            <EmptyPage
                tittle={favouritesData.emptyFavourites.tittle}
                text={favouritesData.emptyFavourites.text}
                btn={favouritesData.emptyFavourites.btn}
            />
            )}
        </>
        )}
    </>
    );
}
