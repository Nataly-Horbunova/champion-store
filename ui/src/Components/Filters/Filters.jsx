import style from "./Filters.module.scss";
import {PriceFilter} from "./PriceFilter";
import {AvailabilityFilter} from "./AvalibilityFilter";
import {ColorFilter} from "./ColorFilter";
import {ProductTypeFilter} from "./ProductTypeFilter";
import {getFiltersData} from "../../data/dataFunctions";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export function Filters({category, className}) {
    const filters = getFiltersData();

    return (
        <div className={`${style.Filters} ${className}`}>
            <h2 className={style.filters_tittle}>{filters.tittle}</h2>
            <Accordion className={style.filter_accordion} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={style.filter_tittle}>{filters.price.tittle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PriceFilter filter={filters.price}/>
                </AccordionDetails>
            </Accordion>
            <Accordion className={style.filter_accordion} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={style.filter_tittle}>{filters.availability.tittle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AvailabilityFilter filter={filters.availability}/>
                </AccordionDetails>
            </Accordion>
            <Accordion className={style.filter_accordion} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={style.filter_tittle}>{filters.productType.tittle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <ProductTypeFilter filter={filters.productType}/>
                </AccordionDetails>
            </Accordion>
            {
                (filters.color.categories[category] || !category) &&
                <Accordion className={style.filter_accordion} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={style.filter_tittle}>{filters.color.tittle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <ColorFilter filter={filters.color}/>
                    </AccordionDetails>
                </Accordion>
            }


        </div>
    )
}