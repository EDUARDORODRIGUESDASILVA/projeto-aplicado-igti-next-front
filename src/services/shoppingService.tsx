
import instance from './axiosService'

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
