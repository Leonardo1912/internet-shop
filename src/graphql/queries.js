import {gql} from "graphql-tag";

export const GET_CATEGORIES = gql`
    query {
        categories {
            name
        }
        currencies {
            label
            symbol
        }
    }
`
export const GET_CATEGORY = gql`
    query ($category: String!) {
        category(input: {title: $category}){
            name
            products {
                id
                name
                brand
                inStock
                gallery
                prices {
                    amount
                    currency {
                        symbol
                    }
                }
            }
        }
    }
`

export const GET_PRODUCT = gql`
    query ($id: String!) {
        product(id: $id){
            id
            name
            inStock
            gallery
            description
            category
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
            prices {
                currency {
                    label
                    symbol
                }
                amount
            }
            brand
        }
    }
`