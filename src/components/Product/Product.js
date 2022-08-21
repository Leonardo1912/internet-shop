import React, {useEffect, useState} from 'react';
import "./Product.scss"
import {useDispatch, useSelector} from "react-redux";
import {GetProduct} from "../../store/reducers/productReducer";
import {useParams} from "react-router-dom";
import parse from "html-react-parser";

const Product = () => {

    const dispatch = useDispatch()

    const params = useParams()

    const [activePhoto, setPhoto] = useState(0)

    useEffect(() => {
        dispatch(GetProduct(params.product))
    }, [])

    const loading = useSelector(state => state.productPage.loadingProduct)
    const activeCurrency = useSelector(state => state.categoriesPage.currency)
    const product = useSelector(state => state.productPage.product)

    if (loading) {
        return <div>LOADING...</div>
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
                    <div key={attribute.id}>
                        <div className="attribute-name">
                            {attribute.name}
                        </div>
                        <div className="items">
                            {attribute.items.map(item =>
                                <div className="item">
                                    {item.value}
                                </div>
                            )}
                        </div>
                    </div>)}
                </div>
                <div className="price">{product.prices[activeCurrency].currency.symbol + product.prices[activeCurrency].amount}</div>
                <div className="button">
                    <button>ADD TO CART</button>
                </div>
                <div className="description">{parse(product.description)}</div>
            </div>
        </div>
    );
};

export default Product;