import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ProductCard = ({product}) => {

    const activeCurrency = useSelector(state => state.categoriesPage.currency)


    return (
        <Link to={`/product/${product.id}`}
              className={product.inStock ? "product" : "product out"}
        >
            {!product.inStock && <div className={"out-of-stock"}>OUT OF STOCK</div>}
            <div className={"photo-block"}>
                <div className="photo">
                    <img src={product.gallery[0]} alt=""/>
                </div>
                <div className={"add-to-cart"}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </div>
            </div>
            <div className={"description"}>
                <div className={"name"}>
                    <span>{product.brand + " " + product.name}</span>
                </div>
                <div className={"price"}>
                    {product.prices[activeCurrency].currency.symbol + product.prices[activeCurrency].amount}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;