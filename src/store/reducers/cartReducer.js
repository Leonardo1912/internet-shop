const SET_CART = "SET_CART"

let initialState = {
    cart: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART: {
            return {...state, cart: action.payload}
        }
        default:
            return state
    }
}

export default cartReducer