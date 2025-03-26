import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import Food from "../Food/Food";

const FoodDisplay = ({ category = "All" }) => {
  const { food_list } = useContext(StoreContext);

  console.log(food_list, "this is food list");

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you 🤤</h2>
      <div className="food-display-list">
        {food_list.length === 0 ? (
          <p>No food items available.</p>
        ) : (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return <Food key={item.id || index} allitem={item} />;
            }
            return null;
          })
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
