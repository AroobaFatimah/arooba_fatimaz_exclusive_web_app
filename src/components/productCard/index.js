import React, { useState } from 'react'
import allProducts from '../../products.json'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import favoritesIcon from '../../assets/images/favorites_icon.png'
import redHeart from '../../assets/images/red_heart.png'
import cartIcon from '../../assets/images/cart_in_white.svg'
import { addToFavorites, removeFromFavorites } from '../../app/features/products/productsSlice'
import { Button } from '../button'
import { addToCart } from '../../app/features/products/productsSlice'
import { nanoid } from '@reduxjs/toolkit'

export const Card = ({ discount, image, productName, oldPrice, newPrice, selectedProduct }) => {
    const dispatch = useDispatch();

    //set active page
    const activePage = useSelector(state => state.activePage.activePage);
    console.log(activePage)

    //check active user
    const activeUser = useSelector(state => state.users.activeUser)

    //add to favorites functionality
    const favorites = useSelector(state => state.products.favorites);
    console.log("favorites: " + (favorites));
    let foundFavoriteProduct = favorites.find(favorite => favorite.email == activeUser)

    const handleAddToFavorites = () => {
        if (foundFavoriteProduct) {
            console.log("found favorite email: ", foundFavoriteProduct.email)
            if (!foundFavoriteProduct.favoriteProducts.includes(selectedProduct)) {
                dispatch(addToFavorites({ email: foundFavoriteProduct.email, product: selectedProduct }))
            }
            else {
                dispatch(removeFromFavorites({ email: foundFavoriteProduct.email, productId: selectedProduct.id }))
            }
        }
        else {
            let favObj = {
                id: nanoid,
                email: activeUser,
                favoriteProducts: []
            }
            favObj.favoriteProducts = [...favObj.favoriteProducts, selectedProduct];
            dispatch(addToFavorites({ favObj: favObj }))
        }
    }

    //add to cart functionality
    let carts = useSelector(state => state.products.carts);
    let foundCartObj = carts.find(cart => cart.email == activeUser)
    console.log("found cart obj", foundCartObj)
    const handleAddToCart = () => {
        if (foundCartObj) {
            console.log("found cart email: ", foundCartObj.email)
            if(!foundCartObj.cartItems.includes(selectedProduct)){
                dispatch(addToCart({ email: foundCartObj.email, product: selectedProduct }))
            }
        }
        else {
            let cartObj = {
                id: nanoid,
                email: activeUser,
                cartItems: []
            }
            cartObj.cartItems.push(selectedProduct);
            dispatch(addToCart({ cartObj: cartObj }))
        }
    }
    
    return (
        <>
            <div className='mb-5'>
                <div className='bg-light-gray p-5 pb-10 rounded-sm relative h-300'>
                    <div className='flex justify-between'>
                        <div className={`bg-pink text-white rounded-md px-3 py-2 ${discount > 0 ? "" : "hidden"}`}>{discount + "%"}</div>
                        <div onClick={() => { handleAddToFavorites() }} className={`bg-white flex justify-center items-center ${activePage == "Home" ? "" : "hidden"}`} style={{ width: "36px", height: "36px", borderRadius: '50%' }}>
                            <img className='w-5 h-5' src={foundFavoriteProduct ? (foundFavoriteProduct.favoriteProducts.includes(selectedProduct) ? redHeart : favoritesIcon) : favoritesIcon} />
                        </div>
                    </div>
                    <div className='flex justify-center my-7'>
                        <img src={image}></img>
                    </div>
                    <div className='flex'>
                        <Button onClick={handleAddToCart} className={`bg-black text-white w-full absolute bottom-0 left-0 p-3 ${activePage == "Home" ? "hidden" : ""}`} text={'Add to Cart'} src={cartIcon} />
                    </div>
                </div>
                <div className='mt-3'>{productName}</div>
                <div className='flex space-x-4'>
                    <h2 className='text-pink'>{"$" + newPrice}</h2>
                    <h2 className='text-gray-400' style={{ textDecoration: "line-through" }}>{"$" + oldPrice}</h2>
                </div>
            </div>
        </>
    )
}
