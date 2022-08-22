import {apolloClient} from "../../graphql";
import {GET_PRODUCT} from "../../graphql/queries";

const SET_PRODUCT = "SET_PRODUCT"
const UPDATE_PRODUCT = "UPDATE_PRODUCT"
const IS_LOADING_PRODUCT = "IS_LOADING_PRODUCT"

let initialState = {
    product: [],
    loadingProduct: true
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING_PRODUCT : {
            return {...state, loadingProduct: action.payload}
        }
        case SET_PRODUCT: {
            return {
                ...state,
                product: {
                    ...action.payload,
                    attributes: action.payload.attributes.map(attribute => ({
                        ...attribute,
                        items: attribute.items.map(item => ({
                            ...item,
                            active: false
                        }))
                    }))
                }
            }
        }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                product: action.payload
            }
        }
        default:
            return state
    }
}

export const UpdateProduct = (payload) => ({type: UPDATE_PRODUCT, payload})

export const GetProduct = (id) => {
    return async (dispatch) => {
        const data = await apolloClient.query({
            query: GET_PRODUCT,
            variables: {id}
        })
        dispatch({type: SET_PRODUCT, payload: data.data.product})
        dispatch({type: IS_LOADING_PRODUCT, payload: data.loading})
    }
}

export default productReducer