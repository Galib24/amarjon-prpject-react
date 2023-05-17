import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentsPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData();
    console.log(totalProducts);


    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // const pageNumber = [];
    // for (let i = 1; i <= totalPages; i++) {
    //     pageNumber.push(i);
    // }
    const pageNumbers = [...Array(totalPages).keys()];


    /**
     * Done: 1) determine the total number of items:
     * almost: 2) decide on the number of items per page:
     * done: 3) calculate the total number of pages:
     * done: 4. determine the current page:
     * 
     * *****/

    useEffect(() => {
        fetch('http://localhost:5000/products')
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
            const addedProduct = products.find(product => product._id === id);

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

        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists]
        }

        setCart(newCart);
        addToDb(product._id)

    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    const options = [5, 10, 20];
    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }
    // console.log(products);
    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >


                        <Link to='/orders'>
                            <button>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
            {/* pagination */}
            <div className='pagination'>
                <p>Current Page: {currentsPage} and items per page: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button onClick={() => setCurrentPage(number)} key={number}

                        className={currentsPage === number ? 'selected' : ''}

                    >
                        {number}</button>)
                }
               
                    <select value={itemsPerPage} onChange={handleSelectChange}>
                        {options.map(option => {
                          return  <option key={option} value={option} >
                                {option}
                            </option>
                        })}

                    </select>
                
            </div>

        </>
    );
};

export default Shop;