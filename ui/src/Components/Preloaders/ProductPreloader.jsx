import style from './Preloaders.module.scss';
import {Skeleton} from "@mui/material";

export const ProductPreloader = () => {
    return (
        <div className={style.ProductPreloader}>
            <div className={style.imgPreloader}>
                <Skeleton variant="rectangular" width="100%" height={350}/>
            </div>
            <div className={style.descriptionPreloader}>
                <Skeleton variant="rectangular" width="100%" height={40}/>
                <Skeleton variant="rectangular" width="60%" height={30}/>
                <Skeleton variant="rectangular" width="40%" height={20}/>
                <div className={style.infoPreloader}>
                    {Array.from(new Array(12)).map((item, index) => <Skeleton width="100%" key={index}/>)}
                </div>
            </div>
        </div>
    )
}
