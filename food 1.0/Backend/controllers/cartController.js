import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({_id: req.body.userId });
    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    console.log( "updated cart data",cartData)
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({_id: req.body.userId });
    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    } else {
      delete cartData[req.body.itemId];
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing item from cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId; // Get userId from query params


    console.log(userId)
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export { addToCart, removeFromCart, getCart };
