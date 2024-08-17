import { useState } from "react";

function App() {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] border-2 border-gray-300 m-4 p-4 rounded-lg shadow-lg bg-gray-50">
      <Navbar />
      <Main />
    </div>
  );
}

function Navbar() {
  return (
    <div className="bg-blue-500 p-4 rounded-lg shadow-md">
      <h2 className="text-center text-4xl font-bold text-white">
        Personal Expense Tracker
      </h2>
    </div>
  );
}

function Main() {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);

  function handleExpenseName(name) {
    setExpenseName(name);
  }

  function handleExpenseAmount(amount) {
    setExpenseAmount(amount);
  }

  function handleSubmit() {
    if (expenseName && expenseAmount > 0) {
      setExpenses([...expenses, { name: expenseName, amount: expenseAmount }]);
      setExpenseName('');
      setExpenseAmount(0);
    }
  }

  return (
    <div className="bg-white flex-grow p-4 rounded-lg mt-4 flex flex-col justify-between">
      <ExpenseAdder 
        handleAmount={handleExpenseAmount} 
        handleExpense={handleExpenseName}
        onSubmit={handleSubmit}
        expenseName={expenseName}
        expenseAmount={expenseAmount}
      />
      <ExpenseContent expenses={expenses} />
    </div>
  );
}

function ExpenseAdder({ handleExpense, handleAmount, onSubmit, expenseName, expenseAmount }) {
  return (
    <div className="flex justify-center flex-col items-center md:flex-row md:space-x-4 mt-4">
      <input 
        type="text" 
        placeholder="Expense Name" 
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 mb-1 focus:ring-blue-500"
        value={expenseName}
        onChange={(e) => handleExpense(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Amount" 
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 mb-1 focus:ring-blue-500"
        value={expenseAmount}
        onChange={(e) => handleAmount(+e.target.value)}
      />
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}

function ExpenseContent({ expenses }) {
  return (
    <div className="flex flex-col items-center mt-4 flex-grow overflow-y-auto">
      {expenses.map((expense, index) => (
        <ExpenseCard 
          key={index} 
          Amount={expense.amount} 
          Name={expense.name}
        />
      ))}
    </div>
  );
}

function ExpenseCard({ Amount, Name }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 w-80 h-32 flex flex-col items-center m-1 justify-center">
      <h1 className="text-3xl font-bold text-green-600">{Amount}$</h1>
      <h1 className="text-lg text-gray-700">{Name}</h1>
    </div>
  );
}

export default App;
