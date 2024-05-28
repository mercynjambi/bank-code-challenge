import React, { useState } from "react";
// import Transaction from "./Transaction";

function AddTransactionForm() {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Basic form validation
    if (!date || !description || !category || !amount) {
      setError("Please fill in all fields");
      return;
    }

    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        description: description,
        category: category,
        amount: amount,
      }),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to add transaction");
        }
        // Clear form after successful submission
        setDate("");
        setDescription("");
        setCategory("");
        setAmount("");
        setError("");
        alert("Transaction added successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="ui segment">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="inline fields">
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
            placeholder="Description"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            name="category"
            placeholder="Category"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
