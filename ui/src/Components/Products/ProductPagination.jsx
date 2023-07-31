import style from './Products.module.scss';
import Stack from "@mui/material/Stack";
import {setPageNumber} from "../../data/redux/reducers/filtersSlice";
import {useDispatch, useSelector} from "react-redux";
import {limitCount, pageUrl} from "../../core/api";
import {Pagination} from "@mui/material";
import {useSearchParams} from "react-router-dom";

export const ProductPagination = () => {
    const products = useSelector(state => state.shop.products);
    const pagesCount = Math.ceil(products.length / limitCount);
    const dispatch = useDispatch();
    const pageNumber = useSelector(state => state.filters.pageNumber);
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        pagesCount > 1 && <Stack>
            <Pagination
                count={pagesCount}
                variant="outlined"
                shape="rounded"
                page={pageNumber}
                onChange={(e, page) => {
                    dispatch(setPageNumber(page));
                    searchParams.set(pageUrl, page);
                    setSearchParams(searchParams, {
                        replace: true,
                    });
                }}
            />
        </Stack>
    )
}