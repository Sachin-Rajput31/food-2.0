import React, { useContext, useEffect, useState } from "react";

import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./Food.css";
import Loader from "../../pages/Verify/Loader";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

const Food = ({ allitem }) => {
  const { CartItems, loadCartData, addToCart, removeFromCart, url, token  } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(true); // Track loading state


  console.log(CartItems, "this is all item");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      loadCartData();
      setIsLoading(false); // Finish loading
    };
    fetchData();
  }, []);

  if (isLoading) {
    
    return <div> <Loader/> </div>;
  }


  return (
 
    <div className="food-item">
    <div className="food-item-img-container">
      <img
        className="food-item-image"
        src={`${url}/images/${allitem?.image}`}
        alt={allitem?.name}
      />

      {/* Wrap the conditional rendering inside ErrorBoundary */}
      <ErrorBoundary>
        
      {!CartItems || !CartItems[allitem?._id] ? (
    <img className="add" onClick={() => addToCart(allitem?._id)} 
      src={assets.add_icon_white} alt="Add to Cart"
    />
) : (
    <div className="food-item-counter">
        <img onClick={() => removeFromCart(allitem?._id)}
          src={assets.remove_icon_red} alt="Remove Item"
        />
        <p>{CartItems[allitem?._id]}</p>
        <img onClick={() => addToCart(allitem?._id)}
          src={assets.add_icon_green} alt="Add More"
        />
    </div>
)}
      </ErrorBoundary>
    </div>

    <div className="food-item-info">
      <div className="food-item-name-rating">
        <p>{allitem?.name}</p>
        <img src={assets.rating_starts} alt="Rating" />
      </div>
      <p className="food-item-desc">{allitem?.description}</p>
      <p className="food-item-price">${allitem?.price?.toFixed(2)}</p>
    </div>
  </div>
);
};

export default Food;