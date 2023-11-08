import React, { useState } from 'react'
import { Header } from '../../components/header'
import allProducts from '../../products.json'
import { Button } from '../../components/button'
import { Card } from '../../components/productCard'
import { useDispatch, useSelector } from 'react-redux'
import { setActivePage } from '../../app/features/activePage/activePageSlice'
import { addAllToCart } from '../../app/features/products/productsSlice'

export const ProductsPage = () => {
    const dispatch = useDispatch();
    dispatch(setActivePage("Products"));

    const [products, setProducts] = useState(allProducts)

    //for search functionality
    const [filteredProducts, setFilteredProducts] = useState(products)

    //check active user
    const activeUser = useSelector(state => state.users.activeUser)

    return (
        <>
            <Header products={products} setFilteredProducts={setFilteredProducts} />
            <div className='flex justify-center my-10'>
                <div className='flex justify-between w-1380'>
                    <h2 className='font-semibold text-xl'>Total Products ({products.length})</h2>
                    <Button onClick={() => dispatch(addAllToCart({email: activeUser}))} className={'border border-black font-semibold text-md px-10 py-3'} variant={"transparent"} size={"large"} text={"Move All To Cart"} />
                </div>
            </div>
            <div className='flex justify-center mb-36'>
                <div className='grid grid-cols-4 gap-6 max-sm:grid-cols-1 w-1380'>
                    {filteredProducts.map((product) => (
                        <div key={product.id}>
                            <Card selectedProduct={product} discount={product.discountInPercentage} productName={product.title} oldPrice={product.oldPrice} newPrice={product.newPrice} image={product.image} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
