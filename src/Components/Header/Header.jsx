import mainStyles from '../../index.module.scss';
import style from './Header.module.scss';
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {getHeaderData} from '../../data/dataFunctions';
import {useSelector} from "react-redux";
import {
    Badge,
    IconButton,
    Drawer,
    List,
    ListItem,
    Hidden,
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
import {ProductsSearch} from "./ProductsSearch";

export function Header() {
    const headerData = getHeaderData();
    const logoBlack = require(`../../assets/${headerData.logo.black}`);
    const logoWhite = require(`../../assets/${headerData.logo.white}`);
    const cart = useSelector(state => state.cart.cartProducts);
    const favourites = useSelector(state => state.favourites.favouritesProducts);

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

    const [open, setOpen] = useState(false);

    const toggleDrawer = (isOpen) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(isOpen);
    };

    return (
        <header className={`${style.Header} ${scrollDown ? style.scroll : ""}`}>
            <div className={`${mainStyles.container} ${style.menu_container}`}>
                {/* ----------- Burger menu icon -------- */}
                <Hidden mdUp>
                    <IconButton onClick={toggleDrawer(true)} >
                        <MenuIcon className={`${style.burger_menu} ${scrollDown ? style.scroll : ""}`}></MenuIcon>
                         
                    </IconButton>
                </Hidden>
                {/* --------------- Main menu --------- */}
                <Hidden mdDown>
                    <nav className={style.header_nav}>
                        <ul className={style.header_nav_list}> {
                            headerData.menu.map(item => {
                                return (
                                    <li key={item.id}
                                        className={style.header_nav_list_item}
                                        onMouseEnter={item.name === "Shop" ? handleShowDropDown : handleHideDropDown}
                                        onClick={() => {
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
                                                        headerData.dropDown.categories.map(collection => {
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
                                                        headerData.dropDown.subcategories.map(filter => {
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
                </Hidden>
                {/* --------------- Drawer menu -------- */}
                <Hidden >
                    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} >
                        <List sx={{ width: 250, mt: "20px"}} onClick={toggleDrawer(false)}>{
                            headerData.menu.map(item => {
                                return (
                                    <ListItem onClick={toggleDrawer(false)} key={item.id}>
                                        <NavLink to={item.path}>
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </ListItem>
                                )
                            })
                        }
                        </List>
                    </Drawer>
                </Hidden>
                {/* ------------------ Logo -------------------- */}
                <NavLink to="/" className={style.logo_wrapper}>
                    <img src={scrollDown ? logoBlack : logoWhite} alt="logo"
                         className={style.logo_img}/>
                </NavLink>
                {/* --------------------- Icons ------------------- */}
                <div className={style.icons_wrapper}>
                    <ProductsSearch scrollDown={scrollDown}/>
                    <NavLink to='favourites' className={style.icon_wrapper}>
                        <Badge badgeContent={favourites.length} color="color_accent_1" className={style.icon_badge}>
                            <FavoriteBorderOutlinedIcon 
                                className={`${style.icon} ${scrollDown ? style.scroll : ""}`}></FavoriteBorderOutlinedIcon>
                        </Badge>
                    </NavLink>
                    <NavLink to='cart' className={style.icon_wrapper}>
                        <Badge badgeContent={cart.length} color="color_accent_1" className={style.icon_badge}>
                            <LocalMallOutlinedIcon 
                                className={`${style.icon} ${scrollDown ? style.scroll : ""}`}></LocalMallOutlinedIcon>
                        </Badge>
                    </NavLink>

                </div>
            </div>

        </header>
    )
}
