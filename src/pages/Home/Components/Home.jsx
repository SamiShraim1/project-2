import { useEffect, useState } from "react";
import axios from "axios";


function Home() {
  const [categories,setCategories] = useState([]);
  const [isLoading,setisLoading] = useState(true);
  const [Error,setError] = useState(false);

const getCategories =async() =>{
  try{
    const {data} = await axios.get(`https://ecommerce-node4.vercel.app/categories/active?limit=9`);
  setCategories(data.categories);

  }
  catch(error){
    setError(true);
    console.log("error");
  }
  finally{
    setisLoading(false);
  }
}
useEffect ( ()=>{
  getCategories();
},[]);
if(isLoading){
  return <p>loading...</p>
}
if(Error){
  return <p>error while get data</p>
}
  return (
    <>
    {categories.map(category=>
      <div className="category" key={category._id}>
        <img src={category.image.secure_url} />
      </div>
      )}
    </>
  )
}

export default Home;