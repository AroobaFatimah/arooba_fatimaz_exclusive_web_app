import React from 'react'
import bannerImg from '../../assets/images/banner_image.svg'
import appleLogo from '../../assets/images/apple_logo.png'
import { Button } from '../button'
import rightArrow from '../../assets/images/right_arrow.png'
import { Link } from 'react-router-dom'

export const Banner = () => {
    return (
        <>
            <div className='flex justify-center mt-10'>
                <div className='pl-24 p-10 bg-black flex items-center' style={{ width: '1380px', height: '344px', }}>
                    <div className='w-1/3'>
                        <div className='flex space-x-4 items-center'>
                            <img src={appleLogo}></img>
                            <h2 className='text-white'>iPhone 14 Series</h2>
                        </div>
                        <h2 className='text-white text-5xl mt-5 space-y-1 mb-3'>Up to 10% <br /> off Voucher</h2>
                        <Link to={'/products'}><div className='flex space-x-2 items-center mt-2'>
                            <Button className={'text-white border-b '} text={"Shop Now"} size={"large"} variant={"transparent"} />
                            <img className='w-5 h-5' src={rightArrow}></img>
                        </div></Link>
                    </div>
                    <div className='w-1/3'>
                        <img src={bannerImg}></img>
                    </div>
                    <div className='w-1/3'></div>
                </div>
            </div>
        </>

    )
}

