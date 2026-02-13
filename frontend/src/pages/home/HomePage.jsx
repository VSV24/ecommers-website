import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './HomePage.css'
import Header from '../../components/Header'
import ProductsGrid from './ProductsGrid'

const HomePage = ({cart}) => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    axios.get('/api/products')
    .then((res) => setProducts(res.data))
    .catch(err => console.error('Failed to load products', err))
  },[])
  return (
    <>
      <title>Homepage</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  )
}

export default HomePage
