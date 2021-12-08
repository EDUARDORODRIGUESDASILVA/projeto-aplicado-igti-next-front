import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { decrement, increment, selectCount } from '../../store/counterSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useRouter } from 'next/router'
import ProductDetailsCard from '../../components/ProductDetailsCard';

export default function ProductDetais() {

  const router = useRouter()
  let { id } = router.query

  id = id?.toString() || ''
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  if (id == undefined) {
    return 'Erro ao identificar o ID'
  }
  return (
    <div>
      <Layout>
        <ProductDetailsCard id={id}></ProductDetailsCard>

      </Layout>


    </div>
  )
}
