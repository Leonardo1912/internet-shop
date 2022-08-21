import React, {useEffect} from 'react';
import "./Category.scss";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetCategory} from "../../store/reducers/categoriesReducer";
import ProductCard from "./ProductCard/ProductCard";

const Category = () => {

    const dispatch = useDispatch()

    const params = useParams()

    useEffect(() => {
        dispatch(GetCategory(params.category))
    }, [params.category])

    const category = useSelector(state => state.categoriesPage.category)

    return (
        <div className={"Category"}>
            <div className="title">{category.name}</div>
            <div className="products">
                {category.products?.map(product => <ProductCard product={product} key={product.id}/>)}
            </div>
        </div>
    );
};

export default Category;