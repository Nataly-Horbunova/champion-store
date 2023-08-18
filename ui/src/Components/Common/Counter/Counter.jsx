import style from "./Counter.module.scss";
import * as React from "react";

export function Counter ({count, incrementCount, decrementCount, changeCount, removeOnBlur=null}) {

    return(
        <div className={style.Counter}>
            <button type="button" className={style.decrement_btn} onClick={decrementCount}>-
            </button>
            <input className={style.product_count}
                   required
                   type="text"
                   value={count}
                   onInput={changeCount}
                   onBlur={removeOnBlur}
            />
            <button type="button" className={style.increment_btn} onClick={incrementCount}>+
            </button>
        </div>
    )
}
