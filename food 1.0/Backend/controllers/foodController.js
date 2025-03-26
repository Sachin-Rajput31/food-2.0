import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path'; 

// Add food item
const addFood = async (req, res) => {
  
    if (!req.body.category) {
        return res.status(400).json({ success: false, message: "Category is required" });
    }

    let image_filename = req.file ? req.file.filename : '';

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error saving food" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        const imagePath = path.join(process.cwd(), 'uploads', food.image);

      
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

       
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};


export { addFood, listFood, removeFood };
