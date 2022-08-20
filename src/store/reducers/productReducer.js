const SET_PRODUCT = "SET_PRODUCT"

let initialState = {
    product: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT: {
            return {...state, product: action.payload}
        }
        default:
            return state
    }
}

export default productReducer