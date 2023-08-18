import style from './ErrorPage.module.scss';
import {useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import {useEffect, useState} from "react";

export const ErrorPage = () => {
    const [currentError, setCurrentError] = useState(null);
    const productsError = useSelector(state => state.shop.error);
    const orderError = useSelector(state => state.cart.error);

    useEffect(() =>{
        setCurrentError(productsError);
    }, [productsError]);

    useEffect(() =>{
        setCurrentError(orderError);
    }, [orderError]);


    return (
        currentError && (
            <main className={style.Error}>
                <h1 className={style.error_status}>{currentError?.responseStatus}</h1>
                <p className={style.error_message}>Opps! {currentError?.message}</p>
                <p className={style.error_text}>Let's go where you need to be.</p>
                <NavLink to='/'>
                    <button className={style.error_btn}>Back to home</button>
                </NavLink>
            </main>
        )
    )
}