import mainStyles from '../../index.module.scss';
import style from './Header.module.scss';
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {getHeaderData} from '../../data/dataFunctions';

export function Header() {
    const headerData = getHeaderData();
    const logoBlack = require(`../../assets/${headerData.logo.black}`);
    const logoWhite = require(`../../assets/${headerData.logo.white}`);

    let [scrollDown, setScrollDown] = useState(false);
    let [isDropDownOpen, setIsDropDownOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const isScrollDown = window.scrollY > 0;
            setScrollDown(isScrollDown);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const handleShowDropDown = () => {
        setIsDropDownOpen(true);
    };

    const handleHideDropDown = () => {
        setIsDropDownOpen(false);
    };

    const handleScrollToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <header className={`${style.Header} ${scrollDown ? style.scroll : ""}`}>
            <div className={`${mainStyles.container} ${style.menu_container}`}>
                <nav className={style.header_nav}>
                    <ul className={style.header_nav_list}> {
                        headerData.menu.map(item => {
                            return (
                                <li key={item.id}
                                    className={style.header_nav_list_item}
                                    onMouseEnter={item.name === "Shop" ? handleShowDropDown : handleHideDropDown}
                                    onClick={()=> {
                                        handleHideDropDown();
                                        handleScrollToTop();
                                    }}>
                                    <NavLink to={item.path}
                                             className={`${style.header_nav_link} ${scrollDown ? style.scroll : ""}`}>
                                        <span>{item.name}</span>
                                        {item.name === "Shop" ? <KeyboardArrowDownIcon fontSize="small"/> : ''}
                                    </NavLink>
                                    {/*// --------- DropDown----------*/}
                                    {isDropDownOpen && (
                                        <div className={style.dropDown}
                                             onMouseLeave={handleHideDropDown}
                                             onMouseEnter={handleShowDropDown}>
                                            <div className={`${mainStyles.container} ${style.dropdown_container}`}>
                                                <ul className={style.collections_list}> {
                                                    headerData.dropDown.collections.map(collection => {
                                                        return (
                                                            <li key={collection.id}
                                                                className={style.dropdown_list_item}>
                                                                <NavLink to={collection.path}
                                                                         className={style.dropdown_link}
                                                                         onClick={handleHideDropDown}>
                                                                    {collection.name}
                                                                </NavLink>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                                <ul className={style.filters_list}> {
                                                    headerData.dropDown.filters.map(filter => {
                                                        return (
                                                            <li key={filter.id}
                                                                className={style.filter_list_item}>
                                                                <NavLink to={filter.path}
                                                                         className={style.filter_link}
                                                                         onClick={handleHideDropDown}>
                                                                    <div className={style.filter_img_wrapper}>
                                                                        <img
                                                                            src={require(`../../assets/dropdown/${filter.img}`)}
                                                                            alt={filter.name}/>
                                                                    </div>
                                                                    <div className={style.filter_name_wrapper}>
                                                                        <span>{filter.name}</span>
                                                                        <KeyboardArrowRightIcon fontSize="small"/>
                                                                    </div>
                                                                </NavLink>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            )
                        })
                    }
                    </ul>
                </nav>

                <NavLink to="/" className={style.logo_wrapper}>
                    <img src={scrollDown ? logoBlack : logoWhite} alt="logo"
                         className={style.logo_img}/>
                </NavLink>

                <div className={style.icons_wrapper}>
                    <div className={style.icon_wrapper}>
                        <SearchIcon className={`${style.icon} ${scrollDown ? style.scroll : ""}`}></SearchIcon>
                    </div>
                    <NavLink to='favourites' className={style.icon_wrapper}>
                        <FavoriteBorderOutlinedIcon
                            className={`${style.icon} ${scrollDown ? style.scroll : ""}`}></FavoriteBorderOutlinedIcon>
                    </NavLink>
                    <NavLink to='cart' className={style.icon_wrapper}>
                        <LocalMallOutlinedIcon
                            className={`${style.icon} ${scrollDown ? style.scroll : ""}`}></LocalMallOutlinedIcon>
                    </NavLink>
                </div>
            </div>

        </header>
    )
}
