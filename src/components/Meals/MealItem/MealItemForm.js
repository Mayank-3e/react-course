import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amtInputRef=useRef()
  const [amtIsValid,setAmtIsValid]=useState(true)
  const submitHandler=e=>
  {
    e.preventDefault()
    const enteredAmt=Number(amtInputRef.current.value)
    if(enteredAmt<1)
    {
      setAmtIsValid(false)
      return
    }
    else setAmtIsValid(true)
    props.addToCart(enteredAmt)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amtInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amtIsValid && <p>Please enter a valid amount.</p>}
    </form>
  );
};

export default MealItemForm;
