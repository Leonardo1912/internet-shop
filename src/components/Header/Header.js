import React, {useRef, useState} from 'react';
import "./Header.scss";
import {useDispatch, useSelector} from "react-redux";
import logo from "../../common/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import clickOutside from "../../common/clickOutside";
import {setActiveCurrency} from "../../store/reducers/categoriesReducer";

const Header = () => {

    const ref = useRef(null)

    const dispatch = useDispatch()

    const categories = useSelector(state => state.categoriesPage.categories)
    const categoryActive = useSelector(state => state.categoriesPage.category)
    const currencies = useSelector(state => state.categoriesPage.currencies)
    const activeCurrency = useSelector(state => state.categoriesPage.currency)

    const [activeCategory, setActiveCategory] = useState("")
    const [dropDown, setDropDown] = useState(false)

    clickOutside(ref, setDropDown)

    return (
        <div className={"Header"}>
            <div className={"categories"}>
                {categories.map(category => <Link to={`/category/${category.name}`}
                                                  onClick={() => setActiveCategory(category.name)}
                                                  key={category.name}
                                                  className={activeCategory === category.name
                                                  || categoryActive.name === category.name
                                                      ? "category active" : "category"}>
                    {category.name}</Link>)}
            </div>
            <Link to="/">
                <img src={logo} alt=""/>
            </Link>
            <div className={"icons"}>
                <div className={"currencies"} ref={ref}>
                    <span onClick={() => setDropDown(dropDown => !dropDown)}>
                        <span className={"active-currency"}>{currencies[activeCurrency].symbol}</span>
                        <FontAwesomeIcon icon={dropDown ? faChevronUp : faChevronDown} className={"icon"}/>
                    </span>
                    <div className={dropDown ? "dropdown active-dropdown" : "dropdown"}
                         onClick={() => setDropDown(dropDown => !dropDown)}>
                        <div className={"dropdown-content"}>
                            {currencies.map((currency, index) =>
                                <div className={"currency"} key={currency.label}
                                     onClick={() => dispatch(setActiveCurrency(index))}>
                                    {currency.symbol + " " + currency.label}
                                </div>)}
                        </div>
                    </div>
                </div>
                <Link to="/cart" >
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </Link>
            </div>
        </div>
    );
};

export default Header;