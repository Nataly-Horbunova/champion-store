import style from "./ProductInCart.module.scss";
import {Counter} from "../Counter/Counter";
import {useDispatch} from "react-redux";
import {changeCount, removeFromCart} from "../../data/redux/reducers/cartSlice";
import {useState} from "react";
import {getCartData} from "../../data/dataFunctions";

export function ProductInCart({product}) {
    const dispatch = useDispatch();
    let [count, setCount] = useState(product.count);
    const cartData = getCartData();

    const handleIncrementCount = () => {
        dispatch(changeCount({product, count: count + 1}));
        setCount(count + 1);
    };

    const handleDecrementCount = () => {
        if (count > 1) {
            dispatch(changeCount({product, count: count - 1}));
            setCount(count - 1)
        }
    };

    const handleChangeCount = (e) => {
        const value = Number(e.target.value);

        if (isNaN(value)) {
            setCount(1);
            dispatch(changeCount({product, count: 1}));
        } else {
            setCount(value);
            dispatch(changeCount({product, count: value}));
        }
    }

    const handleRemoveProductOnBlur = (e) => {
        const value = Number(e.target.value);

        if (value === 0) {
            setCount(0);
            dispatch(removeFromCart(product.id));
        }
    }


    const handleRemoveProduct = () => {
        dispatch(removeFromCart(product.id));
    }


    return (
        <li className={style.ProductInCart}>
            <div className={style.image_and_info_wrapper}>
                <div className={style.image_wrapper}>
                    <img src={require(`../../assets/products/${product.currentImage.imageName}`)} alt="ProductInCart"
                         className={style.product_img}/>
                </div>
                <div className={style.product_info}>
                    <h3 className={style.product_name}>{product.name}</h3>
                    <div className={style.product_price}>{`$${product.price}`}</div>
                    {product.colors.length > 1 &&
                        <div
                            className={style.product_color}>{`${cartData.colorText} ${product.currentImage.color}`}</div>}
                </div>
            </div>
            <div className={style.counter}>
                <Counter
                    count={count}
                    incrementCount={handleIncrementCount}
                    decrementCount={handleDecrementCount}
                    changeCount={handleChangeCount}
                    removeOnBlur={handleRemoveProductOnBlur}
                />
                <div className={style.remove_btn} onClick={handleRemoveProduct}>{cartData.removeBtn}</div>
            </div>
            <div className={style.total_product_amount}>
                {`$${product.price * product.count}`}
            </div>

        </li>
    )

}