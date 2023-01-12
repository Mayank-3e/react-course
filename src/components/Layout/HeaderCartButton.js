import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../store/cart-provider';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>
{
  const {cartCtx}=useContext(CartContext)
  const noCartItems=cartCtx.items.reduce((tot,item)=>
  {return tot+item.amount},0)
  const [btnIsHighlighted,setBtnIsHighlighted]=useState(false)
  const btnClasses=`${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
  useEffect(()=>
  {
    if(!cartCtx.items.length) return
    setBtnIsHighlighted(true)
    const timer = setTimeout(() => setBtnIsHighlighted(false), 300);
    return () => clearTimeout(timer)
  },[cartCtx.items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
