import style from './Footer.module.scss';
import mainStyles from "../../index.module.scss";
import {getFooterData} from "../../data/dataFunctions";
import {NavLink} from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export function Footer() {
    const footerData = getFooterData();

    return (
        <footer className={style.Footer}>
            <div className={`${mainStyles.container} ${style.footer_container}`}>
                <div className={style.footer_info_wrapper}>
                    <div className={style.quick_links}>
                        <h4 className={style.quick_links_tittle}>{footerData.quickLinks.tittle}</h4>
                        <ul className={style.quick_links_list}>
                            {footerData.quickLinks.list.map(item => {
                                return (
                                    <li className={style.quick_links_list_item} key={item.id}>
                                        <NavLink to='#' className={style.quick_links_link}>{item.name}</NavLink>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                    <div className={style.socials}>
                        <h4 className={style.socials_tittle}>{footerData.socials.tittle}</h4>
                        <ul className={style.socials_list}>
                            {footerData.socials.list.map(item => {
                                return (
                                    <li className={style.socials_list_item} key={item.id}>
                                        <a href={item.link}
                                           className={style.socials_list_link}
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            <img src={require(`../../assets/socials/${item.img}`)} alt={item.name} className={style.socials_img}/>
                                        </a>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                    <div className={style.reputation}>
                        <h4 className={style.reputation_tittle}>{footerData.reputation.tittle}</h4>
                        <p className={style.reputation_text}>{footerData.reputation.text}</p>
                        <NavLink to={footerData.reputation.path} className={style.reputation_link}>
                            <span>{footerData.reputation.linkName}</span>
                            <KeyboardArrowRightIcon fontSize="small"/>
                        </NavLink>
                    </div>
                    <div className={style.shipping}>
                        <h4 className={style.shipping_tittle}>{footerData.shipping.tittle}</h4>
                        <p className={style.shipping_text}>{footerData.shipping.text}</p>
                        <NavLink to={footerData.shipping.path} className={style.shipping_link}>
                            <span>{footerData.shipping.linkName}</span>
                            <KeyboardArrowRightIcon fontSize="small"/>
                        </NavLink>
                    </div>
                </div>
                <div className={style.payment_systems}>
                    <ul className={style.payment_systems_list}>
                        {footerData.paymentSystems.map(item => {
                            return(
                                <li className={style.payment_systems_list_item} key={item.id}>
                                    <img
                                        src={require(`../../assets/payment_systems/${item.img}`)} alt="credit card"
                                        className={style.payment_systems_img}
                                    />
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
                <div className={style.copyright}>
                    {footerData.copyright}
                </div>

            </div>
        </footer>
    )
}