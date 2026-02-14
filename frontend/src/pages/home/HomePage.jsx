import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import './HomePage.css'
import Header from '../../components/Header'
import ProductsGrid from './ProductsGrid'

const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  useEffect(() => {
    const url = search
      ? `/api/products?search=${search}`
      : `/api/products`
      axios.get(url)
        .then((res) => setProducts(res.data))
        .catch(err => console.error('Failed to load products', err))
  }, [search])


  return (
    <>
      <title>Homepage</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  )
}

export default HomePage
