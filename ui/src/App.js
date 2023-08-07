import style from './App.module.scss';
import {Header} from './Components/Header/Header';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./Components/Pages/MainPage/MainPage";
import {Footer} from "./Components/Footer/Footer";
import {ProductsPage} from "./Components/Pages/ProductsPage/ProductsPage";
import {ProductPage} from "./Components/Pages/ProductPage/ProductPage";
import {CartPage} from "./Components/Pages/CartPage/CartPage";
import {useSelector} from "react-redux";
import {CartEmptyPage} from "./Components/Pages/CartPage/CartEmptyPage";
import {ErrorPage} from "./Components/Common/Error/ErrorPage";


function App() {
    const cart = useSelector(state => state.cart.cartProducts);

    return (
        <div className={style.App}>
            <Header/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/collections/' element={<ProductsPage/>}/>
                <Route path='/collections/:collection' element={<ProductsPage/>}/>
                <Route path='/product/:productId' element={<ProductPage/>}/>
                <Route path='/cart' element={cart.length > 0 ? <CartPage/> : <CartEmptyPage/>}/>
                <Route path='/error' element={<ErrorPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
