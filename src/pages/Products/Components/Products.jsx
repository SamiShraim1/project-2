import { useEffect, useState } from "react";
import axios from "axios";
import { toast  } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { Link } from "react-router-dom";

export default function Products() {
  let [currentPage, setCurrentPage] = useState(1);
  const [product,setProducts] = useState([]);
  const [isLoading,setisLoading] = useState(true);
  const [Error,setError] = useState(false);

const getProducts =async() =>{
  try{
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=4`);
    console.log(data);
    setProducts(data.products);

  }
  catch (error) {
    toast.warn(error.response.data.message || "Something wrong");
    setError(true);
  } finally {
    setisLoading(false);
  }
};
const changePage = (e) => {
  setCurrentPage(e);
};
useEffect ( ()=>{
  getProducts();
},[currentPage]);
if(isLoading){
  return <BeatLoader color="#0b0d19" />
}
if(Error){
  return  (
    <h2>wrong whlie get data</h2>
  )
}
  
  return (
   <>
   {product.map(product=>
      <div className="product" key={product._id}>
        <img src={product.mainImage.secure_url} alt={product.mainImage.public_ur} />
        <Link to={`/products/${product._id}`} className="btn btn-secondary">Show</Link>
      </div>
      )}
      
<button onClick={() => changePage(currentPage - 1)}>back</button>

<button onClick={() => changePage(currentPage + 1)}>nest</button>
   </>
  )
}
