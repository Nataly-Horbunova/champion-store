import style from "./CartPage.module.scss";
import {useSelector} from "react-redux";
import mainStyles from "../../index.module.scss";
import {getCartData} from "../../data/dataFunctions";
import {v4 as uuidv4} from "uuid";
import {ProductInCart} from "../../Components/ProductInCart/ProductInCart";
import {CartOrderForm} from "../../Components/CartOrderForm/CartOrderForm";

export function CartPage() {
    const cart = useSelector(state => state.cart.cartProducts);
    const cartData = getCartData();
    const totalAmount = getTotalAmount(cart);

    function getTotalAmount(products) {
        return products.reduce((acc, product) => {
            acc += product.price * product.count;
            return acc;
        }, 0)
    }

    return (
        cart && <div className={style.CartPage}>
            <div className={`${mainStyles.container} ${style.cartPage_container}`}>
                <h1 className={style.cart_tittle}>{cartData.tittle}</h1>
                <div className={style.cart_wrapper}>
                    <ul className={style.products_list}>
                        <li className={style.products_list_tittles}>
                            {cartData.subtitles.map(item => {
                                return (
                                    <div key={uuidv4()} className={style.products_list_tittle}>{item}</div>
                                )
                            })}
                        </li>
                        {cart.map(product => <ProductInCart product={product} key={product.id}/>)}
                    </ul>
                    <CartOrderForm cart={cart} cartData={cartData} totalAmount={totalAmount}/>
                </div>
            </div>
        </div>
    )
}