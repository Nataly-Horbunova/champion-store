import style from "./Filters.module.scss"
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import {v4 as uuidv4} from "uuid";
import {useParams, useSearchParams} from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {getFiltersData} from "../../data/dataFunctions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    removeCategoriesFilter,
    setAvailabilityCount,
    setCategoriesCount, setCategoriesFilter,
    setColorsCount, setPageNumber
} from "../../data/redux/reducers/filtersSlice";

export function CategoriesFilter({filter, handleChangeSearchParams, updateProducts, categoriesFilters}) {
    const filters = getFiltersData();
    const categories = Object.keys(filter.options);
    const {collection} = useParams();
    const categoriesCount = useSelector(state => state.filters.categoriesCount);
    const currentFilter = useSelector(state => state.filters.categoriesFilter);
    const pageNumber = useSelector(state => state.filters.pageNumber);
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        flag && handleFilterByCategory();
            }, [flag, checked]);

    const handleFilterByCategory = () => {
        updateProducts()
            .then(resp => {
                console.log('category');
                dispatch(setColorsCount(resp));
                dispatch(setAvailabilityCount(resp));
                !checked && categoriesFilters.length === 0 && dispatch(setCategoriesCount(resp));
            })
    }

    if (categories.includes(collection)) return;

    return (
        <Accordion className={style.filter_accordion} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={style.filter_tittle}>{filters.productType.tittle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {
                        categories.map(item => {
                            const count = categoriesCount[item] ? categoriesCount[item] : 0;

                            return (
                                <FormControlLabel key={uuidv4()} control={
                                    <Checkbox color="main_text_color"
                                              value={item}
                                              checked={categoriesFilters.includes(item) && currentFilter.includes(item)}
                                              disabled={!count && !categoriesFilters.includes(item)}
                                              onChange={(e) => {
                                                  pageNumber > 1 && dispatch(setPageNumber(1));
                                                  handleChangeSearchParams("categories_like", item, e.target.checked, categoriesFilters);
                                                  setFlag(uuidv4());
                                                  setChecked(e.target.checked);
                                                  e.target.checked ? dispatch(setCategoriesFilter(item)) : dispatch(removeCategoriesFilter(item));
                                              }
                                              }/>
                                } label={
                                    <div className={style.filter_label_wrapper}>
                                        <span className={style.filter_text}>{filter.options[item].name}</span>
                                        <span className={style.filter_qty}>{count}</span>
                                    </div>
                                }/>
                            )
                        })
                    }
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    )
}
