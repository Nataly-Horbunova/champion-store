import style from './Error.module.scss';
import {useSelector} from "react-redux";

export const ErrorPage = () => {
    const error = useSelector(state => state.shop.error);

    return (
        error && <main style={{marginTop: '200px'}} className={style.Error}>
            <h1>{error?.responseStatus}</h1>
            <p>Opps! Something went wrong.</p>
            <p>{error?.message}</p>
            <p>Let's go where you need to be.</p>
            <button>Back to home</button>
        </main>
    )
}