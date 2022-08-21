import {apolloClient} from "../../graphql";
import {GET_CATEGORIES, GET_CATEGORY} from "../../graphql/queries";

const SET_CATEGORIES = "SET_CATEGORIES"
const SET_CATEGORY = "SET_CATEGORY"
const SET_CURRENCIES = "SET_CURRENCIES"
const SET_CURRENCY = "SET_CURRENCY"
const IS_LOADING = "IS_LOADING"

let initialState = {
    categories: [],
    category: [],
    currencies: [],
    currency: 0,
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
        case SET_CURRENCIES: {
            return {...state, currencies: action.payload}
        }case SET_CURRENCY: {
            return {...state, currency: action.payload}
        }
        default:
            return state
    }
}

export const setActiveCurrency = (payload) => ({type:SET_CURRENCY, payload})

export const GetCategories = () => {
    return async (dispatch) => {
        dispatch({type: IS_LOADING, payload: true})
        const data = await apolloClient.query({
            query: GET_CATEGORIES
        })
        dispatch({type: SET_CATEGORIES, payload: data.data.categories})
        dispatch({type: SET_CURRENCIES, payload: data.data.currencies})
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