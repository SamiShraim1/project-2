/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForButton, setIsLoadingForButton] = useState(false);
  const [error, setError] = useState(false);

  const getCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCart(data.products);
    } catch (error) {
      toast.warn(error.response?.data?.message || 'Something went wrong while fetching cart');
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const clearAllCart = async () => {
    setIsLoadingForButton(true);
    try {
      const token = localStorage.getItem('userToken');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success('Your cart is empty now');
      setCart([]); 
    } catch (error) {
      toast.warn(error.response?.data?.message || 'Something went wrong while clearing cart');
    } finally {
      setIsLoadingForButton(false);
    }
  };

  const updateQuantity = async (id, type, quantity ) => {
    setIsLoadingForButton(true);
    try {
      const token = localStorage.getItem('userToken');
      let endpoint = type === 'incrase'?type='incraseQuantity':type='decraseQuantity';
      if (type === 'decraseQuantity' && quantity === 1) {
        await removeItem(id);
        return;
      }
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/${endpoint}`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(data);
      
      getCart();
    } catch (error) {
      toast.warn(error.response?.data?.message || 'Something went wrong while updating quantity');
    } finally {
      setIsLoadingForButton(false);
    }
  };
  const sum =(price ,quantity )=>{
    let sum=(price)*(quantity);
    console.log(sum);
    return sum;
  }
  const TotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((e) => {
      totalPrice += (e.details.price * e.quantity);
    });
    return totalPrice;
  };



  const confirmAction = async (message, onConfirm) => {
    if (window.confirm(message)) {
      onConfirm();
    }
  };
  const removeItem = async (id) => {
    confirmAction('Are you sure you want to remove this item?', async () => {
    setIsLoadingForButton(true);
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(data); 
      getCart(); 
    } catch (error) {
      toast.warn(error.response?.data?.message || 'Something went wrong while updating quantity');
    } finally {
      setIsLoadingForButton(false);
    }
})
  };


  if (isLoading) {
    return <BeatLoader color="#0b0d19" />;
  }

  if (error) {
    return <h2>Something went wrong while fetching cart data</h2>;
  }

  return (
    <div className='row'>
      {cart.map((e) => (
        <div key={e.details._id} className="col-md-4 border border-danger">
          <img src={e.details.mainImage.secure_url} />
          <h2>{e.details.name}</h2>
          <span><p>{e.details.price}$</p><p>{sum(e.details.price,e.quantity)}$</p></span>
       
          <button disabled={isLoadingForButton}className="btn btn-secondary" onClick={() => updateQuantity(e.details._id, 'incrase')}>
            {!isLoadingForButton ? '+' : <BeatLoader color="#0b0d19" />}
          </button>
          <h2>{e.quantity}</h2>
          <button disabled={isLoadingForButton}className="btn btn-secondary" onClick={() => updateQuantity(e.details._id, 'decrase',e.quantity)}>
            {!isLoadingForButton ? '-' : <BeatLoader color="#0b0d19" />}
          </button>
          <hr />
          <button disabled={isLoadingForButton}className="btn btn-secondary" onClick={() => removeItem(e.details._id)}>
            {!isLoadingForButton ? 'remove' : <BeatLoader color="#0b0d19" />}
          </button>
        </div>
      ))}
      <hr />
      {cart.length?
      <>
       <p>
       the total is :{TotalPrice()}$
      </p>
          <Link className="btn btn-secondary" to={`/order/${TotalPrice()}`}>Order</Link> 

      <hr />
      <button disabled={isLoadingForButton}className="btn btn-secondary" onClick={clearAllCart}>
        {!isLoadingForButton ? 'Clear All Cart' : <BeatLoader color="#0b0d19" />}
      </button>
      </>:<><p>nothing in the cart</p></>}
      
    </div>
  );
}
