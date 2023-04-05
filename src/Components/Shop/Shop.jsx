import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        // console.log("products dependency", products);
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id
        for (const id in storedCart) {
            // step 2; get the product by using id
            const addedProduct = products.find(product => product.id === id);

            if (addedProduct) {
                // step 3; get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //    step 4: add the addedproduct to the saved cart
                savedCart.push(addedProduct)
            }
            // console.log(addedProduct);
        }
        // step 5 set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {


        let newCart = [];

        // const newCart = [...cart, product];
        // if product dosen't exit in the cart, then set quantity = 1
        // if exist update quantity by 1.

        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]
        }

        setCart(newCart);
        addToDb(product.id)

    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    // console.log(products);
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                ></Cart>
            </div>
        </div>
    );
};

export default Shop;