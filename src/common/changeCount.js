export const ChangeCount = (cart, myProduct, sign) => {
    return cart.map(product => product === myProduct
        ? ({...product, count: sign ? product.count + 1 : product.count - 1})
        : product
    )
}