import style from "./ProductsPage.module.scss";
import mainStyles from "../../../index.module.scss";
import {Filters} from "../../Filters/Filters";
import {Sort} from "../../Sort/Sort";
import {ActiveFilters} from "../../Filters/ActiveFilters/ActiveFilters";
import {Products} from "../../Products/Products";
import {useState} from "react";
import {
    IconButton,
    Drawer,
    Hidden,
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export function ProductsPage() {
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
        <main className={style.ProductsPage}>
            <div className={`${mainStyles.container} ${style.productsPage_container}`}>
                <Hidden mdDown >
                    <Filters className={style.filters}/>
                </Hidden>
                <Hidden>
                    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} >
                        <Filters className={style.filters_drawer} onClick={toggleDrawer(false)}/>
                    </Drawer>
                </Hidden>                
                <div className={style.sort_and_filters_wrapper}>
                    <Hidden mdUp>
                        <IconButton className={style.filters} onClick={toggleDrawer(true)} >
                            <FilterAltIcon/> 
                        </IconButton> 
                    </Hidden>
                    <ActiveFilters className={style.currentFilters}/>
                    <Sort className={style.sort}/>
                </div>
                <Products/>
            </div>
        </main>
    )
}