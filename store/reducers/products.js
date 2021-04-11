import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

//I created a product model for the dummy data and set it here for future use.
const initialState = {
    availableProducts: [],
    userProducts: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case('SET_PRODUCTS'):
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case ('DELETE_PRODUCT'):
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
            };
        case ('CREATE_PRODUCT'):
            const newProduct = new Product(
                action.productData.id,
                action.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price);
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };

        case ('UPDATE_PRODUCT'):
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            );

            const updatedUserProduct = [...state.userProducts];
            updatedUserProduct[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            const updatedAvailableProduct = [...state.availableProducts];
            updatedAvailableProduct[availableProductIndex] = updatedProduct;

            return {
                ...state,
                userProducts: updatedUserProduct,
                availableProducts: updatedAvailableProduct
            }

    }
    return state;
}

export default productsReducer;