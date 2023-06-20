import style from "./Filters.module.scss"
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import {v4 as uuidv4} from "uuid";
import {useParams} from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {getFiltersData} from "../../data/dataFunctions";


export function CategoriesFilter({filter, handleFilterChange, categoriesFilters}) {
    const filters = getFiltersData();
    const categories = Object.keys(filter.options);
    const {category} = useParams();

    if (categories.includes(category)) return;

    return (
        <Accordion className={style.filter_accordion} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={style.filter_tittle}>{filters.productType.tittle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {
                        categories.map(item => {
                            return (
                                <FormControlLabel key={uuidv4()} control={
                                    <Checkbox color="main_text_color"
                                              value={item}
                                              checked={categoriesFilters.includes(item)}
                                              onChange={(e) => handleFilterChange("categories_like", item, e.target.checked)}/>
                                } label={
                                    <div className={style.filter_label_wrapper}>
                                        <span className={style.filter_text}>{filter.options[item].name}</span>
                                        <span className={style.filter_qty}>5</span>
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
