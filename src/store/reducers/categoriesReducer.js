import {apolloClient} from "../../graphql";
import {GET_CATEGORIES, GET_CATEGORY} from "../../graphql/queries";

const SET_CATEGORIES = "SET_CATEGORIES"
const SET_CATEGORY = "SET_CATEGORY"
const IS_LOADING = "IS_LOADING"

let initialState = {
    categories: [],
    category: [],
    loading: true
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING: {
            return {...state, loading: action.payload}
        }
        case SET_CATEGORIES: {
            return {...state, categories: action.payload}
        }
        case SET_CATEGORY: {
            return {...state, category: action.payload}
        }
        default:
            return state
    }
}

export const GetCategories = () => {
    return async (dispatch) => {
        dispatch({type: IS_LOADING, payload: true})
        const data = await apolloClient.query({
            query: GET_CATEGORIES
        })
        dispatch({type: SET_CATEGORIES, payload: data.data})
        dispatch({type: IS_LOADING, payload: data.loading})
    }
}
export const GetCategory = (category) => {
    return async (dispatch) => {
        const data = await apolloClient.query({
            query: GET_CATEGORY,
            variables: {category}
        })
        dispatch({type: SET_CATEGORY, payload: data.data.category})
    }
}

export default categoriesReducer