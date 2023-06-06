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
import {v4 as uuidv4} from 'uuid';


export function ProductCard({product}) {
    const productData = getProductCardData();
    const colorsToShow = 4;
    const navigate = useNavigate();

    function showMoreHandler(id) {
        navigate(`/product/${id}`);
    }

    return (
        <li className={style.ProductCard} onClick={() => {
            showMoreHandler(product.id)
        }}>
            <div className={style.img_wrapper}>
                <img className={style.product_img} src={require(`../../assets/products/${product.images.main}`)}
                     alt=""/>
                <div className={style.labels_wrapper}>
                    {(product.oldPrice !== product.price) &&
                        <div className={style.sale_label}>{productData.labels.sale}</div>}
                    {product.customerPick &&
                        <div className={style.customer_pick_label}>{productData.labels.customerPick}</div>}
                    {!product.onStock && <div className={style.sold_out_label}>{productData.labels.soldOut}</div>}
                </div>
                <FavoriteBorderIcon color="color_accent_3" fontSize="medium" className={style.favourite_icon}/>
                {/*<FavoriteIcon color="color_accent_3" fontSize="medium" className={style.favourite_icon}/>*/}
                <AddBoxIcon color="color_accent_1" fontSize="large" className={style.add_to_cart_icon}/>
            </div>
            <div>{product.name}</div>
            <div className={style.product_price_wrapper}>
                <div className={style.product_current_price}>{`$${product.price}`}</div>
                {(product.oldPrice !== product.price) &&
                    <div className={style.product_old_price}>{`$${product.oldPrice}`}</div>}
            </div>
            <Rating name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    size="small"
            />
            <div className={style.colors_wrapper}>
                {(product.colors.length > 1) && product.colors.map((color, i) => {
                    if (i < colorsToShow) {
                        return (
                            <Tooltip title={color} key={uuidv4()}>
                                <IconButton size="small">
                                    <CircleIcon color={color} fontSize="medium"/>
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