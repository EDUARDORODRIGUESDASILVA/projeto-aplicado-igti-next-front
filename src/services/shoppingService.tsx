import axios from 'axios'
import { IProduct } from '../interfaces/IProduct';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: { 'X-Custom-Header': 'foobar' }

});

export async function loadAllProducts(): Promise<IProduct[]> {
  const resp = await instance.get('/products')
 if (resp.status !== 200) {
   throw new Error(resp.statusText);
 }
 const data: IProduct[] = resp.data
 return data
}


export async function loadProductById(id: number): Promise<IProduct> {
  const resp = await instance.get(`/products/${id}`)
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  const data: IProduct = resp.data
  return data
}
