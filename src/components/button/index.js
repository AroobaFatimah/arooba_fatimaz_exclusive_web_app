import React from 'react'

const variants = {
    primary:
        "bg-pink text-white hover:border-white",
    secondary: "bg-gray-50 text-black text-base font-bold",
    transparent: 'px-0'
};

const sizes = {
    small: "px-2 py-1 text-xs loading-1",
    medium: "px-4 py-2 text-sm",
    large: "px-4 py-2 text-base",
};

export const Button = ({
    svg,
    src,
    type,
    onClick,
    onSubmit,
    className,
    text,
    variant,
    size,
    ...props }) => {
    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                onSubmit={onSubmit}
                className={`${className} ${variants[variant]} ${sizes[size]}`}
                text={text}
                svg={svg}
                {...props}
            >
                <div className='flex justify-center items-center'><img className='mr-2' src={src}/>{text}</div></button>
        </div>
    )
}
