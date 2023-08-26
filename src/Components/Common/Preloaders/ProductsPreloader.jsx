import style from './Preloaders.module.scss';
import {Skeleton} from "@mui/material";

export const ProductsPreloader = () => {
    return (
        <div className={style.ProductsPreloader}>
            {Array.from(new Array(12)).map((item, index) => {
                    return (
                        <div key={index} className={style.product_preloader}>
                            <Skeleton variant="rectangular" width={220} height={120}/>
                            <Skeleton width="100%"/>
                            <Skeleton width="60%"/>
                            <Skeleton width="40%"/>
                        </div>
                    )
                }
            )}
        </div>
    )
}


