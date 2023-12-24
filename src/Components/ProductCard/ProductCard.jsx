import style from "./ProductCard.module.scss";
import {getProductCardData} from "../../data/dataFunctions";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addToCart} from "../../data/redux/reducers/cartSlice";
import { addToFavourites } from "../../data/redux/reducers/favouritesSlice";
import { removeFromFavourites } from "../../data/redux/reducers/favouritesSlice";
import 'animate.css/animate.min.css';


export function ProductCard({currentProduct}) {
    const [product, setProduct] = useState(currentProduct);
    const [isFavourite, setIsFavourite] = useState(product.isFavourite);
    const productData = getProductCardData();
    const colorsToShow = 4;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function showMoreHandler(id) {
        navigate(`/product/${id}`);
    }

    function toggleFavourite() {
        if(isFavourite) {
            dispatch(removeFromFavourites(product));
        } else {
            dispatch(addToFavourites(product));
        }

        setIsFavourite(!isFavourite);
    }

    return (
        <li className={`${style.ProductCard} animate__animated animate__fadeIn`} >
            <div className={style.img_wrapper}>
                <img className={`${style.product_img} animate__animated animate__fadeIn`}
                    src={require(`../../assets/products/${product.currentImage.imageName}`)}
                    alt="product"
                    onClick={() => showMoreHandler(product.id)}/>
                <div className={style.labels_wrapper}>
                    {(product.categories.includes('sales')) &&
                        <div className={style.sale_label}>{productData.labels.sale}</div>}
                    {product.categories.includes('customer-pick') &&
                        <div className={style.customer_pick_label}>{productData.labels.customerPick}</div>}
                    {!product.inStock && <div className={style.sold_out_label}>{productData.labels.soldOut}</div>}
                </div>

                {!isFavourite ? (
                <FavoriteBorderIcon 
                color="color_accent_3" 
                fontSize="medium" 
                className={style.favourite_icon} 
                onClick = {toggleFavourite}/> ) : (
                <FavoriteIcon 
                color="color_accent_3" 
                fontSize="medium" 
                className={style.favourite_icon} 
                onClick = {toggleFavourite}/>
                )}

                <AddBoxIcon
                    color="color_accent_1"
                    fontSize="large"
                    className={style.add_to_cart_icon}
                    onClick={() => {
                        dispatch(addToCart({product, count: 1}));
                    }
                    }/>
            </div>
            <div onClick={() => showMoreHandler(product.id)} className={style.product_name}>{product.name}</div>
            <div className={style.product_price_wrapper}>
                <div className={style.product_current_price}>{`$${product.price.toFixed(2)}`}</div>
                {(product.oldPrice !== product.price) &&
                    <div className={style.product_old_price}>{`$${product.oldPrice.toFixed(2)}`}</div>}
            </div>
            <Rating name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    size="small"
            />
            <div className={style.colors_wrapper}>
                {(product.images.length > 1) && product.images.map((item, i) => {
                    if (i < colorsToShow) {
                        return (
                            <Tooltip title={item.color} key={item.id}>
                                <IconButton size="small"
                                            onClick={() => {
                                                setProduct({...product, currentImage: item})
                                            }}>
                                    <CircleIcon color={item.color} fontSize="medium"
                                                className={item.id === product.currentImage.id ? `${style.selected}` : ""}/>
                                </IconButton>
                            </Tooltip>
                        )
                    }
                })}
                {
                    (product.colors.length > 4) &&
                    <div className={style.colors_qty}>{`+${product.colors.length - colorsToShow}`}</div>
                }
            </div>
        </li>
    )
}