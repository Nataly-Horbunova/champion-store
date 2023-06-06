import style from './App.module.scss';
import {Header} from './Components/Header/Header';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage/MainPage";
import {Footer} from "./Components/Footer/Footer";
import {ProductsPage} from "./pages/ProductsPage/ProductsPage";
import {ProductPage} from "./pages/ProductPage/ProductPage";


function App() {
    return (
        <div className={style.App}>
            <Header/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='collections/' element={<ProductsPage/>}/>
                <Route path='collections/:category' element={<ProductsPage/>}/>
                <Route path='product/:productId' element={<ProductPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
