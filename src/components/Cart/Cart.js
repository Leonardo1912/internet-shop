import React, {useEffect} from 'react';
import "./Cart.scss"
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {ChooseAttributesInCart} from "../../common/chooseAttributes";
import {SetQuantity, UpdateCart} from "../../store/reducers/cartReducer";
import {ChangeCount} from "../../common/changeCount";
import {CalculateQuantity} from "../../common/quantity";

const Cart = () => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cartPage.cart)
    const quantity = useSelector(state => state.cartPage.quantity)
    const activeCurrency = useSelector(state => state.categoriesPage.currency)

    const setClass = (attribute, item) => {
        if (attribute.id === "Color") {
            return item.active ? "color active-color" : "color"
        } else {
            return item.active ? "item active-item" : "item"
        }
    }

    useEffect( () => {
        dispatch(SetQuantity(CalculateQuantity(cart)))
    },[cart])


    return (
        <div className={"Cart"}>
            <div className="title">CART</div>
            <div className="products">
                {cart.length === 0 ? <div className={"cart-is-empty"}>There are no items in the cart</div>
                    : cart.map(product =>
                        <div className="product" key={product.id}>
                            <div className="description">
                                <div className="name-block">
                                    <div className="brand">{product.brand}</div>
                                    <div className="name">{product.name}</div>
                                </div>
                                <div className="price">
                                    {product.prices[activeCurrency].currency.symbol + product.prices[activeCurrency].amount}
                                </div>
                                <div className="attributes">
                                    {product.attributes.map(attribute =>
                                        <div className="attribute" key={attribute.id}>
                                            <div className="attribute-name">{attribute.name}:</div>
                                            <div className="items">
                                                {attribute.items.map(item =>
                                                    <div className={setClass(attribute, item)} key={item.id}
                                                         onClick={() => dispatch(UpdateCart(ChooseAttributesInCart(cart, product, item.id, attribute.id)))}
                                                         style={attribute.id === "Color" ? {background: item.value} : {}}>
                                                        {attribute.id !== "Color" && item.value}
                                                    </div>)}
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <div className="photo-block">
                                <div className="count-block">
                                    <div className={"change-count"}
                                         onClick={() => dispatch(UpdateCart(ChangeCount(cart, product, true)))}>+
                                    </div>
                                    <div className={"count"}>{product.count}</div>
                                    <div className={"change-count"}
                                         onClick={() => dispatch(UpdateCart(ChangeCount(cart, product, false)))}>-
                                    </div>
                                </div>
                                <div>
                                    <div className="photo"><img src={product.gallery[0]} alt=""/></div>
                                    <div className={"change-photo"}>
                                        <button><FontAwesomeIcon icon={faChevronLeft}/></button>
                                        <button><FontAwesomeIcon icon={faChevronRight}/></button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
            </div>
            <div className="price-info">
                <div className="tax">Tax 21%: <span className={"item-info"}>$42</span></div>
                <div className="quantity">Quantity: <span className={"item-info"}>{quantity}</span></div>
                <div className="total">Total: <span className={"item-info"}>$200.00</span></div>
                <div className="button">
                    <button>ORDER</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;