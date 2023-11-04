import React, { useState } from 'react'
import allProducts from '../../products.json'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import favoritesIcon from '../../assets/images/favorites_icon.png'
import cartIcon from '../../assets/images/cart_in_white.svg'
import { addToFavorites, removeFromFavorites } from '../../app/features/products/productsSlice'
import { Button } from '../button'
import { addToCart } from '../../app/features/products/productsSlice'

export const Card = ({ discount, image, productName, oldPrice, newPrice, selectedProduct }) => {
    const dispatch = useDispatch();

    //set active page
    const activePage = useSelector(state => state.activePage.activePage);
    console.log(activePage)

    //add to favorites functionality
    const favoriteProducts = useSelector(state => state.products.favoriteProducts);
    console.log("favorite products: " + (favoriteProducts));

    const handleAddToFavorites = () => {
        if (selectedProduct) {
            if (!favoriteProducts.includes(selectedProduct)) {
                selectedProduct.favorite = true;
                dispatch(addToFavorites({ favoriteProduct: selectedProduct }))
            }
            else {
                dispatch(removeFromFavorites({ productId: selectedProduct.id }))
            }
        }
    }

    //add to cart functionality
    const cart = useSelector(state => state.products.cart)
    const handleAddToCart = () => {
        if (selectedProduct) {
            if (!cart.includes(selectedProduct)) {
                dispatch(addToCart({ productAddedToCart: selectedProduct }))
            }
        }
    }
    
    return (
        <>
            <div className='mb-5'>
                <div className='bg-light-gray p-5 pb-10 rounded-sm relative' style={{ height: "300px" }}>
                    <div className='flex justify-between'>
                        <div className={`bg-pink text-white rounded-md px-3 py-2 ${discount > 0 ? "" : "hidden"}`}>{discount + "%"}</div>
                        <div onClick={() => { handleAddToFavorites() }} className={`${favoriteProducts.includes(selectedProduct) ? "bg-pink" : "bg-white"} flex justify-center items-center ${activePage == "Home" ? "" : "hidden"}`} style={{ width: "36px", height: "36px", borderRadius: '50%' }}>
                            <img className='w-5 h-5' src={favoritesIcon} />
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
