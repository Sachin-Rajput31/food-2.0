import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "https://foodie-frontend-nl1m.onrender.com";

  // Destructure the incoming request body
  const { userId, items, amount, address } = req.body;

  // Validate the incoming request data
  if (!userId) return res.status(400).json({ message: "Missing userId" });
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ message: "Invalid/empty items" });
  if (!amount) return res.status(400).json({ message: "Missing amount" });
  if (!address) return res.status(400).json({ message: "Missing address" });
  try {
    // Create a new order in the database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // Clear the user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert price to cents (assuming price is in INR)
      },
      quantity: item.quantity,
    }));

    // Add delivery charges to line items
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 4500, // Delivery charge in cents
      },
      quantity: 1,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Respond with the session URL
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error during order placement:", error.message);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findOneAndDelete(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
// users order for frontend
const usersOrder = async(req, res)=>{

try {
  const orders = await orderModel.find({userId:req.body.userId})
  res.json({success:true,data:orders})
  
} catch (error) {
  console.log(error);
  res.json({success:false,message:'Got error'})
}

}
// List of orders in admin panell
const listOrders = async (req, res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true, data:orders})

  } catch (error) {
    console.log(error);
    res.json({success:false, message:error})
  }
}
//appi for update order statis
const updateStatus = async(req, res)=>{

 try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
  res.json({success:true, message:'Order status updated'})
 } catch (error) {
  res.json({success:false,message:"Error"})
 }

}
export { placeOrder, verifyOrder, usersOrder , listOrders, updateStatus };
