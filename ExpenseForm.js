import { useState } from 'react'
import './ExpenseForm.css'

const ExpenseForm = (props) =>
{
  const [form,setForm]=useState({})
  const changeHandler=(e)=>
  {
    setForm((prevForm)=>{ return {...prevForm, [e.target.name]: e.target.value} })
  }
  const submitHandler=(e)=>
  {
    e.preventDefault()
    const expenseData=
    {
      title: form.title,
      amount: +form.amount,
      date: new Date(form.date)
    }
    setForm({title: '',amount: '',date:''})
    props.onSaveExpenseData(expenseData)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text' onChange={changeHandler} name='title' value={form.title}/>
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input type='number' onChange={changeHandler} min='0.01' step='0.01' name='amount' value={form.amount}/>
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input type='date' onChange={changeHandler} min='2019-01-01' max='2023-12-31' name='date' value={form.date}/>
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  )
}

export default ExpenseForm
