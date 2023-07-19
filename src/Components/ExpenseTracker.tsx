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
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAmountChange = (event:any) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!amount) {
      setError("Please enter amount.");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      amount: +amount,
      timestamp: new Date(),
      action: "add",
    };

    setExpenses([...expenses, newExpense]);
    setTotalAmount(totalAmount + newExpense.amount);

    setAmount("");
    setError("");
    console.log(newExpense);
  };

  const handleRemove = () => {
    if (parseInt(amount) <= totalAmount) {
      if (!amount) {
      setError("Insufficient balance.");
      return;
    }
    const newRExpense: Expense = {
      id: Date.now(),
      amount: +amount,
      timestamp: new Date(),
      action: "remove",
    };
    setExpenses([...expenses, newRExpense]);

    setTotalAmount(totalAmount - newRExpense.amount);
    setAmount("");
    }
    else{
       setError("Please enter valid amount.");
       return;
    }
    
  };

  return (
    <div className="max-w-lg my-0 mx-auto flex flex-col justify-center h-screen pt-12">
      <div className="h-full">
        <div className="h-20 flex justify-around items-center">
          <h2 className="text-3xl font-bold text-center">
            Expense Tracker - Basic
          </h2>
        </div>
        <div className="border-2 h-36 mb-5">
          <h2 className="text-lg font-medium text-center pt-2.5">
            Balance: {totalAmount}
          </h2>
          <form onSubmit={handleSubmit} className="text-center">
            <input
              type="number"
              id="expense-amount"
              value={amount}
              onChange={handleAmountChange}
              required
              className="border-2 border-slate-200 rounded-md my-1 outline-0"
            />
            <br />
            <button
              className="text-black bg-slate-300 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-1 text-center
              cursor-pointer mr-2 mb-2 outline-none"
              type="submit"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={expenses.length === 0}
              className="text-black bg-slate-300 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-1 text-center
              cursor-pointer mr-2 mb-2"
            >
              Remove
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        <div className="h-2/5 border-2 text-lg font-medium px-4 py-6">
          <h2>Transactions :</h2>
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
    </div>
  );
};

export default ExpenseTracker;
