import { Request, Response } from "express";
import { Product } from "../Database/Models/product.model";
import { start } from "repl";

//Create a new product entry
export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { name, description, price, availability } = req.body;

    const product = new Product({
      //sellerId,
      name,
      description,
      price,
      availability,
    });
    await product.save();
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

//takes an ID parameter and returns a single product
export const getProduct = async (req: Request, res: Response) => {
  try {
    //TODO: Remember to fetch by ID
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};

//takes a query (anded conditions) and returns a data set
export const getProducts = async (req: Request, res: Response) => {
  try {
    const querySet: any = {};

    if (req.body.name) {
      querySet.name = req.body.name;
    }

    if (req.body.priceRange) {
      const { min, max } = req.body.priceRange; // Expecting { "priceRange": { "min": 50, "max": 150 } }
      if (min !== undefined && max !== undefined) {
        querySet.price = { $gte: min, $lte: max }; // Query for price range
      } else if (min !== undefined) {
        querySet.price = { $gte: min }; // Query for minimum price only
      } else if (max !== undefined) {
        querySet.price = { $lte: max }; // Query for maximum price only
      }
    }

    console.log(querySet);

    const dataSet = await Product.find();

    console.log(dataSet);

    res.status(200).send(dataSet);
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
};
