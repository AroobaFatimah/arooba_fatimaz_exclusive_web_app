import { createSlice } from "@reduxjs/toolkit";
import allProducts from '../../../products.json'
const initialState = {
    favoriteProducts: [],
    cart: [],
    subtotal: "0"
}
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const {favoriteProduct} = action.payload;
            console.log("favorite product: ", favoriteProduct)
            return { ...state, favoriteProducts: [...state.favoriteProducts, favoriteProduct] };
            //state.favorites.push(favoriteProduct);
        },
        removeFromFavorites: (state, action) => {
            const {productId} = action.payload;
            state.favoriteProducts = state.favoriteProducts.filter(item => item.id !== productId);
        },
        addToCart: (state, action) => {
            const {productAddedToCart} = action.payload;
            return { ...state, cart: [...state.cart, productAddedToCart] };
        },
        addAllToCart: (state, action) => {
            console.log(allProducts)
            state.cart = allProducts;
        },
        removeFromCart: (state, action) => {
            const {productId} = action.payload;
            state.cart = state.cart.filter(item => item.id !== productId);
        }, 
        removeAllFromCart: (state, action) => {
            state.cart = [];
        },
        addSubtotalToCartItem: (state, action) => {
            const {itemIndex, itemWithSubtotal} = action.payload;
            console.log(itemWithSubtotal)
            state.cart.splice(itemIndex, 1, itemWithSubtotal);
        }
    },
})

export const {addToFavorites, removeFromFavorites, addToCart, addAllToCart, removeFromCart, removeAllFromCart, addSubtotalToCartItem} = productSlice.actions;
export default productSlice.reducer;