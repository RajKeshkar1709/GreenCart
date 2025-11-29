/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios"

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
    
    const currency = import.meta.env.VITE_CURRENCY || "₹";
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [product, setProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch Seller Status
    const fetchSeller = async ()=>{
        try{
            const {data} = await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            }
            else{
                setIsSeller(false)

            }

        }
        catch(error){
            setIsSeller(false)
            console.log(error)

        }
    }

    //Fetch User auth Status, user Data and cart items

    const fetchUser = async () =>{
        try {
            const {data} = await axios.get('/api/user/is-auth')
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
            
        } catch (error) {
            
            setUser(null)
            console.log(error)
        }
    }

    // Fetch All Products
    const fetchProduct = async () => {
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProduct(data.products)
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
             toast.error(error.message)
            
        }
    };

    // Add Product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        toast.success("Added to Cart");
    };

    // Update Cart Item Quantity
    const updateCartItems = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        if (quantity <= 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);
    };

    // Remove from cart completely
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            delete cartData[itemId];
        }

        setCartItems(cartData);
        toast.success("Removed from Cart");
    };

    // Total Number of items in Cart
    const getCartCount = () => {
        let total = 0;

        for (const id in cartItems) {
            total += cartItems[id];
        }

        return total;
    };

    // Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const id in cartItems) {
            let itemInfo = product.find((p) => p._id === id);

            if (itemInfo) {
                totalAmount += itemInfo.offerPrice * cartItems[id];
            }
        }

        return Math.floor(totalAmount * 100) / 100;
    };

    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProduct();
    }, [])

   useEffect(() => {
  const updateCart = async () => {
    try {
      const { data } = await axios.post("/api/cart/update", {
        userId: user?._id,
        cartItems
      });

      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user && Object.keys(cartItems).length > 0) {
    updateCart();
  }
}, [cartItems, user]);


    const value = {
        user, setUser,
        isSeller, setIsSeller,
        navigate, showUserLogin, setShowUserLogin,
        product, setProduct,
        currency,
        addToCart,
        updateCartItems,
        removeFromCart,
        cartItems,
        searchQuery, setSearchQuery,
        getCartCount,
        getCartAmount,
        axios,
        fetchProduct,
        setCartItems
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
