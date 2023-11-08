import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Header } from '../../components/header'
import { CartItem } from '../../components/cartItem/cartItem'
import { setActivePage } from '../../app/features/activePage/activePageSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '../../components/button'
import { removeAllFromCart } from '../../app/features/products/productsSlice'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export const Cart = () => {
  const dispatch = useDispatch()

  //set active user
  const activeUser = useSelector(state => state.users.activeUser)

  //check active cart 
  const carts = useSelector(state => state.products.carts)
  let activeCart = carts.find(cart => cart.email == activeUser)

  //calculate subtotal 
  let subtotal = 0;
  activeCart.cartItems.map(cartItem => {
    cartItem && (subtotal += cartItem.subtotal ? cartItem.subtotal : 0)
  })

  //set active page
  dispatch(setActivePage("Cart"))

  //for search functionality
  const [filteredProducts, setFilteredProducts] = useState(activeCart.cartItems)

  //download pdf functionality
  const downloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input, { width: 1200, height: 1200 }, {
      scale: 6,
      quality: 1.0,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 50, 50, width, height);
      pdf.save('my-pdf.pdf');
    });
  };

  return (
    <>
      <Header setFilteredProducts={setFilteredProducts} items={activeCart.cartItems} />
      <div className='flex m-16 text-2xl'>
        <Link to={'/home'}><h2 className='text-gray-400'>Home</h2></Link>
        <h2> / </h2>
        <h2>Cart</h2>
      </div>
      <div >
        <div className='flex justify-center'>
          <div className='w-1380'>
            <div className='flex justify-between w-full shadow my-7 p-3 py-7'>
              <h2 className='w-1/4'>Product</h2>
              <h2 className='w-1/4'>Price</h2>
              <h2 className='w-1/4'>Quantity</h2>
              <h2 className='w-1/4'>SubTotal</h2>
            </div>
            {activeCart ? activeCart.cartItems.map(item => (
              item && (<CartItem item={item} />)
            )) : ""}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='flex justify-between w-1380'>
          <Link to={"/products"}><Button variant={"transparent"} size={"large"} className={'rounded-sm border border-black p-4'} text={"Return to Products"} /></Link>
          <Button onClick={() => dispatch(removeAllFromCart({ email: activeUser }))} variant={"transparent"} size={"large"} className={'rounded-sm border border-black p-4'} text={"Remove All"} />
        </div>
      </div>
      <div className='flex justify-center my-10'>
        <div className='w-1380' >
          <div id='pdf-content' className='border border-black rounded-md p-10 w-1/3'>
            <h2 className='text-3xl font-semibold'>Cart Total</h2>
            <div className='my-3 flex justify-between'>
              <h2>SubTotal</h2>
              <h2>{subtotal}</h2>
            </div>
            <hr />
            <div className='my-3 flex justify-between'>
              <h2>Shipping Fee</h2>
              <h2>Free</h2>
            </div>
            <hr />
            <div className='my-3 flex justify-between'>
              <h2>Total</h2>
              <h2>{subtotal}</h2>
            </div>
            <div className='flex justify-center'>
              <Button onClick={downloadPDF} className={'bg-pink text-white p-4 rounded-sm'} variant={"transparent"} size={"large"} text={"Download Recipt"} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
