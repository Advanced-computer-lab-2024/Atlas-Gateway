import { Request, Response } from "express";
import { start } from "repl";

import { Product } from "../Database/Models/product.model";
import { Product } from "../Database/Models/product.model";
import searchFilterSort from "src/Services/search-filter-sort.service";

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
    const { page = 1, search = "", sort = "asc", condition = [] } = req.query;
    
    const data = await searchFilterSort(search.toString(), condition, sort.toString().toLowerCase() , Number(page) - 1 );

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
