import style from "./Counter.module.scss";
import * as React from "react";
import {useState} from "react";

export function Counter ({count, incrementCount, decrementCount, changeCount}) {

    return(
        <div className={style.Counter}>
            <button type="button" className={style.decrement_btn} onClick={decrementCount}>-
            </button>
            <input className={style.product_count}
                   required
                   pattern="[0-9]"
                   type="text"
                   value={count}
                   onInput={changeCount}/>
            <button type="button" className={style.increment_btn} onClick={incrementCount}>+
            </button>
        </div>
    )
}
