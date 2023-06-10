import style from "./CartPage.module.scss";
import mainStyles from "../../index.module.scss";
import {getCartData} from "../../data/dataFunctions";
import {useNavigate} from "react-router-dom";

export function CartEmptyPage () {
    const cartData = getCartData();
    const navigate = useNavigate();

    function handleNavigate() {
        navigate("/collections")
    }

    return(
        <div className={style.CartEmptyPage}>
            <div className={`${mainStyles.container} ${style.cartEmptyPage_container}`}>
                <p className={style.cart_tittle}>{cartData.emptyCart.tittle}</p>
                <p className={style.cart_text}>{cartData.emptyCart.text}</p>
                <button className={style.shop_btn} onClick={handleNavigate}>{cartData.emptyCart.btn}</button>
            </div>
        </div>
    )
}