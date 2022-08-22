const ChooseAttributesInProduct = (product, itemId, attributeId, setActiveAttributes, activeAttributes) => {

    !activeAttributes.includes(attributeId) && setActiveAttributes(state => ([...state, attributeId]))

    return {
        ...product,
        attributes: product.attributes.map(attribute => attribute.id === attributeId
            ? ({
                ...attribute,
                items: attribute.items.map(item => item.id === itemId
                    ? ({...item, active: true})
                    : ({...item, active: false})
                )
            })
            : attribute)
    }
};

export default ChooseAttributesInProduct;