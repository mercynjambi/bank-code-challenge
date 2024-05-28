import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("http://localhost:8001/transactions?q=" + query, { signal })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [query]);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TransactionsList transactions={transactions} />
      )}
    </div>
  );
}

export default AccountContainer;
