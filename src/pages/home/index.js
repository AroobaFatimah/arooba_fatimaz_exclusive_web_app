import React, { useState } from 'react'
import allProducts from '../../products.json'
import { Header } from '../../components/header'
import { Banner } from '../../components/banner'
import { Card } from '../../components/productCard'
import { Button } from '../../components/button'
import { useDispatch, useSelector } from 'react-redux'
import { setActivePage } from '../../app/features/activePage/activePageSlice'
export const Home = () => {
  //check active user
  const activeUser = useSelector(state => state.users.activeUser)
  console.log('active user:', activeUser)

  const [products, setProducts] = useState(allProducts)

  //set active page
  const dispatch = useDispatch();
  dispatch(setActivePage("Home"));

  //setting button text
  const [viewAll, setViewAll] = useState(false);

  //for search functionality
  const [filteredProducts, setFilteredProducts] = useState(products)

  return (
    <>
      <Header products={products} setFilteredProducts={setFilteredProducts} />
      <Banner />
      <h2 className='font-bold text-4xl text-center mt-32 mb-10'>New <span className='text-pink'>Products</span></h2>
      <div className='flex justify-center mb-36 '>
        <div className='grid grid-cols-4 gap-6 max-sm:grid-cols-1 w-1380'>
          {filteredProducts.filter(product => viewAll ? true : product.id <= 4).map((product) => (
            <div key={product.id} className=''>
              <Card selectedProduct={product} discount={product.discountInPercentage} productName={product.title} oldPrice={product.oldPrice} newPrice={product.newPrice} image={product.image} />
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center mb-32'>
        <Button className={'px-10 py-5 rounded-md'} onClick={() => setViewAll(!viewAll)} variant={"primary"} size={"large"} text={viewAll ? 'View Less Products' : 'View All Products'} />
      </div>
    </>
  )
}
