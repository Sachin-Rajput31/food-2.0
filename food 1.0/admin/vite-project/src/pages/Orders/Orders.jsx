import React, { useEffect, useState } from 'react';
import "./Orders.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("API Error:", error);
    }
  };
  const statusHandler = async (event,orderId)=>{
  const response = await axios.post(url+"/api/order/status",{
    orderId,status:event.target.value
  })
  if(response.data.success){
    await fetchAllOrders();
  }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Added `url` in dependency array

  

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-address">
                  {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zidivcode}
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>₨ : {order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              
                <option onChange={(event)=>statusHandler(event,order._id)} value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">delivered</option>
                
              </select>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
