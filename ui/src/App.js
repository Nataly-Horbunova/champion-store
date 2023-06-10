import style from './App.module.scss';
import {Header} from './Components/Header/Header';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage/MainPage";
import {Footer} from "./Components/Footer/Footer";
import {ProductsPage} from "./pages/ProductsPage/ProductsPage";
import {ProductPage} from "./pages/ProductPage/ProductPage";
import {CartPage} from "./pages/CartPage/CartPage";
import {useSelector} from "react-redux";
import {CartEmptyPage} from "./pages/CartPage/CartEmptyPage";


function App() {
    const cart = useSelector(state => state.cart.cartProducts);

    return (
        <div className={style.App}>
            <Header/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='collections/' element={<ProductsPage/>}/>
                <Route path='collections/:category' element={<ProductsPage/>}/>
                <Route path='product/:productId' element={<ProductPage/>}/>
                <Route path='cart' element={cart.length > 0 ? <CartPage/> : <CartEmptyPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
