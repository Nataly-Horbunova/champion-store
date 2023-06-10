import style from "./CartOrderForm.module.scss";
import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, setOrderPlaced} from "../../data/redux/reducers/cartSlice";
import * as React from 'react';
import TextField from '@mui/material/TextField';


export function CartOrderForm({cart, cartData, totalAmount}) {
    const dispatch = useDispatch();
    const initialFormData = {
        name: "",
        email: "",
        address: "",
        tel: "",
        note: ""
    }

    let [formData, setFormData] = useState(initialFormData);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handlePlaceOrder(e) {
        e.preventDefault();
        if (cart.length === 0) return;
        const order = createOrder();
        setFormData(initialFormData);
        dispatch(clearCart());
        // dispatch(setOrderPlaced(true));
        console.log(order);
    }

    function createOrder() {
        return {
            id: uuidv4(),
            products: cart,
            delivery: {
                name: formData.name,
                email: formData.email,
                address: formData.address,
                tel: formData.tel,
                note: formData.note
            },
            totalAmount
        }
    }

    return (
        <form onSubmit={handlePlaceOrder} className={style.CartOrderForm}>
            <TextField id="outlined-basic" label={cartData.orderForm.name} variant="outlined"
                       className={style.form_input} color="main_text_color" name="name" required
                       onChange={handleChange}/>
            <TextField id="outlined-basic" label={cartData.orderForm.email} variant="outlined"
                       className={style.form_input} color="main_text_color" name="email" required
                       onChange={handleChange}/>
            <TextField id="outlined-basic" label={cartData.orderForm.address} variant="outlined"
                       className={style.form_input} color="main_text_color" name="address" required
                       onChange={handleChange}/>
            <TextField id="outlined-basic" label={cartData.orderForm.tel} variant="outlined"
                       className={style.form_input} color="main_text_color" name="tel" required
                       onChange={handleChange}/>
            <label className={style.form_note_label} htmlFor="note">{cartData.orderForm.note}</label>
            <textarea className={style.form_note} id="note" onChange={handleChange} value={formData.note} name="note"/>
            <p className={style.total_amount}>{`${cartData.orderForm.totalText} $${totalAmount}`}</p>
            <button className={style.order_btn} type="submit">{cartData.orderForm.orderBtn}</button>
        </form>
    )
}