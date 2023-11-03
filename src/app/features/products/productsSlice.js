import { createSlice } from "@reduxjs/toolkit";
import allProducts from '../../../products.json'
const initialState = {
    favorites: [],
    cart: [],
}
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const {favoriteProduct} = action.payload;
            state.favorites.push(favoriteProduct);
        },
        removeFromFavorites: (state, action) => {

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
        
    },
})

export const {addToFavorites, addToCart, addAllToCart, removeFromCart, removeAllFromCart, } = productSlice.actions;
export default productSlice.reducer;