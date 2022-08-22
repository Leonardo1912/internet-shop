const SET_CART = "SET_CART"

let initialState = {
    cart: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART: {
            return {...state,
                cart: [action.payload, ...state.cart]}
        }
        default:
            return state
    }
}

export const SetCart = (payload) => ({type:SET_CART, payload})

export default cartReducer