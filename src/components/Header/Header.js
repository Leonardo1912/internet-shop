import React, {useState} from 'react';
import "./Header.scss";
import {useSelector} from "react-redux";
import logo from "../../common/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Header = () => {

    const categories = useSelector(state => state.categoriesPage.categories)
    const categoryActive = useSelector(state => state.categoriesPage.category)

    const [activeCategory, setActiveCategory] = useState("")

    return (
        <div className={"Header"}>
            <div className={"categories"}>
                {categories.categories.map(category => <Link to={`/category/${category.name}`}
                                                             onClick={() => setActiveCategory(category.name)}
                                                             key={category.name}
                                                             className={activeCategory === category.name
                                                             || categoryActive.name === category.name
                                                                 ? "category active" : "category"}>
                    {category.name}</Link>)}
            </div>
            <div>
                <img src={logo} alt=""/>
            </div>
            <div>
                <span className={"currencies"}>
                    <span className={"active-currency"}>$</span>
                    <FontAwesomeIcon icon={faChevronDown} className={"icon"}/>
                </span>
                <span>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </span>
            </div>
        </div>
    );
};

export default Header;