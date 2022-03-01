import { useEffect, useState } from 'react';
import { IProduct } from "../interfaces/IProduct";
import { loadAllProducts } from "../services/shoppingService";

export const useFetchProductList = () => {
  const initialList: IProduct[] = []
  const [productsList, setProductsList] = useState(initialList);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setisLoading(true)
      try {
        const products = await loadAllProducts()
        setProductsList(products)
        setisLoading(false)
      } catch (error) {
        console.log(error)
        setisLoading(false)
      }
    }

    fetchProducts()
  }, []);

  return {isLoading, productsList}
}
