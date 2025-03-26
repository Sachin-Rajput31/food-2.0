import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [CartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const addToCart = async (itemId) => {
    console.log("Adding item to cart:", itemId);
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[String(itemId)] = (updatedCart[String(itemId)] || 0) + 1;
      console.log("Updated CartItems:", updatedCart);
      return updatedCart;
    });
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in CartItems) {
      if (CartItems[item] > 0) {
        const itemInfo = food_list.find(
          (product) => String(product._id) === item
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * CartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async () => {
   let token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { token }, // Correct placement of headers
      });
      console.log("Token is being sent:", token);
      console.log("Response is:", response.data);
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };
  
  

  useEffect(() => {
    async function loadData(){
      setisLoading(true);
      await fetchFoodList();
     if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"));
        }

    }
    
    loadData();
  }, []);
  
  

  const contextValue = {
    food_list,
    CartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    loadCartData,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
