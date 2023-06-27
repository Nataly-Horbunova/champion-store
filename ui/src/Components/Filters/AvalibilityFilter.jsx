import style from "./Filters.module.scss";
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";

export function AvailabilityFilter({filter}) {
const availabilityCount = useSelector(state => state.filters.availabilityCount);

    return (
        <Accordion className={style.filter_accordion} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={style.filter_tittle}>{filter.tittle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {filter.options.map(item => {
                        return (
                            <FormControlLabel key={uuidv4()} control={<Checkbox color="main_text_color" value={item.value}/>} label={
                                <div className={style.filter_label_wrapper}>
                                    <span className={style.filter_text}>{item.name}</span>
                                    <span className={style.filter_qty}>{availabilityCount[item.value]}</span>
                                </div>
                            }/>
                        )
                    })}



                    {/*<FormControlLabel control={<Checkbox color="main_text_color" value={filter.options.inStock.value}/>} label={*/}
                    {/*    <div className={style.filter_label_wrapper}>*/}
                    {/*        <span className={style.filter_text}>{filter.options.inStock.name}</span>*/}
                    {/*        <span className={style.filter_qty}>35</span>*/}
                    {/*    </div>*/}
                    {/*}/>*/}
                    {/*<FormControlLabel control={<Checkbox color="main_text_color" value={filter.options.outOfStock.value}/>} label={*/}
                    {/*    <div className={style.filter_label_wrapper}>*/}
                    {/*        <span className={style.filter_text}>{filter.options.outOfStock.name}</span>*/}
                    {/*        <span className={style.filter_qty}>{availabilityCount}</span>*/}
                    {/*    </div>*/}
                    {/*}/>*/}
                </FormGroup>
            </AccordionDetails>
        </Accordion>



    )
}