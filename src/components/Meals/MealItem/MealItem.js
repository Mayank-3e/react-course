import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import { useContext } from 'react';
import { CartContext } from '../../../store/cart-provider';

const MealItem = (props) => {
  const {cartCtx}=useContext(CartContext)
  const price = `$${props.price.toFixed(2)}`;
  const addToCart=amt=>
  {
    cartCtx.addItem({id: props.id, name: props.name, amount: amt, price: props.price})
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm addToCart={addToCart}/>
      </div>
    </li>
  );
};

export default MealItem;
