const SET_CART = "SET_CART"
const UPDATE_CART = "UPDATE_CART"
const SET_QUANTITY = "SET_QUANTITY"

let initialState = {
    cart: [],
    quantity: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART: {
            return {
                ...state,
                cart: [{...action.payload, count: 1}, ...state.cart]
            }
        }
        case UPDATE_CART: {
            return {...state, cart: action.payload}
        }
        case SET_QUANTITY: {
            return {...state, quantity: action.payload}
        }
        default:
            return state
    }
}

export const SetCart = (payload) => ({type: SET_CART, payload})
export const UpdateCart = (payload) => ({type: UPDATE_CART, payload})
export const SetQuantity = (payload) => ({type: SET_QUANTITY, payload})

export default cartReducer