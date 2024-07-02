import React from 'react'

import { getProductByQuary } from '../fetcher';
import { useSearchParams } from 'react-router-dom';

import CategoryProduct from './category_product';

const SearchResult = () => {
    const [products, setProducts] = React.useState({
        errorMessage: "",
        data: [],
      });
      const [searchParams] = useSearchParams();
      const quary = searchParams.get('s');

      React.useEffect(() =>{
        const fetchData = async () =>{
          const responseObject = await getProductByQuary(quary);
          setProducts(responseObject);
        }
        fetchData();
      }, [quary]);

      
  const renderProducts = () =>{
    if(products.data.length > 0){
    return products.data.map((p) => (
      <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>
    ));
  }else{
    return <div>No results found</div>
  }
}  ;  
  return (
    <div>
    {products.errorMessage && <div>Error: {products.errorMessage}</div>}
      <h1>Products</h1>
      {
        renderProducts()
      }
 </div>
  )
}

export default SearchResult
