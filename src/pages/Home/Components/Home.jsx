import { useEffect, useState } from "react";
import axios from "axios";
import { toast  } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { Link } from "react-router-dom";

function Home() {
  const [categories,setCategories] = useState([]);
  const [isLoading,setisLoading] = useState(true);
  const [Error,setError] = useState(false);

const getCategories =async() =>{
  try{
    const {data} = await axios.get(` ${import.meta.env.VITE_API_URL}/categories/active?limit=9`);
  setCategories(data.categories);


  }
  catch (error) {
    toast.warn(error.response.data.message || "Something wrong");
    setError(true);
  } finally {
    setisLoading(false);
  }
};
useEffect ( ()=>{
  getCategories();
},[]);
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
    {categories.map(category=>
      <div className="category" key={category._id}>
        <img src={category.image.secure_url} alt={category.image.public_url} />
        <Link className="btn btn-secondary" to={`/category/${category._id}`}>Show</Link>
      </div>
      )}
    </>
  )
}

export default Home;