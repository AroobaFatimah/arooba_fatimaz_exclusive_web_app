import React, { useState } from 'react'
import favoritesIcon from '../../assets/images/favorites_icon.png'
import cartIcon from '../../assets/images/cart_icon.png'
import logo from '../../assets/images/logo.png'
import searchIcon from '../../assets/images/search_icon.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Header = ({ setFilteredProducts, products, items }) => {
    //check active page
    const activePage = useSelector(state => state.activePage.activePage)

    //check active user
    let activeUser = useSelector(state => state.users.activeUser);

    //set favorites count and cart items count
    const favorites = useSelector(state => state.products.favorites)
    let activeFavorite = favorites.find(favorite => favorite.email == activeUser)
    const carts = useSelector(state => state.products.carts)
    let activeCart = carts.find(cart => cart.email == activeUser)

    //search functionality (searched on base of title)
    const [searchQuery, setSearchQuery] = useState('');

    const filterProducts = (searchQuery) => {
        if(activePage == "Cart"){
            if (!searchQuery) {
                setFilteredProducts(items);
            }
            else {
                setFilteredProducts(items.filter(item => (item.title).replace(/ /g, '').toLowerCase() == searchQuery))
            }
        }
        else{
            if (!searchQuery) {
                setFilteredProducts(products);
            }
            else {
                setFilteredProducts(products.filter(product => (product.title).replace(/ /g, '').toLowerCase() == searchQuery))
            }
        }    
    };

    return (
        <>
            <div className='p-6 bg-black'></div>
            <div className='flex items-center px-20 py-7 justify-between' >
                {/* <img src={logo}></img> */}
                <h2 className='font-bold text-xl'>Exclusive</h2>
                <div>
                    <ul className='flex space-x-4'>
                        <Link to={'/home'}><li style={{ textDecoration: `${activePage == 'Home' ? "underline" : "none"}` }}>Home</li></Link>
                        <Link to={'/products'}><li style={{ textDecoration: `${activePage == 'Products' ? "underline" : "none"}` }}>Products</li></Link>
                    </ul>
                </div>
                <div className='flex space-x-4 items-center'>
                    <div className='flex items-center bg-gray-200 p-1 pr-3 rounded-sm'>
                        <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} className='p-3 bg-gray-200 focus:outline-none' type='text' placeholder='What are you looking for?'></input>
                        <img onClick={() => { filterProducts(searchQuery); setSearchQuery("") }} className='w-5 h-5' src={searchIcon}></img>
                    </div>
                    <div className='relative'>
                        <img className='w-5 h-5' src={favoritesIcon}></img>
                        <div className='bg-pink text-white absolute -top-1 -right-1 text-center text-xs' style={{ width: "16px", height: "16px", borderRadius: "50%" }}><p>{activeFavorite ? activeFavorite.favoriteProducts.length : 0}</p></div>
                    </div>
                    <Link to={'/cart'}><div className='relative'>
                        <img className='w-5 h-5' src={cartIcon}></img>
                        <div className='bg-pink text-white absolute -top-1 -right-1 text-center text-xs' style={{ width: "16px", height: "16px", borderRadius: "50%" }}>{activeCart ? activeCart.cartItems.length : 0}</div>
                    </div>
                    </Link>
                </div>
            </div>
            <hr className='border border-gray-200'></hr>
        </>
    )
}
