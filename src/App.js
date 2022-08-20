import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import Header from "./components/Header/Header";
import {GetCategories} from "./store/reducers/categoriesReducer";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import StartPage from "./components/StartPage/StartPage";

const App = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(GetCategories())
    },[])

    const loading = useSelector(state => state.categoriesPage.loading)

    if (loading){
        return <div className={"App"}>LOADING...</div>
    }

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={"/"} element={<StartPage/>}/>
                <Route path={"/category/:category"} element={<Category/>}/>
                <Route path={"/product/:product"} element={<Product/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
            </Routes>
        </div>
    );
}

export default App;



























