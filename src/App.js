import style from './App.module.scss';
import {Header} from './Components/Header/Header';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./Components/Pages/MainPage/MainPage";
import {Footer} from "./Components/Footer/Footer";
import {ProductsPage} from "./Components/Pages/ProductsPage/ProductsPage";
import {ProductPage} from "./Components/Pages/ProductPage/ProductPage";
import {CartPage} from "./Components/Pages/CartPage/CartPage";
import {FavouritesPage} from "./Components/Pages/FavouritesPage/FavouritesPage"
import {ErrorPage} from "./Components/Pages/ErrorPage/ErrorPage";
import {ContactPage} from "./Components/Pages/ContactPage/ContactPage";
import {AboutPage} from "./Components/Pages/AboutPage/AboutPage";
import {BlogPage} from "./Components/Pages/BlogPage/BlogPage";

function App() {

    return (
        <div className={style.App}>
            <Header/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/collections/' element={<ProductsPage/>}/>
                <Route path='/collections/:collection' element={<ProductsPage/>}/>
                <Route path='/product/:productId' element={<ProductPage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/favourites' element={<FavouritesPage/>}/>
                <Route path='/about-us' element={<AboutPage/>}/>
                <Route path='/blog' element={<BlogPage/>}/>
                <Route path='/contact' element={<ContactPage/>}/>
                <Route path='/error' element={<ErrorPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
