import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSubtotalToCartItem, removeFromCart } from '../../app/features/products/productsSlice'

export const CartItem = ({ item }) => {
    let [hover, setHover] = useState(false)
    const dispatch = useDispatch()

    //for cart items quantity and total price
    const cartItems = useSelector(state => state.products.cart)
    const handleItemSubtotal = (itemId, quantity) => {
        let cartItem = cartItems.find(item => item.id === itemId)
        if (cartItem) {
            let indexOfCartItem = cartItems.indexOf(cartItem)
            cartItem = { ...cartItem, quantity: quantity, subtotal: (quantity * cartItem.newPrice) }
            dispatch(addSubtotalToCartItem({ itemIndex: indexOfCartItem, itemWithSubtotal: cartItem }))
        }
    }
    return (
        <>
            <div className='flex justify-between items-center shadow my-7 p-3' style={{ width: "1380px" }}>
                <div className='w-1/4 flex items-center'>
                    <div className=' relative' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <img src={item.image}></img>
                        <div onClick={() => dispatch(removeFromCart({ productId: item.id }))} className={`text-center text-xs bg-pink text-white absolute -top-1 -left-1 ${hover ? "" : "hidden"}`} style={{ width: "16px", height: "16px", borderRadius: "50%" }}>x</div>
                    </div>
                    <h2>{item.title}</h2>
                </div>
                <h2 className='w-1/4'>{"$" + item.newPrice}</h2>
                <div className='flex justify-center'>
                    <input
                        className='mr-64 w-10 focus:outline-none'
                        type="number"
                        id="quantity"
                        value={item.quantity ? item.quantity : 0}
                        onChange={(e) => { const newQuantity = e.target.value; handleItemSubtotal(item.id, newQuantity > 0 ? newQuantity : 0) }}
                    />
                </div>
                <h2 className='w-1/4'>{"$" + item.newPrice * (item.quantity ? item.quantity : 0)}</h2>
            </div>
        </>
    )
}
