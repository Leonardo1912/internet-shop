import {gql} from "graphql-tag";

export const GET_CATEGORIES = gql`
    query {
        categories {
            name
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