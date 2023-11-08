import { createSlice } from "@reduxjs/toolkit";
import allProducts from '../../../products.json'
const initialState = {
    favorites: [],
    carts: [],
    subtotal: "0"
}
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            let { email, product, favObj } = action.payload;
            if (email) {
                const updatedFavorites = state.favorites.map(favorite => {
                    if (favorite.email === email) {
                        return {
                            ...favorite,
                            favoriteProducts: [...favorite.favoriteProducts, product],
                        };
                    }
                    return favorite;
                });
                return { ...state, favorites: updatedFavorites };
            }
            else {
                return { ...state, favorites: [...state.favorites, favObj] };
            }
        },
        removeFromFavorites: (state, action) => {
            let { email, productId} = action.payload;
            state.favorites.map(favorite => {
                if (favorite.email === email) {
                    console.log("favorite", favorite)
                    favorite.favoriteProducts = favorite.favoriteProducts.filter(product => product.id !== productId)
                }
            })
        },
        addToCart: (state, action) => {
            let { email, product, cartObj } = action.payload;
            if (email) {
                const updatedCart = state.carts.map(item => {
                    if (item.email === email) {
                        return {
                            ...item,
                            cartItems: [...item.cartItems, product],
                        };
                    }
                    return item;
                });
                return { ...state, carts: updatedCart };
            }
            else {
                return { ...state, carts: [...state.carts, cartObj] };
            }
        },
        addAllToCart: (state, action) => {
            const {email} = action.payload
            state.carts.map(cart => {
                if (cart.email === email) {
                    cart.cartItems = allProducts
                }
            })
        },
        removeFromCart: (state, action) => {
            let { email, productId} = action.payload;
            state.carts.map(cart => {
                if (cart.email === email) {
                    console.log("cart", cart)
                    cart.cartItems = cart.cartItems.filter(product => product.id !== productId)
                }
            })
        }, 
        removeAllFromCart: (state, action) => {
            const {email} = action.payload
            state.carts.map(cart => {
                if (cart.email === email) {
                    cart.cartItems = []
                }
            })
        },
        addSubtotalToCartItem: (state, action) => {
            const {email, itemIndex, itemWithSubtotal} = action.payload;
            state.carts.map(cart => {
                if (cart.email === email) {
                    console.log( "cart" ,cart)
                    cart.cartItems.splice(itemIndex, 1, itemWithSubtotal);
                }
            })
        }
    },
})

export const {addToFavorites, removeFromFavorites, addToCart, addAllToCart, removeFromCart, removeAllFromCart, addSubtotalToCartItem} = productSlice.actions;
export default productSlice.reducer;