import style from "./ProductPage.module.scss";
import mainStyles from "../../index.module.scss";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProduct} from "../../api/api";
import {ProductCarousel} from "../../Components/ProductCarousel/ProductCarousel";
import * as React from "react";
import {getProductCardData} from "../../data/dataFunctions";
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


export function ProductPage() {
    let {productId} = useParams();
    let [product, setProduct] = useState(null);
    const productData = getProductCardData();

    useEffect(() => {
        getProduct(productId)
            .then((resp) => setProduct(resp))
    }, [productId]);


    return (
        product && <main className={style.Product}>
            <div className={`${mainStyles.container} ${style.productPage_container}`}>
                <div className={style.product_card}>
                    <div className={style.images_wrapper}>
                        {
                            product.images.list.length > 0 &&
                            <div className={style.carousel_wrapper}>
                                <ProductCarousel images={product.images.list}/>
                            </div>
                        }
                        <div className={style.main_img_wrapper}>
                            <img src={require(`../../assets/products/${product.images.main}`)} alt="product img"
                                 className={style.main_img}/>
                        </div>
                    </div>
                    <div className={style.product_info}>
                        <h2 className={style.product_tittle}>{product.name}</h2>
                        <div className={style.price_and_labels_wrapper}>
                            <div className={style.product_price_wrapper}>
                                <div className={style.product_current_price}>{`$${product.price}`}</div>
                                {(product.oldPrice !== product.price) &&
                                    <div className={style.product_old_price}>{`$${product.oldPrice}`}</div>}
                            </div>
                            <div className={style.labels_wrapper}>
                                {(product.oldPrice !== product.price) &&
                                    <div className={style.sale_label}>{productData.labels.sale}</div>}
                                {product.customerPick &&
                                    <div className={style.customer_pick_label}>{productData.labels.customerPick}</div>}
                                {!product.onStock &&
                                    <div className={style.sold_out_label}>{productData.labels.soldOut}</div>}
                            </div>

                        </div>
                        <div className={style.rating_wrapper}>
                            <Rating name="half-rating-read"
                                    defaultValue={product.rating}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                            />
                            <div
                                className={style.total_reviews}>{`(${product.reviews.length} ${productData.reviews.text})`}</div>
                        </div>
                        <p className={style.product_description}>{product.description}</p>
                        {
                            product.images.list.length > 1 && <div className={style.colors_wrapper}>
                                <p className={style.color_text}>{`${productData.colorText} ${product.images.list[1].name}`}</p>
                                <div className={style.colors_wrapper}>
                                    {(product.colors.length > 1) && product.colors.map((color, i) => {
                                        return (
                                            <Tooltip title={color} key={uuidv4()}>
                                                <IconButton size="medium">
                                                    <CircleIcon color={color} fontSize="large"/>
                                                </IconButton>
                                            </Tooltip>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        <div className={style.buttons_group}>
                            <button className={style.product_add_btn}>{productData.buttons.add}</button>
                            <button className={style.product_favourite_btn}>{productData.buttons.favourite}</button>
                        </div>
                        <div className={style.services_wrapper}>
                            {
                                productData.services.map(item => {
                                        return (
                                            <div className={style.product_service_wrapper} key={item.id}>
                                                <img src={require(`../../assets/product_services/${item.img}`)}
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
                                    <Accordion className={style.product_accordion} key={uuidv4()}>
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


                </div>
            </div>

        </main>
    )
}