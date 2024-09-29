import { Request, Response } from "express";
import { Product } from "../Database/Models/product.model";
import mongoose from "mongoose";
import { start } from "repl";

import { Product } from "../Database/Models/product.model";
import { Product } from "../Database/Models/product.model";
import searchFilterSort from "src/Services/search-filter-sort.service";

//Create a new product entry
export const createProduct = async (req: Request, res: Response) => {

  try {
    //console.log(req.body);
    const { sellerId, name, description, price, availability } = req.body;

    //TODO: Check seller ID validity and existance
    
    const product = new Product({
      sellerId,
      name,
      description,
      price,
      availability,
    });
    await product.save();
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

//takes an ID parameter and returns a single product
export const getProduct = async (req: Request, res: Response) => {

  try {
    //TODO: Remember to fetch by ID
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }

};

//takes a query (anded conditions) and returns a data set
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, search = "", sort = "asc", condition = [] } = req.query;
    
	  const data = await searchFilterSort(search.toString(), condition, sort.toString().toLowerCase(), Number(page) - 1);
	  
	  if (data.length == 0) {
      return res.status(404).json({ message: "No matching Products Found" });
    }

    const response = {
      data: data,
      metaData: {
        page: Number(page),
        total: data.length,
        pages: Math.ceil(data.length / 10),
      },
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

//takes an ID and update the entry
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updateSet: any = {};

    if (req.body.name) {
      updateSet.name = req.body.name;
    }

    if (req.body.description) {
      updateSet.description = req.body.description;
    }

    if (req.body.price) {
      updateSet.price = req.body.price;
    }

    if (req.body.availability) {
      updateSet.availability = req.body.availability;
    }

    updateSet.updatedAt = Date.now();

    const product = await Product.findByIdAndUpdate(id, updateSet, {
      new: true,
    });

    if (!product) {
      return res.status(500).json({
        message: "The product you are trying to update doesn't exist",
      });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }

};
