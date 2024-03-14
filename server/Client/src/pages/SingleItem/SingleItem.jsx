import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import Nav from '../../components/Nav/Nav.jsx';
import CartActionButtons from '../../components/CartActionButtons/CartActionButtons.jsx';
import Counter from '../../components/Counter/Counter.jsx'

const SingleItem = (item ) => {
  const { itemID } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["single product"],
    queryFn: async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${itemID}`);
      const data = await response.json();
      console.log(data)
      return data
    }
  })

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <Error />
  }

  return (
    <>
      <Nav />
      <div>
        <img src={data.image} />
        <CartActionButtons/>
       
        <div>
          {data.title} , {data.category} , {data.price}$
        </div>
      </div>
    </>
  )
}

export default SingleItem