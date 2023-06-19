import style from "./ProductCountForm.module.scss"
import * as React from "react";
import {addToCart} from "../../data/redux/reducers/cartSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Counter} from "../Counter/Counter";


export function ProductCountForm({product, productData}) {
    const dispatch = useDispatch();
    let [count, setCount] = useState(1);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addToCart({product, count: Number(count)}));
        setCount(1);
    }

    const handleIncrementCount = () => {
        setCount(count + 1);
    };

    const handleDecrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleChangeCount = (e) => {
        const value = Number(e.target.value);
        if (value < 1) {
            e.target.setCustomValidity("The value must be 1 or more");
        } else {
            e.target.setCustomValidity("");
        }
        setCount((value));
    };



    return (
        <form onSubmit={handleSubmit} className={style.ProductCountForm}>
            <Counter count={count} changeCount={handleChangeCount} decrementCount={handleDecrementCount} incrementCount={handleIncrementCount}/>
            <div className={style.buttons_group}>
                <button type="submit"
                        className={style.product_add_btn}>
                    {productData.buttons.add}
                </button>
                <button className={style.product_favourite_btn}>{productData.buttons.favourite}</button>
            </div>
        </form>
    )
}