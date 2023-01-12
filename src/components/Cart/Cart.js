import { useContext } from 'react';
import { CartContext } from '../../store/cart-provider';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const {cartCtx}=useContext(CartContext)

  const cartItems =
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item =>
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={()=>cartCtx.removeItem(item.id)}
          onAdd={()=>cartCtx.addItem({...item, amount: 1})}
        />
      )
      }
    </ul>

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {cartCtx.items.length>0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
