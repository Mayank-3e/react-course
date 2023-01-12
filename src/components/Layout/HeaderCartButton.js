import { useContext } from 'react';
import { CartContext } from '../../store/cart-provider';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>
{
  const {cartCtx}=useContext(CartContext)
  const noCartItems=cartCtx.items.reduce((tot,item)=>
  {return tot+item.amount},0)

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
