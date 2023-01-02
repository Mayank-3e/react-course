import { useState } from "react"
import Card from "../UI/Card"
import ExpenseItem from "./ExpenseItem"
import './Expenses.css'
import ExpensesFilter from "./ExpensesFilter"

const Expenses = (props) => {
  const [filteredYr, setFilteredYr] = useState('2019')

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter filteredYr={filteredYr} setFilteredYr={setFilteredYr} />
        {props.expenses.map(expense =>
          <ExpenseItem
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        )}
      </Card>
    </div>
  )
}

export default Expenses