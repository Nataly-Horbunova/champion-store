import style from "./ProductsPage.module.scss";
import mainStyles from "../../../index.module.scss";
import {Filters} from "../../Filters/Filters";
import {Sort} from "../../Sort/Sort";
import {ActiveFilters} from "../../Filters/ActiveFilters/ActiveFilters";
import {Products} from "../../Products/Products";

export function ProductsPage() {
    // console.log('products page');

    return (
        <main className={style.ProductsPage}>
            <div className={`${mainStyles.container} ${style.productsPage_container}`}>
                <Filters className={style.filters}/>
                <div className={style.sort_and_filters_wrapper}>
                    <ActiveFilters className={style.currentFilters}/>
                    <Sort className={style.sort}/>
                </div>
                <Products/>
            </div>
        </main>
    )
}