import React, {useEffect} from 'react';
import "./Category.scss";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetCategory} from "../../store/reducers/categoriesReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const Category = () => {

    const dispatch = useDispatch()

    const params = useParams()

    useEffect(() => {
        dispatch(GetCategory(params.category))
    }, [params])

    const category = useSelector(state => state.categoriesPage.category)

    return (
        <div className={"Category"}>
            <div className="title">{category.name}</div>
            <div className="products">
                {category.products?.map(product => <Link to={`/product/${product.id}`}
                                                         className={product.inStock ? "product" : "product out"}
                                                         key={product.id}>
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
                            {product.prices[0].currency.symbol + product.prices[0].amount}
                        </div>
                    </div>
                </Link>)}
            </div>
        </div>
    );
};

export default Category;