import axios from "axios";
import { ProductI } from "../types";

const productsService = {
  fetchProducts: async (): Promise<ProductI[] | undefined> => {
    const { data } = await axios.get("/api/products");
    return data;
  },
  fetchProduct: async (id: string): Promise<ProductI | undefined> => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  },
};

export default productsService;
