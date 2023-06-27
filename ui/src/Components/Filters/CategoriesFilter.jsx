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
import {setAvailabilityCount, setColorsCount, setSearchParamsStr} from "../../data/redux/reducers/filtersSlice";

export function CategoriesFilter({filter, handleChangeSearchParams, handleUpdateProducts, categoriesFilters}) {
    const filters = getFiltersData();
    const categories = Object.keys(filter.options);
    const {collection} = useParams();
    const categoriesCount = useSelector(state => state.filters.categoriesCount);
    const dispatch = useDispatch();
    const [categoriesFilter, setCategoriesFilter] = useState(false);
    const searchParamsStr = useSelector(state => state.filters.searchParamsStr);


    useEffect(() => {
        categoriesFilter && handleFilterByCategory();
    }, [categoriesFilter]);

    const handleFilterByCategory = () => {
        handleUpdateProducts()
            .then(resp => {
                dispatch(setColorsCount(resp));
                dispatch(setAvailabilityCount(resp));
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
                                              checked={!searchParamsStr ? false : categoriesFilters.includes(item)}
                                              disabled={!count}
                                              onChange={(e) => {
                                                  handleChangeSearchParams("categories_like", item, e.target.checked);
                                                  setCategoriesFilter(uuidv4());
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
