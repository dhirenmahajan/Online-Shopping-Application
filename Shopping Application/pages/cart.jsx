import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
// Importing actions from  cart.slice.js
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cart.slice';
import styles from '../styles/CartPage.module.css';
import { useState } from 'react';

const CartPage = () => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [deliveryType, setDeliveryType] = useState('standard');  // Default delivery type
  const [addressId, setAddressId] = useState('');
  const [creditcardId, setCreditcardId] = useState('');

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  const handleCheckout = async () => {
    const userId = '1'; // Placeholder user ID, fetch from state or context as needed
    if (!addressId || !creditcardId) {
      alert('Please provide both address and credit card information.');
      return;
    }
    
    const response = await fetch('/api/order/place', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, deliveryType, userId })
    });
    console.log(response)
    if (response.ok) {
      alert('Order placed successfully!');
    } else {
      alert('Failed to place order.');
    }
  };

  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Total Price</div>
          </div>
          {cart.map((item) => (
            <div className={styles.body}>
              <div className={styles.image}>
                <Image src={item.image} height="90" width="65" />
              </div>
              <p>{item.product}</p>
              <p>$ {item.price}</p>
              <p>{item.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(item.id))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  x
                </button>
              </div>
              <p>$ {item.quantity * item.price}</p>
            </div>
          ))}
          <h2>Grand Total: $ {getTotalPrice()}</h2>
          <div className={styles.formGroup}>
            <label htmlFor="addressId">Address ID:</label>
            <input
              id="addressId"
              type="text"
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="creditcardId">Credit Card ID:</label>
            <input
              id="creditcardId"
              type="text"
              value={creditcardId}
              onChange={(e) => setCreditcardId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <input type="radio" value="standard" name="deliveryType" checked={deliveryType === 'standard'} onChange={() => setDeliveryType('standard')} />
              Standard Delivery
            </label>
            <label>
              <input type="radio" value="express" name="deliveryType" checked={deliveryType === 'express'} onChange={() => setDeliveryType('express')} />
              Express Delivery
            </label>
          </div>
          <button onClick={handleCheckout} className={styles.checkoutButton}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;