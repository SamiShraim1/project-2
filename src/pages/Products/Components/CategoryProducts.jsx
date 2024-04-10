/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { UserContext } from "../../../../context/User";

export default function CategoryProducts() {
    const { userName } = useContext(UserContext);
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingForbutton, setisLoadingForbutton] = useState(false);
  const [Error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`
      );
      setProducts(data.products);
    } catch (error) {
      toast.warn(error.response.data.message || "Something wrong");
      setError(true);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [id]);
  if(isLoading){
    return <BeatLoader color="#0b0d19" />
  }
  if (Error) {
    return <h2>wrong whlie get data</h2>;
  }

  const AddToCart = async (id) => {
    setisLoadingForbutton(true);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId: id },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == "success") {
        toast.success("The item has been added");
      }
    } catch (error) {
      toast.warn(error.response.data.message || "Something wrong");
    } finally {
      setisLoadingForbutton(false);
    }
  };
 

  return (
    <>
      <div className="row">
        {products.length ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4" >
              <img src={product.mainImage.secure_url} alt={product.mainImage.public_url} />
              <p>{product.name} <hr/>{product.price}$ </p>
             
              <Link className="btn btn-secondary" to={`/products/${product._id}`}>Show</Link>
              {userName.length ? (<>
              <hr />
                <button className="btn btn-secondary"
                disabled={isLoadingForbutton ? "disabled" : null}
                onClick={() => AddToCart(product._id)}
              >
                {!isLoadingForbutton ? "add to cart" : <BeatLoader color="#0b0d19" />}
              </button>
                <hr />
              
              </>
              ) : (<></>)}
              
              
            </div>
          ))
        ) : (
          <h2>no products found</h2>
        )}
      </div>
    </>
  );
}
