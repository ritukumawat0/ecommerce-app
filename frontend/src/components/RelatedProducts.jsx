import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {
    const{products} = useContext(ShopContext);
    const[related,setRelated] = useState([]);
    useEffect(()=>{
      if(products.length>0){
         let productsCopy = products.slice();
         productsCopy = productsCopy.filter((product)=>{
            return category===product.category
         })
         productsCopy = productsCopy.filter((product)=>{
            return subCategory===product.subCategory
         })
         setRelated(productsCopy.slice(0,5))
      }
    },[products])
  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
         <Title text1={'Related'} text2={'Products'}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {related.map((product)=>{
            return <ProductItem key={product._id} id={product._id} name={product.name} price={product.price} image={product.image}/>
          })}
      </div>
    </div>
  )
}

export default RelatedProducts