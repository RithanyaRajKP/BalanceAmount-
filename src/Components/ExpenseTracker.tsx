import React, { useState } from "react";
import "../App.css";
interface Expense {
  id: number;
  amount: number;
  timestamp: Date;
  action: string;
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!amount) {
      setError("Please enter amount.");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      amount: +amount,
      timestamp: new Date(),
      action: "added",
    };

    setExpenses([...expenses, newExpense]);
    setTotalAmount(totalAmount + newExpense.amount);

    setAmount("");
    setError("");
    console.log(newExpense);
  };

  const handleRemove = () => {
    if (!amount) {
      setError("Please enter amount.");
      return;
    }
    const newRExpense: Expense = {
      id: Date.now(),
      amount: +amount,
      timestamp: new Date(),
      action: "removed",
    };
    setExpenses([...expenses, newRExpense]);

    setTotalAmount(totalAmount - newRExpense.amount);
    setAmount("");
  };

  return (
    <div>
      <div>
        <h2>Enter Expense Details</h2>
       

        <div className="border-4">
             <h2>Balance: {totalAmount}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="expense-amount">Amount:</label>
            <input
              type="number"
              id="expense-amount"
              value={amount}
              onChange={handleAmountChange}
              required
            />
            <br />
            <button type="submit">Add</button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={expenses.length === 0}
            >
              Remove
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>

      <div>
        <h2>Previously Entered Details</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              Date:{" "}
              {expense.timestamp ? expense.timestamp.toISOString() : "N/A"} -{" "}
              <strong>{expense.amount} </strong> - {expense.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
