import {Carousel} from '../../Components/Carousel/Carousel';
import style from './MainPage.module.scss';
import {getMainPageData} from "../../data/dataFunctions";
import {NavLink} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import mainStyles from "../../index.module.scss";

export function MainPage() {
    const pageData = getMainPageData();

    return (
        <main className={style.MainPage}>
            <Carousel/>
            {/*-------- Categories section --------*/}
            <section className={style.section_categories}>
                <div className={`${mainStyles.container} ${style.categories_container}`}>
                    <ul className={style.categories_list}>
                        {pageData.categories.map(category => {
                            return (
                                <li key={category.id} className={style.categories_list_item}>
                                    <NavLink to={category.path} className={style.categories_list_link}>
                                        <div className={style.img_wrapper}>
                                            <img src={require(`../../assets/categories/${category.img}`)}
                                                 alt={category.name} className={style.category_img}/>
                                        </div>
                                        <button className={style.category_btn}>
                                            <span className={style.category_name}> {category.name}</span>
                                            <ArrowForwardIosIcon fontSize="small"/>
                                        </button>
                                    </NavLink>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </section>
            {/*-------- Earbuds section --------*/}
            <section className={style.section_earbuds}>
                <div className={`${mainStyles.container} ${style.earbuds_container}`}>
                    <div className={style.earbuds_info}>
                        <h2 className={style.earbuds_tittle}>{pageData.earbuds.tittle}</h2>
                        <h3 className={style.earbuds_heading}>{pageData.earbuds.heading}</h3>
                        <p className={style.earbuds_description}>{pageData.earbuds.description}</p>
                        <div className={style.earbuds_buttons_wrapper}>
                            <NavLink to={pageData.earbuds.buttons.left.path}>
                                <button
                                    className={style.earbuds_button_left}>{pageData.earbuds.buttons.left.text}</button>
                            </NavLink>
                            <NavLink to={pageData.earbuds.buttons.right.path}>
                                <button
                                    className={style.earbuds_button_right}>{pageData.earbuds.buttons.right.text}</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className={style.earbuds_imgs}>
                        {
                            pageData.earbuds.images.map(img => {
                                    return (
                                        <div key={img.id} className={style.earbuds_img_wrapper}>
                                            <img src={require(`../../assets/earbuds_section/${img.name}`)} alt={img.name}
                                                 className={style.earbuds_img}/>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </section>
            {/*-------- Earbuds section --------*/}
            <section className={style.section_brands}>
                <div className={`${mainStyles.container} ${style.brands_container}`}>
                    {pageData.brands.map(brand => {
                        return (
                            <img
                                src={require(`../../assets/brands/${brand.img}`)}
                                alt="brand icon"
                                key={brand.id}
                                className={style.brand_img}/>
                        )
                    })
                    }
                </div>
            </section>
        </main>


    )
}