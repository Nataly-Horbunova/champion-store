import style from "./Filters.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import {useParams} from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useSelector} from "react-redux";

export function ColorFilter({filter}) {
    const {category} = useParams();
    const colorsCount = useSelector(state => state.filters.colorsCount);
    // console.log(colorsCount);

    return (

        (filter.categories[category] || !category) &&
        <Accordion className={style.filter_accordion} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={style.filter_tittle}>{filter.tittle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {
                        filter.options.map(item => {
                            if(!colorsCount[item.value]) return;

                            return (
                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            color="main_text_color"
                                            value={item.value}
                                            sx={{
                                                color: `${item.color}`,
                                                '&.Mui-checked': {
                                                    color: `${item.color}`,
                                                },
                                            }}
                                        />
                                    } label={
                                    <div className={style.filter_label_wrapper}>
                                        <span className={style.filter_text}>{item.name}</span>
                                        <span className={style.filter_qty}>{colorsCount[item.value]}</span>
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