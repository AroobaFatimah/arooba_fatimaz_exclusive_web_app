import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../app/features/products/productsSlice'
import { setSubtotal } from '../../app/features/activePage/activePageSlice'

export const CartItem = ({ item }) => {
    let [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    //for cart items quantity and total price
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0)
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
                        className='w-10'
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => { setQuantity(e.target.value); setTotal(item.newPrice * quantity); dispatch(setSubtotal({ total: total })); }}
                    />
                </div>
                <h2 className='w-1/4'>{"$" + item.newPrice * quantity}</h2>
            </div>
        </>
    )
}
