export const CalculateQuantity = (cart) => {
    let quantity = 0
    cart.forEach(product => quantity = quantity + product.count)
    return quantity
}