import React, {useEffect, useState} from 'react';
import "./Product.scss"
import {useDispatch, useSelector} from "react-redux";
import {GetProduct, UpdateProduct} from "../../store/reducers/productReducer";
import {useParams} from "react-router-dom";
import parse from "html-react-parser";
import ChooseAttributesInProduct from "../../common/chooseAttributes";
import {SetCart} from "../../store/reducers/cartReducer";

const Product = () => {

    const dispatch = useDispatch()

    const params = useParams()



    useEffect(() => {
        dispatch(GetProduct(params.product))
    }, [])

    const loading = useSelector(state => state.productPage.loadingProduct)
    const activeCurrency = useSelector(state => state.categoriesPage.currency)
    const product = useSelector(state => state.productPage.product)

    const [activePhoto, setPhoto] = useState(0)
    const [errorAttributes, setErrorAttributes] = useState(false)
    const [errorInStock, setErrorInStock] = useState(false)
    const [activeAttributes, setActiveAttributes] = useState([])

    const addToCart = () => {
        if(product.inStock){
            if (activeAttributes.length === product.attributes.length) {
                dispatch(SetCart(product))
                setErrorAttributes(false)
            }
            else {
                setErrorAttributes(true)
            }
        }
        else {
            setErrorInStock(true)
        }
    }

    if (loading) {
        return <div>LOADING...</div>
    }

    const setClass = (attribute, item) => {
        if (attribute.id === "Color") {
            return item.active ? "color active-color" : "color"
        } else {
            return item.active ? "item active-item" : "item"
        }
    }

    return (
        <div className={"Product"}>
            <div className="photo-block">
                <div className="gallery">
                    {product.gallery.map((photo, index) => <div key={photo} onClick={() => setPhoto(index)}><img
                        src={photo} alt=""/></div>)}
                </div>
                <div className="main-photo"><img src={product.gallery[activePhoto]} alt=""/></div>
            </div>
            <div className="content">
                <div className="title">
                    <div className="brand">{product.brand}</div>
                    <div className="name">{product.name}</div>
                </div>
                <div className="attributes">{product.attributes.map(attribute =>
                    <div key={attribute.id} className={"attribute"}>
                        <div className="attribute-name">
                            {attribute.name}:
                        </div>
                        <div className="items">
                            {attribute.items.map(item =>
                                <div className={setClass(attribute, item)} key={item.id}
                                     style={attribute.id === "Color" ? {background: item.value} : {}}
                                     onClick={() => dispatch(UpdateProduct(ChooseAttributesInProduct(product, item.id, attribute.id, setActiveAttributes, activeAttributes)))}>
                                    {attribute.id !== "Color" && item.value}
                                </div>
                            )}
                        </div>
                    </div>)}
                </div>
                <div className="price-block">
                    <div>PRICE:</div>
                    <div
                        className={"price"}>{product.prices[activeCurrency].currency.symbol + product.prices[activeCurrency].amount}</div>
                </div>
                <div className="button">
                    <button onClick={() => addToCart()}>ADD TO CART</button>
                    {errorAttributes && <div className={"error"}>Choose attributes</div>}
                    {errorInStock && <div className={"error"}>Out of stock</div>}
                </div>
                <div className="description">{parse(product.description)}</div>
            </div>
        </div>
    );
};

export default Product;