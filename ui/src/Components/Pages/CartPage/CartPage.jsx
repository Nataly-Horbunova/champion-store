import style from "./CartPage.module.scss";
import {useSelector, useDispatch} from "react-redux";
import mainStyles from "../../../index.module.scss";
import {getCartData} from "../../../data/dataFunctions";
import {v4 as uuidv4} from "uuid";
import {ProductInCart} from "../../ProductInCart/ProductInCart";
import {CartOrderForm} from "../../CartOrderForm/CartOrderForm";
import {CartEmptyPage} from "./CartEmptyPage";
import {setOrderPlaced} from '../../../data/redux/reducers/cartSlice';
import { NavLink } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function CartPage() {
    const cart = useSelector(state => state.cart.cartProducts);
    const cartData = getCartData();
    const totalAmount = getTotalAmount(cart);
    const isOrderPlaced = useSelector(state => state.cart.orderPlaced);
    const dispatch = useDispatch();

    function getTotalAmount(products) {
        return products.reduce((acc, product) => {
            acc += product.price * product.count;
            return acc;
        }, 0)
    }

    function handleClose () {
        dispatch(setOrderPlaced(false));
    }

    return (
        <>
            {cart.length > 0 && <div className={style.CartPage}>
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
                        <CartOrderForm cart={cart} cartData={cartData} totalAmount={totalAmount} />
                    </div>
                </div>
            </div>
            }

            {cart.length === 0 && <CartEmptyPage/> }

{/* ======================= Dialog ====================== */}

            <Dialog className={style.dialog}
                open={isOrderPlaced}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    Thank you for your order!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Our manager will contact you as soon as possible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={style.dialog_actions}>
                <NavLink to='/'>
                    <button className={style.dialog_btn} onClick={handleClose}>Back to home</button>
                </NavLink>
                </DialogActions>
                </Dialog>
        </>

    )
}