/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../../context/User";

export default function Product() {
  const { userName } = useContext(UserContext);
  const [Product, setProduct] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingForbutton, setisLoadingForbutton] = useState(false);
  const [Error, setError] = useState(false);
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        ` ${import.meta.env.VITE_API_URL}/products/${id}`
      );
      setProduct(data.product);
      console.log(data);
    } catch (error) {
      toast.warn(error.response.data.message || "Something wrong");
      setError(true);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  if (isLoading) {
    return <BeatLoader color="#0b0d19" />;
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
  const clearallCart = async () => {
    setisLoadingForbutton(true);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {},

        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("Your cart is empty now");
    } catch (error) {
      toast.warn(error.response.data.message  || "Something wrong");
    } finally {
      setisLoadingForbutton(false);
    }
  };
  return <>
         {Product? (
          
            <div>
              <h2>{Product.name}/</h2>
              <img src={Product.mainImage.secure_url} alt={Product.name} />
              {Product.subImages.map((e) => (
              <img src={e.secure_url} key={e.public_id} />
            ))
            }
              <p>{Product.description}</p>
              <h2>{Product.price}$</h2>
              <hr />
              {userName.length ? (<>
                <button className="btn btn-secondary"
                disabled={isLoadingForbutton ? "disabled" : null}
                onClick={() => AddToCart(Product._id)}
              >
                {!isLoadingForbutton ? "add to cart" : <BeatLoader color="#0b0d19" />}
              </button>
              </>
              ) : (<></>)}
              
              
            </div>
          )
         : (
          <h2>no products found</h2>
        )}
  </>;
}
