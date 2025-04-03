import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { CartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  

 

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p className="price">Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p className="remove">Remove</p>
        </div>
        <br />
        <hr />
        {food_list
          .filter((item) => CartItems[item._id] > 0)
          .map((item) => (
            <div key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <b>
                  <p>{item.name}</p>
                </b>
                <p>${item.price.toFixed(2)}</p>
                <p>{CartItems[item._id]}</p>
                <p>${(item.price * CartItems[item._id]).toFixed(2)}</p>
                <p
                  onClick={() => removeFromCart(item._id)}
                  className="cross"
                >
                  ❌
                </p>
              </div>
              <hr />
            </div>
          ))}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? "0.00" : "2.00"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total </b>
              <b>
                $
                {getTotalCartAmount() === 0
                  ? "0.00"
                  : (getTotalCartAmount() + 2).toFixed(2)}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT⇢
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
