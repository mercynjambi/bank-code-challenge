import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

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

  function handleDelete(id) {
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE"
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Failed to delete transaction");
      }
      setTransactions((prevTransactions) => prevTransactions.filter(transaction => transaction.id !== id));
    })
    .catch((error) => {
      setError(error.message);
    });
  }

  function handleSort(key) {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TransactionsList transactions={sortedTransactions} handleDelete={handleDelete} handleSort={handleSort} />
      )}
    </div>
  );
}

export default AccountContainer;

