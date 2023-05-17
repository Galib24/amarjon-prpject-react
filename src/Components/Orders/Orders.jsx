import React from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { useState } from 'react';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';




const Orders = () => {
    const SavedCart = useLoaderData();
    const [cart, setCart] = useState(SavedCart)
    // console.log(SavedCart);

    const handleRemoveCart = (id) => {
        // console.log(id);
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id)
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveCart={handleRemoveCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                 cart={cart}
                 handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to='/checkout'>
                    <button className='btn-proceed'>Proceed Check Out</button>
                    </Link>

                </Cart>
            </div>
        </div>
    );
};

export default Orders;