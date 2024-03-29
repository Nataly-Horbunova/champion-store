import style from "./ProductPage.module.scss";
import mainStyles from "../../../index.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProductCarousel} from "../../ProductCarousel/ProductCarousel";
import * as React from "react";
import {getProductCardData} from "../../../data/dataFunctions";
import Rating from "@mui/material/Rating";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {v4 as uuidv4} from "uuid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import {ProductPreloader} from "../../Common/Preloaders/ProductPreloader";
import {fetchProductById} from "../../../data/redux/reducers/shopSlice";
import {useDispatch} from "react-redux";
import 'animate.css/animate.min.css';
import { addToFavourites } from "../../../data/redux/reducers/favouritesSlice";
import { removeFromFavourites } from "../../../data/redux/reducers/favouritesSlice";
import {addToCart} from "../../../data/redux/reducers/cartSlice";
import {Counter} from "../../Common/Counter/Counter";

export function ProductPage() {
    let {productId} = useParams();
    let [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavourite, setIsFavourite] = useState(product?.isFavourite);
    const productData = getProductCardData();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProductById(productId))
            .unwrap()
            .then(resp => {
                setProduct(resp);
                setIsFavourite(resp.isFavourite);
            })
            .catch(() => {
                navigate('/error');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId]);

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

    function toggleFavourite() {
        if(isFavourite) {
            dispatch(removeFromFavourites(product));
        } else {
            dispatch(addToFavourites(product));
        }

        setIsFavourite(!isFavourite);
    }

    return (
        <main className={style.Product}>
            <div className={`${mainStyles.container} ${style.productPage_container}`}>
                {
                    loading ?
                        (
                            <ProductPreloader/>
                        ) : (
                            product && <div className={style.product_card}>
                                {/*-------------- Image ------------------*/}
                                <div className={`${style.images_wrapper}  animate__animated animate__fadeIn`}>
                                    {
                                        product.images.length > 1 &&
                                        <div className={style.carousel_wrapper}>
                                            <ProductCarousel product={product} setProduct={setProduct}/>
                                        </div>
                                    }
                                    <div className={style.main_img_wrapper}>
                                        <img src={require(`../../../assets/products/${product.currentImage.imageName}`)}
                                            alt="product img"
                                            className={style.main_img}/>
                                    </div>
                                </div>
                                {/*-------------------- Info ------------*/}
                                <div className={`${style.product_info}  animate__animated animate__fadeIn`} >
                                    <h2 className={style.product_tittle}>{product.name}</h2>
                                    <div className={style.price_and_labels_wrapper}>
                                        <div className={style.product_price_wrapper}>
                                            <div className={style.product_current_price}>{`$${product.price.toFixed(2)}`}</div>
                                            {(product.oldPrice !== product.price) &&
                                                <div
                                                    className={style.product_old_price}>{`$${product.oldPrice.toFixed(2)}`}</div>}
                                        </div>
                                        {/* ------------- Labels ---------*/}
                                        <div className={style.labels_wrapper}>
                                            {(product.oldPrice !== product.price) &&
                                                <div className={style.sale_label}>{productData.labels.sale}</div>}
                                            {product.customerPick &&
                                                <div
                                                    className={style.customer_pick_label}>{productData.labels.customerPick}</div>}
                                            {!product.onStock &&
                                                <div className={style.sold_out_label}>{productData.labels.soldOut}</div>}
                                        </div>
                                    </div>
                                    {/* ------------- Rating -------------*/}
                                    <div className={style.rating_wrapper}>
                                        <Rating name="half-rating-read"
                                                defaultValue={product.rating}
                                                precision={0.5}
                                                readOnly
                                                size="small"/>
                                        <div
                                            className={style.total_reviews}>{`(${product.reviews.length} ${productData.reviews.text})`}</div>
                                    </div>

                                    <p className={style.product_description}>{product.description}</p>

                                    {/* ------------- Colors ----------*/}
                                    {
                                        product.images.length > 1 && <div className={style.colors_wrapper}>
                                            <p className={style.color_text}>{`${productData.colorText} ${product.images[1].color}`}</p>
                                            <div className={style.colors_wrapper}>
                                                {(product.images.length > 1) && product.images.map((item, i) => {
                                                    return (
                                                        <Tooltip title={item.color} key={item.id}>
                                                            <IconButton size="medium"
                                                                        onClick={() => setProduct({
                                                                            ...product,
                                                                            currentImage: item
                                                                        })}>
                                                                <CircleIcon color={item.color} fontSize="large"
                                                                            className={item.id === product.currentImage.id ? `${style.selected}` : ""}
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    }
                                    {/*  ------------- Form ------------*/}
                                    <form onSubmit={handleSubmit} className={style.product_form}>
                                        <Counter count={count} changeCount={handleChangeCount} decrementCount={handleDecrementCount} incrementCount={handleIncrementCount}/>
                                        <div className={style.buttons_group}>
                                        <button type="submit"
                                            className={style.product_add_btn}>
                                            {productData.buttons.add}
                                        </button>
                                        <button type="button" 
                                            className={style.product_favourite_btn}
                                            onClick={toggleFavourite}>
                                             {isFavourite ? productData.buttons.removeFromFavourites : productData.buttons.favourite}                                            
                                        </button>
                                    </div>
                                    </form>

                                    {/* --------------- Services --------------*/}
                                    <div className={style.services_wrapper}>
                                        {
                                            productData.services.map(item => {
                                                    return (
                                                        <div className={style.product_service_wrapper} key={item.id}>
                                                            <img src={require(`../../../assets/product_services/${item.img}`)}
                                                                 alt="service icon"
                                                                 className={style.product_service_img}/>
                                                            <span className={style.product_service_name}>{item.name}</span>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    <div>
                                        {product.additionalInfo.map(item => {
                                            return (
                                                <Accordion className={style.product_accordion} key={uuidv4()} defaultExpanded>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography
                                                            className={style.additional_info_tittle}>{item.tittle}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography
                                                            className={style.additional_info_description}>  {item.description} </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>)
                }
            </div>

        </main>
    )
}