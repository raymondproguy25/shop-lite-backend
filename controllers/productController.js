import Products from '../models/Products.js';

export const getProducts = async (req, res) =>{
 const products = await Products.find();
 res.json(products);
};

export const createProduct = async (req, res) => {
  console.log("Request body", req.body);
  try{
 const { name, price, category, description } = req.body;
  if(!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const newProduct = new Products({name, price, category, description});
  const saved = await newProduct.save();
  res.status(201).json(saved);
  } catch (error) {
    console.log("Error trying to create product", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) =>{
  try {
    const updated = await Products.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    } res.status(200).json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error:error.message });
  }
};

export const deleteProduct = async (req, res) =>{
  try {
    const deleted = await Products.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });   
    } res.status(200).json({ message: "Product deeleted" });
  } catch (error) {
    console.log("Delete error:", error.message);
    res.status(500).json({message: "Delete failed" });
  }
};
